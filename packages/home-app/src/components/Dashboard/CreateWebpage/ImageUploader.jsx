import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';

import alert from '../../utils/alert';
import { cloudinaryImageUploader } from '../../utils/helpers';

class ImageUploader extends Component {
  state={
    selectedImages: [],
    uploadedImages: [],
    rawFiles: {},
  }

  /**
   * @description Handles the selection of the images
   *
   * @param { Array } images
   *
   * @returns { Promise } axios API call
   */

  handleImagesSelection = (files) => {
    const rawFiles = {};
    const localFileURLs = files.map((file) => {
      const localFileURL = URL.createObjectURL(file);
      rawFiles[localFileURL] = file;
      return localFileURL;
    });

    const { selectedImages } = this.state;
    this.setState({
      ...selectedImages,
      selectedImages: localFileURLs,
      rawFiles,
    });
  }

  /**
   * @description Handles the response from cloudinary API call
   *
   * @param { array } images
   */
  handleCloudinaryResponse = async (images) => {
    const { uploadedImages } = this.state;
    const uploads = images.map((image) => {
      return cloudinaryImageUploader(image)
        .then((imageData) => {
          uploadedImages.push(imageData.data.secure_url);
          this.setState({
            uploadedImages,
          });
        });
    });
    return uploads;
  }

  /**
   * @description Handles the removal of uploaded image from preview
   *
   * @param { string } imageURL
   *
   * @returns { Promise } axios API call
   */
  handleRemoveImage = imageURL => () => {
    const { selectedImages } = this.state;

    // find and remove the image from the selectedImages array
    selectedImages.splice(selectedImages.indexOf(imageURL), 1);

    this.setState({
      selectedImages,
    });
  }

  /**
   * @description sends the cloudinary urls to the DB
   */
  handleSubmit = async () => {
    try{
      const { uploadedImages, selectedImages, rawFiles } = this.state;
      const {
        isLoading, isComplete, webpage, user,
      } = this.props;

      if (!webpage.sub_domain_name) {
        alert.error(
          'An error occured. Don\'t worry you can continue from where you stopped'
        );
        setTimeout(() => {
          window.location.pathname = `/dashboard/${user.username}/businesses`;
        }, 4000);
      }

      isLoading();
      const imagesToUpload = [];
      // Filter images that are left to be uploaded using the blob key
      selectedImages.map((imageBlob) => {
        return imagesToUpload.push(rawFiles[imageBlob]);
      });

      const imagesData = await this.handleCloudinaryResponse(imagesToUpload);
      axios.all(imagesData).then(() => {
        const images = {
          featured_images: uploadedImages,
        };
        this.props.onSubmit(images);
        isComplete();
        console.log('Images have all being uploaded to cloudinary');
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { selectedImages } = this.state;
    const hasNoImages = selectedImages.length <= 0;

    return (
      <Dropzone
        onDrop={this.handleImagesSelection}
        multiple
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => {
          const pictureList = selectedImages.map(localObjectURL => (
            <div
              key={localObjectURL}
              className="column is-one-quarter"
            >
            <div className="image-preview">
              <img
                src={localObjectURL}
                alt={localObjectURL}
              />
              <div className="image-preview-overlay">
                <button
                  className="delete is-large is-pulled-right"
                  onClick={this.handleRemoveImage(localObjectURL)}
                  data-testid="delete-image"
                />
              </div>
            </div>
          </div>
          ));

          return (
            <div>
              <div className="drop-area">
                <div
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <input {...getInputProps()} />
                  <p>Try dropping some pictures here, or click to select pictures to upload.</p>
                </div>
                <ul className="columns is-multiline ">{pictureList}</ul>
              </div>
              <div className="control">
                <button
                  type="submit"
                  disabled={hasNoImages}
                  className="button is-link is-medium is-rounded"
                  data-testid="save-featured-images"
                  onClick={this.handleSubmit}
                >
                  Save & Continue
                </button>
              </div>
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

ImageUploader.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.func,
  isComplete: PropTypes.func,
  webpage: PropTypes.object,
  user: PropTypes.object,
};

export default ImageUploader;

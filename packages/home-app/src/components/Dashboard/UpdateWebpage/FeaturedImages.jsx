import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import {
  cloudinaryImageUploader,
  cloudinaryImageRemover,
} from '../../utils/helpers';

class FeaturedImages extends Component {
  state={
    existingImages: (this.props.webpage
      && this.props.webpage.featured_images) || [],
    selectedImages: [],
    uploadedImages: (this.props.webpage
      && this.props.webpage.featured_images) || [],
    rawFiles: {},
    setBackground: (this.props.webpage
    && this.props.webpage.set_background) || false,
    updated: false,
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

    // console.log(files, localFileURLs, rawFiles);
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
   * @description Handles the removal of uploaded image from cloud
   * and from the preview
   *
   * @param { string } imageCloudURL
   *
   * @returns { Promise } axios API call
   */
  handleRemoveImagefromCloud = imageCloudURL => () => {
    this.props.isLoading();
    try {
      cloudinaryImageRemover(imageCloudURL)
        .then((response) => {
          if (response.data.result === 'ok') {
            const { uploadedImages } = this.state;
            // remove the image from the state
            uploadedImages.splice(uploadedImages.indexOf(imageCloudURL), 1);
            this.props.onSubmit({
              featured_images: uploadedImages,
            })
              .then(() => {
                this.setState({
                  existingImages: uploadedImages,
                  uploadedImages,
                });
              });
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.props.isComplete();
    }
  }

  handleCheckboxChange = (event) => {
    event.preventDefault();
    this.setState({
      setBackground: event.target.checked,
      updated: true,
    })
  }

  /**
   * @description sends the cloudinary urls to the DB
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    const { uploadedImages, selectedImages, rawFiles, setBackground } = this.state;
    const { isComplete, isLoading } = this.props;

    isLoading();
    const imagesToUpload = [];
    selectedImages.map((imageBlob) => {
      return imagesToUpload.push(rawFiles[imageBlob]);
    });

    const imagesData = await this.handleCloudinaryResponse(imagesToUpload);
    axios.all(imagesData).then(() => {
      const images = {
        featured_images: uploadedImages,
        set_background: setBackground,
      };
      this.props.onSubmit(images);
      this.setState({
        selectedImages: [],
      });
      isComplete();
      console.log('Images have all being uploaded to cloudinary');
    });
  }

  render() {
    const {
      selectedImages,
      existingImages,
      setBackground,
      updated,
    } = this.state;
    const hasImagesOrUpdated =  (updated || selectedImages.length > 0);

    return (
      <Dropzone
        onDrop={this.handleImagesSelection}
        multiple
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => {
          // The list of existing pictures from the DB
          const existingPictureList = existingImages.map((imageCloudURL, index) => (
            <div
              key={`${imageCloudURL}${index}`}
              className="column is-one-quarter"
            >
              <div className="image-preview">
                <Image
                  cloudName="worksfair"
                  publicId={imageCloudURL}
                  alt={imageCloudURL}
                  type="fetch">
                  <Transformation width="200" height="200" fetchFormat="auto" crop="fit" />
                </Image>
                <div className="image-preview-overlay">
                  <button
                    className="delete is-large is-pulled-right"
                    onClick={this.handleRemoveImagefromCloud(imageCloudURL)}
                    data-testid="delete-image"
                  />
                </div>
              </div>
            </div>
          ));

          // The list of newly selected images
          const pictureList = selectedImages.map((localObjectURL, index) => (
            <div
              key={`${localObjectURL}${index}`}
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
                <div className="columns is-multiline ">
                  {existingPictureList}
                  {pictureList}
                </div>
              </div>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="set-background"
                      checked={setBackground}
                      onChange={this.handleCheckboxChange}
                    />
                    Set the first picture as your website background image
                  </label>
                </div>
                <div className="control">
                  <button
                    type="submit"
                    disabled={!hasImagesOrUpdated}
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

FeaturedImages.propTypes = {
  onSubmit: PropTypes.func,
  webpage: PropTypes.object,
  isLoading: PropTypes.func,
  isComplete: PropTypes.func,
};

export default FeaturedImages;

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';


import { CloudinaryImageUploader } from '../../utils/helpers';

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
      return CloudinaryImageUploader(image)
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
    const { uploadedImages, selectedImages, rawFiles } = this.state;

    const imagesToUpload = [];
    selectedImages.map((imageBlob) => {
      return imagesToUpload.push(rawFiles[imageBlob]);
    });

    const imagesData = await this.handleCloudinaryResponse(imagesToUpload);
    axios.all(imagesData).then(() => {
      const images = {
        featured_images: uploadedImages,
      };
      this.props.onSubmit(images);
      console.log('Images have all being uploaded to cloudinary');
    });
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
            <li
              key={localObjectURL}
              className="notification column is-one-quarter"
            >
              <button
                className="delete"
                onClick={this.handleRemoveImage(localObjectURL)}
                data-testid="delete-image"
              />
              <figure className="image is-180x180">
                <img
                  src={localObjectURL}
                  alt={localObjectURL}
                />
              </figure>
            </li>
          ));

          return (
            <div>
              <div className="drop-area">
                <div
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <input {...getInputProps()} />
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </div>
                <ul className="columns is-multiline ">{pictureList}</ul>
              </div>
              <div className="control">
                <button
                  type="submit"
                  disabled={hasNoImages}
                  className="button is-danger is-medium is-rounded"
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
};

export default ImageUploader;

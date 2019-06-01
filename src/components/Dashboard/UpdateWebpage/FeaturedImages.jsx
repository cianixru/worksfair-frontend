import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import sha1 from 'sha1';
import PropTypes from 'prop-types';

import {
  CloudinaryImageUploader,
  extractCloudID,
} from '../../utils/helpers';

const {
  REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_PRESET_NAME,
  REACT_APP_CLOUDINARY_DELETE_URL,
  REACT_APP_CLOUDINARY_AUTHORIZATION,
} = process.env;
class FeaturedImages extends Component {
  state={
    existingImages: (this.props.webpage
      && this.props.webpage.featured_images) || [],
    selectedImages: [],
    uploadedImages: (this.props.webpage
      && this.props.webpage.featured_images) || [],
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
      const imagePublicID = extractCloudID(imageCloudURL);
      // our formdata
      const timestamp = Date.now();
      const signature = sha1(`public_id=${imagePublicID}&timestamp=${
        timestamp.toString()}${REACT_APP_CLOUDINARY_AUTHORIZATION}`);

      const formData = new FormData();
      formData.append('public_id', imagePublicID);
      formData.append(
        'api_key',
        REACT_APP_CLOUDINARY_API_KEY
      );
      formData.append(
        'upload_preset',
        REACT_APP_CLOUDINARY_PRESET_NAME
      );
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      return axios({
        method: 'post',
        url: REACT_APP_CLOUDINARY_DELETE_URL,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
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

  /**
   * @description sends the cloudinary urls to the DB
   */
  handleSubmit = async () => {
    const { uploadedImages, selectedImages, rawFiles } = this.state;
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
    const { selectedImages, existingImages } = this.state;
    const hasNoImages = selectedImages.length <= 0;

    return (
      <Dropzone
        onDrop={this.handleImagesSelection}
        multiple
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => {
          // The list of existing pictures from the DB
          const existingPictureList = existingImages.map((imageCloudURL, index) => (
            <li
              key={`${imageCloudURL}${index}`}
              className="notification column is-one-quarter"
            >
              <button
                className="delete"
                onClick={this.handleRemoveImagefromCloud(imageCloudURL)}
                data-testid="delete-image"
              />
              <figure className="image is-180x180">
                <img
                  src={imageCloudURL}
                  alt={imageCloudURL}
                />
              </figure>
            </li>
          ));

          // The list of newly selected images
          const pictureList = selectedImages.map((localObjectURL, index) => (
            <li
              key={`${localObjectURL}${index}`}
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
                  <p>Try dropping some pictures here, or click to select pictures to upload.</p>
                </div>
                <ul className="columns is-multiline ">
                  {existingPictureList}
                  {pictureList}
                </ul>
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

FeaturedImages.propTypes = {
  onSubmit: PropTypes.func,
  webpage: PropTypes.object,
  isLoading: PropTypes.func,
  isComplete: PropTypes.func,
};

export default FeaturedImages;

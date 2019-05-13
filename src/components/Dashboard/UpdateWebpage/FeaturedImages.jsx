import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import sha1 from 'sha1';
import PropTypes from 'prop-types';


const {
  REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_PRESET_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_URL,
  REACT_APP_CLOUDINARY_DELETE_URL,
  REACT_APP_CLOUDINARY_AUTHORIZATION,
} = process.env;

class FeaturedImages extends Component {
  state={
    selectedImages: [],
    uploadedImages: [],
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

    console.log(files, localFileURLs, rawFiles);
    const { selectedImages } = this.state;
    this.setState({
      ...selectedImages,
      selectedImages: localFileURLs,
      rawFiles,
    });
  }

  /**
   * @description Handles the upload image of the image
   *
   * @param { Array } images
   *
   * @returns { Promise } axios API call
   */

  handleUploadImages = (images) => {
    const newImages = {};
    const uploads = images.map((image) => {
      // our formdata
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'api_key',
        REACT_APP_CLOUDINARY_API_KEY
      );
      formData.append(
        'upload_preset',
        REACT_APP_CLOUDINARY_PRESET_NAME
      );
      formData.append('timestamp', (Date.now()));

      delete axios.defaults.headers.common.Authorization;

      return axios({
        method: 'post',
        url: REACT_APP_CLOUDINARY_UPLOAD_URL,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then((response) => {
          newImages[response.data.public_id] = response.data.secure_url;
          const { uploadedImages } = this.state;
          this.setState({
            ...uploadedImages,
            uploadedImages: newImages,
          });
        });
    });

    axios.all(uploads).then(() => {
      console.log('Images have all being uploaded to cloudinary');
    });
  }

  /**
   * @description Handles the removal of uploaded image from preview
   *
   * @param { string } imagePublicID
   *
   * @returns { Promise } axios API call
   */
  handleRemoveImage = imagePublicID => () => {
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
        if (response.status === 200) {
          const { uploadedImages } = this.state;
          delete uploadedImages[imagePublicID];

          this.setState({
            uploadedImages,
          });
        }
      });
  }

  /**
   * @description sends the cloudinary urls to the DB
   */
  handleSubmit = async () => {
    const { uploadedImages } = this.state;
    const imagesUrl = Object.values(uploadedImages);

    const images = {
      featured_images: imagesUrl,
    };
    await this.props.onSubmit(images);
  }

  render() {
    const { uploadedImages, selectedImages } = this.state;
    const hasNoImages = uploadedImages.length <= 0;

    return (
      <Dropzone
        onDrop={this.handleImagesSelection}
        multiple
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => {
          const files = selectedImages.map(publicId => (
            <li key={publicId} className="notification column is-one-quarter">
              <button
                className="delete"
                onClick={this.handleRemoveImage(publicId)}
              />
              <figure className="image is-180x180">
                <img
                  src={publicId}
                  alt={publicId}
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
                <ul className="columns is-multiline ">{files}</ul>
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
};

export default FeaturedImages;

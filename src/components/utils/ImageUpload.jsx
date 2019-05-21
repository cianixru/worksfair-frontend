import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import sampleImage from '../../assets/sample-02.jpg';

const ImageUpload = ({
  selectedImage,
  handleOfferingImageSelection,
}) => {
  /**
   * @description Handles the selection of an image
   *
   * @param { Array } files
   */
  const handleImageSelection = (files) => {
    handleOfferingImageSelection(files);
  };

  return (
    <div className="image-upload-box">
      <img
        src={selectedImage || sampleImage}
        alt=""
        className="offering-image" />
      <div className="change-image-btn">
        <Dropzone
          name="image"
          // eslint-disable-next-line react/jsx-no-bind
          onDrop={handleImageSelection}
          accept="image/*"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="imageUpload">
              <span><i className="fa fa-upload" /> Upload Pic</span>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  handleOfferingImageSelection: PropTypes.func,
  selectedImage: PropTypes.string,
};

export default ImageUpload;

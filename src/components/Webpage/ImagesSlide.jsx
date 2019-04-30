/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

const ImagesSlide = ({ webpage }) => {
  return (
    <div className="listing-slider mfp-gallery-container margin-bottom-0">
      {
        webpage.images
      }
      <a href="images/single-listing-01.jpg"
        backgroundImage="images/single-listing-01.jpg"
        className="item mfp-gallery"
        title="Title 1" />
    </div>
  );
};

ImagesSlide.propTypes = {
  webpage: PropTypes.object,
};

export default ImagesSlide;

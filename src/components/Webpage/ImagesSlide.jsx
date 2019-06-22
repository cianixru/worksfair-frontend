import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

import sampleImage1 from '../../assets/sample-01.jpg';
import sampleImage2 from '../../assets/sample-02.jpg';
import sampleImage3 from '../../assets/sample-03.jpg';
import sampleImage4 from '../../assets/sample-04.jpg';

const ImagesSlide = ({ webpage }) => {
  const imageProps = {
    centerMode: true,
    centerSlidePercentage: 40,
    emulateTouch: true,
    autoPlay: true,
    interval: 3000,
    infiniteLoop: true,
    selectedItem: 1,
    showThumbs: false,
  };

  const defaultImages = [
    sampleImage1,
    sampleImage2,
    sampleImage3,
    sampleImage4,
  ];

  return (
    <Carousel {...imageProps} >
      { webpage.featured_images
        ? webpage.featured_images.map((image) => {
          return (
            <figure className="image is-4by3" key={image}>
              <img src={image} alt="sample" />
            </figure>
          );
        })
        : defaultImages.map((image) => {
          return (
            <figure className="image is-4by3" key={image}>
              <img
                src="https://imgplaceholder.com/576x432/131111?text=PICTURE+COMING+SOON&font-size=24"
                alt="coming soon" />
            </figure>
          );
        })
      }
    </Carousel>
  );
};

ImagesSlide.propTypes = {
  webpage: PropTypes.object,
};

export default ImagesSlide;

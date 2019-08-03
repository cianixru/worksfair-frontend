import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import { Image, Transformation } from 'cloudinary-react';

import { isMobileDevice } from '../../utils/helpers';



const ImagesSlide = ({ webpage }) => {
  const imageProps = {
    centerMode: true,
    centerSlidePercentage: 50,
    emulateTouch: true,
    autoPlay: true,
    interval: 3000,
    infiniteLoop: true,
    selectedItem: 1,
    showThumbs: false,
  };

  const defaultImages = [
    'https://imgplaceholder.com/576x432/131111?text=PICTURE+COMING+SOON&font-size=24',
    'https://imgplaceholder.com/576x432/131111?text=PICTURE+COMING+SOON&font-size=24',
    'https://imgplaceholder.com/576x432/131111?text=PICTURE+COMING+SOON&font-size=24',
    'https://imgplaceholder.com/576x432/131111?text=PICTURE+COMING+SOON&font-size=24',
  ];

  return (
    <Carousel {...imageProps} >
      { webpage.featured_images
        ? webpage.featured_images.map((image) => {
          const imageDisplay = isMobileDevice() 
            ? <figure className="image is-4by3" key={image}>
              <Image cloudName="worksfair" publicId={image} type="fetch">
                <Transformation width="150" fetchFormat="auto" />
              </Image>
            </figure>
            : <figure className="image is-4by3" key={image}>
              <Image cloudName="worksfair" publicId={image} type="fetch">
                <Transformation width="400" fetchFormat="auto" />
              </Image>
            </figure>
          return imageDisplay;
        })
        : defaultImages.map((image) => {
          return (
            <figure className="image is-4by3" key={image}>
              <img
                src={image}
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

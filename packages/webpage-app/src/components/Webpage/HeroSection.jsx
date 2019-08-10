import React from 'react';
import PropTypes from 'prop-types';

import getBackgroundImage from '../../assets/background/backgroundImages';

const HeroSection = ({ webpage }) => {
  const backgroundImageUrl = webpage && webpage.set_background
    ? webpage.featured_images[0] : getBackgroundImage(webpage.colour);
  const hero = webpage && (webpage.colour === 'is-dark') && !webpage.set_background
    ? <div
      className={`hero is-large ${webpage.colour}`}
      id="home"
    >
      <div
        className="hero-body">
        <div className="container">
          <h1 className="title is-1">
            { `Welcome to ${webpage.title}` }
          </h1>
          <h2 className="subtitle is-3">
            {webpage.description }
          </h2>
        </div>
        </div>
    </div>
    : <div
        className="hero is-large"
        id="home"
        style={{
        background: `url(${
          backgroundImageUrl
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        }}
    >
        <div
        className="hero-body"
        style={{
            background: 'linear-gradient(to right, rgba(0, 50, 115, 0.6), rgba(225, 225, 225, 0.2))'
        }}
        >
        <div className="container">
          <h1
            className={`title is-1`}
            style={{
                color: 'white',
            }}>
            { `Welcome to ${webpage.title}` }
          </h1>
          <h2
            className={`subtitle is-3`}
            style={{
                color: 'white',
            }}>
            {webpage.description }
          </h2>
        </div>
      </div>
    </div>
  return hero;
};

HeroSection.propTypes = {
  webpage: PropTypes.object,
};

export default HeroSection;

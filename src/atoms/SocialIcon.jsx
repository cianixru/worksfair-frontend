import React from 'react';
import PropTypes from 'prop-types';

const SocialIcon = ({ icon, colour }) => (
  <span className="icon is-small margin-right-7">
    <i className={`${icon} is-size-5 ${colour}`} />
  </span>
);

SocialIcon.propTypes = {
  icon: PropTypes.string,
  colour: PropTypes.string,
};

export default SocialIcon;

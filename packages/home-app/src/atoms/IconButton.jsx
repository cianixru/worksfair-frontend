import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({ handleClick, icon, colour }) => (
  <button
    className="button is-white"
    onClick={handleClick}>
    <i className={`${icon} is-size-5 ${colour}`} />
  </button>
);

IconButton.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  colour: PropTypes.string,
};

export default IconButton;

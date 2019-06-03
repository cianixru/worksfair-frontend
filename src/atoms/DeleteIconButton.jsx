import React from 'react';
import PropTypes from 'prop-types';

const DeleteIconButton = ({ handleClick }) => (
  <button
    className="button is-white"
    onClick={handleClick}>
    <i className="fa fa-trash-o is-size-5 has-text-danger"/>
  </button>
);

DeleteIconButton.propTypes = {
  handleClick: PropTypes.func,
};

export default DeleteIconButton;

import React from 'react';
import PropTypes from 'prop-types';

const EditIconButton = ({ handleClick }) => (
  <button
    className="button is-white"
    onClick={handleClick}>
    <i className="fa fa-edit is-size-5 has-text-grey"/>
  </button>
);

EditIconButton.propTypes = {
  handleClick: PropTypes.func,
};

export default EditIconButton;

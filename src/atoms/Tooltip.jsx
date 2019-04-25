import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ message }) => (
  <i className="tip">
    <div className="tip-content">
      {message}
    </div>
  </i>
);

Tooltip.propTypes = {
  message: PropTypes.string,
};

export default Tooltip;

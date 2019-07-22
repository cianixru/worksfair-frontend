import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.object,
    isActive: PropTypes.bool,
    handleClick: PropTypes.func,
  }

  render() {
    const { children, isActive, handleClick } = this.props;
    return (
      <div className={`modal ${isActive ? 'is-active' : null}`}>
        <div
          className="modal-background"
          onClick={handleClick}
        />
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close is-large" aria-label="close" />
      </div>
    );
  }
}

export default Modal;

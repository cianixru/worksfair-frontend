import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import { addNairaSign } from '../utils/helpers';
import Modal from '../Modal/Modal';

class OfferingItem extends Component {
  state = {
    isModalOpen: false,
  }

  toggleModal = (event) => {
    event.preventDefault();
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  
  render() {
    const { offering, colour } = this.props;
    const { isModalOpen } = this.state;
    return (
      <div
        key={offering.title}
        className="column is-4">
        <li
          className="box"
        >
          <div className="columns is-desktop">
            <div className="column is-6">
              <figure className="image is-full">
                <Image
                  cloudName="worksfair"
                  publicId={offering.image}
                  type="fetch"
                  className="offering-image"
                  onClick={this.toggleModal}>
                  <Transformation width="180" fetchFormat="auto" />
                </Image>
              </figure>
            </div>
            <div className="column is-6 offering-content">
              <h4 className="title is-5">
                {offering.title}
              </h4>
              <p className="offering-description">{offering.description}</p>
              <div className={`tag ${colour} is-large`}>
                {addNairaSign(new Intl.NumberFormat().format(offering.price))}
              </div>
            </div>
          </div>
        </li>
        <Modal
          isActive={isModalOpen}
          handleClick={this.toggleModal}>
          <p className="image">
            <img className="has-radius-7" src={offering.image} alt={offering.title} />
          </p>
        </Modal>
      </div>
    );
  }
}

OfferingItem.propTypes = {
  offerings: PropTypes.array,
};

export default OfferingItem;

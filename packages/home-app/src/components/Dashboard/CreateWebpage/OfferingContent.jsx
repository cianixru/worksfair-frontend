import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

import { addNairaSign } from '../../utils/helpers';
import OfferingsForm from '../../../forms/Webpage/OfferingsForm';

import ImageUpload from '../../utils/ImageUpload';
import EditIconButton from '../../../atoms/EditIconButton';
import DeleteIconButton from '../../../atoms/DeleteIconButton';
import Modal from '../../Modal/Modal';

class OfferingContent extends Component {
  static propTypes = {
    offering: PropTypes.object,
    match: PropTypes.object,
    actions: PropTypes.object,
    validationErrors: PropTypes.object,
    handleErrorReset: PropTypes.func,
    handleOfferingImageSelection: PropTypes.func,
    selectedImage: PropTypes.string,
    onSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
    colour: PropTypes.string,
  }

  state = {
    editMode: false,
    openModal: false,
  }

  handleEditToggle = (event) => {
    event.preventDefault();
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  handleDeleteToggle = (event) => {
    event.preventDefault();
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  handleDeleteClick = async () => {
    const {
      image, id
    } = this.props.offering;
    const input = {
      image,
      id,
    };
    await this.props.handleDelete(input);
  }

  render() {
    const {
      offering,
      handleOfferingImageSelection,
      selectedImage,
      onSubmit,
      validationErrors,
      handleErrorReset,
    } = this.props;
    const { editMode, openModal } = this.state;

    return (
      editMode
        ? <li
          className="box"
        >
          <div className="columns margin-bottom-25">
            <div className="column is-one-third">
              <ImageUpload
                handleOfferingImageSelection={handleOfferingImageSelection}
                selectedImage={selectedImage}
                offering={offering}
              />
            </div>
            <div className="column">
              <OfferingsForm
                onSubmit={onSubmit}
                validationErrors={validationErrors}
                handleErrorReset={handleErrorReset}
                handleEditToggle={this.handleEditToggle}
                offering={offering}
              />
            </div>
          </div>
        </li>
        : <div>
          <li
            className="columns box"
          >
            <div className="column is-3">
              <figure className="image is-180x180">
                <Image
                  cloudName="worksfair"
                  publicId={offering.image}
                  alt="offering image"
                  type="fetch">
                  <Transformation width="180" height="180" fetchFormat="auto" crop="fit" />
                </Image>
              </figure>
            </div>
            <div className="column is-7">
              <h4 className="title is-5">
                {offering.title}
              </h4>
              <p>{offering.description}</p>
              <div className="">
                {addNairaSign(offering.price)}
              </div>
            </div>
            <div className="column is-2">
              <EditIconButton
                handleClick={this.handleEditToggle}
              />
              <DeleteIconButton
                handleClick={this.handleDeleteToggle}
              />
            </div>
          </li>
          <Modal
            isActive={openModal}
            handleClick={this.handleDeleteToggle}
          >
            <article className="modal-card is-medium">
              <div className="modal-card-head ">
                <p className="modal-card-title">
                  Deleting <b>{offering.title}</b>...
                </p>
                <button
                  className="delete is-medium"
                  aria-label="close"
                  onClick={this.handleDeleteToggle}
                />
              </div>
              <div className="modal-card-body">
                <p>Are you sure you want to delete this item?</p>
              </div>
              <div className="modal-card-foot">
                <button
                  className="button is-danger"
                  onClick={this.handleDeleteClick}
                >
                Yes, delete "<i>{offering.title}</i>"
                </button>
                <button
                  className="button"
                  onClick={this.handleDeleteToggle}
                >
                Cancel
                </button>
              </div>
            </article>
          </Modal>
        </div>
    );
  }
}

export default withRouter(OfferingContent);

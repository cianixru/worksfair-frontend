import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DetailsForm from '../../../forms/Webpage/DetailsForm';

import EditIconButton from '../../../atoms/EditIconButton';
import DeleteIconButton from '../../../atoms/DeleteIconButton';
import Modal from '../../Modal/Modal';

class DetailContent extends Component {
  static propTypes = {
    detail: PropTypes.object,
    match: PropTypes.object,
    actions: PropTypes.object,
    validationErrors: PropTypes.object,
    handleErrorReset: PropTypes.func,
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
    const input = {
      id: this.props.detail.id,
    };
    await this.props.handleDelete(input);
  }

  render() {
    const {
      detail,
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
          <DetailsForm
            onSubmit={onSubmit}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleEditToggle={this.handleEditToggle}
            detail={detail}
          />
        </li>
        : <div>
          <li
            className="columns box"
          >
            <div className="column is-10">
              <h4 className="title is-5">
                {detail.title}
              </h4>
              <p>{detail.description}</p>
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
                  Deleting <b>{detail.title}</b>...
                </p>
                <button
                  className="delete is-medium"
                  aria-label="close"
                  onClick={this.handleDeleteToggle}
                />
              </div>
              <div className="modal-card-body">
                <p>Are you sure you want to delete this content?</p>
              </div>
              <div className="modal-card-foot">
                <button
                  className="button is-danger"
                  data-testid="delete-confirm"
                  onClick={this.handleDeleteClick}
                >
                  Yes, delete "<i>{detail.title}</i>"
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

export default withRouter(DetailContent);

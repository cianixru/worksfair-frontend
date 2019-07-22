import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import DetailsForm from '../../../forms/Webpage/DetailsForm';
import {
  createWebpageDetails,
  CREATE_DETAIL_FAILED,
  updateDetail,
  UPDATE_DETAIL_FAILED,
  deleteDetail,
  DELETE_DETAIL_FAILED,
} from '../../../actions/webpage';
import DetailItem from './DetailItem';
import { isLoading, isComplete } from '../../../actions/loader';
import { getCurrentUser } from '../../../actions/auth';
import alert from '../../utils/alert';

class Details extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    user: PropTypes.object,
    validationErrors: PropTypes.object,
    handleErrorReset: PropTypes.func,
    webpage: PropTypes.object,
    actions: PropTypes.object,
    match: PropTypes.object,
  }

  state = {
    validationErrors: {
      title: [],
      description: [],
    },
    savedDetails: [],
  }

  /**
   * @description handles the reset of the error detail
   * @param { string } name
   */
  handleErrorReset = (name) => {
    this.setState({
      validationErrors: {
        ...this.state.validationErrors,
        [name]: [],
      },
    });
  }

  /**
   * @description Handles the submission of the new details
   *
   * @param { object } input
   */
  submitDetails = async (input) => {
    const {
      actions, match,
    } = this.props;

    actions.isLoading();
    try {
      input.subDomainName = match.params.subDomainName;

      const response = await actions.createWebpageDetails(input);

      if (response.type === CREATE_DETAIL_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful! Keep Going.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      await actions.getCurrentUser();
      actions.isComplete();
    }
  };

  /**
   * @description Handles the update of a detail
   *
   * @param { object } input
   */
  onUpdateDetail = async (input) => {
    const {
      actions, match,
    } = this.props;

    actions.isLoading();
    try {
      input.subDomainName = match.params.subDomainName;

      const response = await actions.updateDetail(input);

      if (response.type === UPDATE_DETAIL_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successfully updated!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      await actions.getCurrentUser();
      actions.isComplete();
    }
  };

  /**
   * @description Handles the deletion of a detail
   *
   * @param { object } input
   */
  onDeleteDetail = async (input) => {
    const {
      actions, match,
    } = this.props;

    actions.isLoading();
    try {
      input.subDomainName = match.params.subDomainName;

      const response = await actions.deleteDetail(input);

      if (response.type === DELETE_DETAIL_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successfully deleted!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      await actions.getCurrentUser();
      actions.isComplete();
    }
  };

  render() {
    const {
      webpage,
    } = this.props;
    const details = webpage && webpage.details ? webpage.details : [];
    const { savedDetails, validationErrors } = this.state;
    const allDetails = [...savedDetails, ...details];

    return (
      <div>
        <div>
          <DetailItem
            details={allDetails}
            validationErrors={validationErrors}
            handleErrorReset={this.handleErrorReset}
            onSubmit={this.onUpdateDetail}
            colour={webpage && webpage.colour}
            handleDelete={this.onDeleteDetail}
          />
        </div>
        <br />
        <div className="box">
          <DetailsForm
            onSubmit={this.submitDetails}
            validationErrors={validationErrors}
            handleErrorReset={this.handleErrorReset}
            webpage={webpage && webpage} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      createWebpageDetails,
      updateDetail,
      deleteDetail,
      isLoading,
      isComplete,
      getCurrentUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Details));

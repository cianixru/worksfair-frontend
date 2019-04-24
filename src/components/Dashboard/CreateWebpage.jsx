import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import avatar from '../../assets/worksfair-avatar.png';
import CreateWebpageForm from '../../forms/Webpage/CreateWebpageForm';
import {
  createWebpage,
  CREATE_WEBPAGE_FAILED,
} from '../../actions/webpage';
import alert from '../utils/alert';

class CreateWebpage extends Component {
  state = {
    validationErrors: {
      title: [],
      description: [],
      keywords: [],
    },
  }

  /**
   * @description handles submit action when the save button is clicked
   * @param { object } input
   */
  onSubmit = async (input) => {
    const { actions } = this.props;
    try {
      const response = await actions.createWebpage(input);
      if (response.type === CREATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successfully created your webpage');
      }
    } catch (error) {
      alert.error(error.message);
    }
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
  };

  render() {
    const { validationErrors } = this.state;
    return (
      <div className="add-webpage-section">
        <div className="add-webpage-headline">
          <h3 className="add-webpage-header">
            <i className="fa fa-globe" aria-hidden="true" />
            Basic Info
          </h3>
        </div>
        <div className="add-webpage-content">
          <h5>Website Owner</h5>
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img
                  src={avatar}
                  alt=""
                  className=".is-rounded"
                />
              </figure>
            </div>
            <div className="media-content">
              Theo Okafor
            </div>
          </div>
          <div className="add-webpage-form">
            <CreateWebpageForm
              onSubmit={this.onSubmit}
              validationErrors={validationErrors}
              handleErrorReset={this.handleErrorReset}
            />
          </div>
        </div>
      </div>
    );
  }
}

CreateWebpage.propTypes = {
  links: PropTypes.object,
  actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      createWebpage,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateWebpage);

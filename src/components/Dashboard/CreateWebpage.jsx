/* eslint-disable react/jsx-no-bind */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter, NavLink, Link, BrowserRouter as Router, Route
} from 'react-router-dom';

import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import {
  createWebpage,
  updateWebpage,
  CREATE_WEBPAGE_FAILED,
  UPDATE_WEBPAGE_FAILED,
} from '../../actions/webpage';
import alert from '../utils/alert';
import ImageUploader from './ImageUploader';

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
    const { actions, history, user } = this.props;
    try {
      const response = await actions.createWebpage(input);
      if (response.type === CREATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful. Keep going!');
        history.push(`/dashboard/${user.username}/webpages/new/contact-info`);
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

  /**
   * @description handles submit action for webpage updates
   *
   * @param { object } input
   */
  submitContactInfo = async (input) => {
    const {
      actions, history, webpage, user
    } = this.props;
    try {
      input.subDomainName = webpage.sub_domain_name;
      const response = await actions.updateWebpage(input);
      if (response.type === UPDATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful. Keep going!');
        history.push(`/dashboard/${user.username}/webpages/new/gallery`);
      }
    } catch (error) {
      alert.error(error.message);
    }
  };

  /**
   * @description Handles the submission of the images
   *
   * @param { object } images
   */
  submitImages = async (images) => {
    const {
      actions, history, webpage, user
    } = this.props;
    try {
      images.subDomainName = webpage.sub_domain_name;
      const response = await actions.updateWebpage(images);
      if (response.type === UPDATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful. Keep going!');
        history.push(`/dashboard/${user.username}/webpages/new/pricing`);
      }
    } catch (error) {
      alert.error(error.message);
    }
  };

  render() {
    const { validationErrors } = this.state;
    const { user, username } = this.props;
    return (
      <div className="add-webpage-section">
        <div className="add-webpage-headline">
          <nav
            className="pagination is-left"
            role="navigation"
            aria-label="pagination">
            <Link to="/" className="pagination-next">Preview Your Webpage</Link>
            <ul className="pagination-list">
              <li>
                <NavLink
                  to={`/dashboard/${username}/webpages/new/basic-info`}
                  activeClassName="is-current"
                  className="pagination-link"
                  aria-label="Basic Info">
                  <i className="fa fa-globe" aria-hidden="true" />
                    Basic Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/${username}/webpages/new/contact-info`}
                  activeClassName="is-current"
                  className="pagination-link"
                  aria-label="Goto Contact Info">
                  <i className="fa fa-address-card-o" aria-hidden="true" />
                    Contact Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/${username}/webpages/new/gallery`}
                  className="pagination-link"
                  activeClassName="is-current"
                  aria-label="Goto Gallery"
                  aria-current="page" >
                  <i className="fa fa-file-image-o" aria-hidden="true" />
                    Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/${username}/webpages/new/pricing`}
                  className="pagination-link"
                  activeClassName="is-current"
                  aria-label="Goto Pricing">
                  <i className="fa fa-money" aria-hidden="true" />
                    Pricing
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="add-webpage-content">
          <Router>
            <Fragment>
              <Route
                exact
                path="/dashboard/:username/webpages/new/basic-info"
                render={() => (<BasicInfo
                  onSubmit={this.onSubmit}
                  user={user}
                  validationErrors={validationErrors}
                  handleErrorReset={this.handleErrorReset} />)}
              />
              <Route
                exact
                path="/dashboard/:username/webpages/new/contact-info"
                render={() => (<ContactInfo
                  onSubmit={this.submitContactInfo}
                  user={user}
                  validationErrors={validationErrors}
                  handleErrorReset={this.handleErrorReset} />)}
              />
              <Route
                exact
                path="/dashboard/:username/webpages/new/gallery"
                render={() => (<ImageUploader
                  onSubmit={this.submitImages}
                  user={user}
                  validationErrors={validationErrors}
                  handleErrorReset={this.handleErrorReset} />)}
              />
            </Fragment>
          </Router>
        </div>
      </div>
    );
  }
}

CreateWebpage.propTypes = {
  links: PropTypes.object,
  actions: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
  webpage: PropTypes.object,
};

const mapStateToProps = ({ auth: { currentUser }, webpage }) => ({
  user: currentUser.user,
  webpage: webpage.newWebpage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      createWebpage,
      updateWebpage,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWebpage));

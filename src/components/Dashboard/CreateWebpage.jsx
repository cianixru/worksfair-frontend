/* eslint-disable react/jsx-no-bind */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter, NavLink, BrowserRouter as Router, Route
} from 'react-router-dom';

import BasicInfo from './CreateWebpage/BasicInfo';
import ContactInfo from './CreateWebpage/ContactInfo';
import {
  createWebpage,
  updateWebpage,
  createWebpageOffering,
  CREATE_WEBPAGE_FAILED,
  UPDATE_WEBPAGE_FAILED,
  CREATE_OFFERING_FAILED,
} from '../../actions/webpage';
import alert from '../utils/alert';
import ImageUploader from './CreateWebpage/ImageUploader';
import Offerings from './CreateWebpage/Offerings';
import { cloudinaryImageUploader } from '../utils/helpers';
import { isLoading, isComplete } from '../../actions/loader';

class CreateWebpage extends Component {
  state = {
    validationErrors: {
      title: [],
      description: [],
      keywords: [],
    },
    imageArray: null,
    uploadedImage: null,
    selectedOfferingImage: null,
    offerings: [],
  }

  offeringsFormRef = React.createRef();

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
      if (!webpage.sub_domain_name) {
        alert.error(
          'An error occured. Don\'t worry you can continue from where you stopped'
        );
        setTimeout(() => {
          window.location.pathname = `/dashboard/${user.username}/webpages`;
        }, 4000);
      }
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
        history.push(`/dashboard/${user.username}/webpages/new/offerings`);
      }
    } catch (error) {
      alert.error(error.message);
    }
  };

  /**
   * @description handles the selection of an image
   *
   * @param { array } imageArray
   */
  handleOfferingImageSelection = (imageArray) => {
    // convert the image file to object URL for preview
    const localFileURL = URL.createObjectURL(imageArray[0]);
    this.setState({
      selectedImage: localFileURL,
      imageArray,
    });
  }

  /**
   * @description Handles the reset of image on offering form
   *
   * @param { Array } images
   */
  resetOfferingImage = () => {
    this.setState({
      selectedImage: null,
      imageArray: null,
    });
  }

  /**
   * @description Handles the submission of the offerings
   *
   * @param { object } input
   */
  submitOfferings = async (input) => {
    const { imageArray, offerings } = this.state;
    const {
      actions, webpage, user
    } = this.props;

    if (!webpage.sub_domain_name) {
      alert.error(
        'An error occured. Don\'t worry you can continue from where you stopped'
      );
      setTimeout(() => {
        window.location.pathname = `/dashboard/${user.username}/webpages`;
      }, 4000);
    }
    actions.isLoading();
    if (!imageArray) {
      alert.error('You need to upload an image');
    }
    try {
      input.subDomainName = webpage.sub_domain_name;

      // Upload the image to cloudinary and get the response data
      const imageData = await cloudinaryImageUploader(imageArray[0]);
      input.image = imageData.data.secure_url;

      // Send the input and the image URL from cloudinary to the DB
      const response = await actions.createWebpageOffering(input);

      if (response.type === CREATE_OFFERING_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        offerings.push(response.data);
        alert.success('Successful. Go ahead and preview your webpage!');
        this.setState({
          offerings,
        });

        // Reset the form and the image preview for fresh input
        this.offeringsFormRef.current.reset();
        this.resetOfferingImage();
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.isComplete();
    }
  };

  /**
   * @description Handles the submission of the offerings
   *
   * @param { object } input
   */
  handleSaveAndPreview = async () => {
    const { webpage, actions, user } = this.props;

    if (!webpage.sub_domain_name) {
      alert.error(
        'An error occured. Don\'t worry you can continue from where you stopped'
      );
      setTimeout(() => {
        window.location.pathname = `/dashboard/${user.username}/webpages`;
      }, 4000);
    }

    actions.isLoading();
    // Make app wait for 3 seconds to simulate running background process
    // good for user experience
    setTimeout(() => {
      actions.isComplete();
      window.location.pathname = `webpage/${webpage.sub_domain_name}`;
    }, 3000);
  }

  /**
   * @description disables the Navlink conditionally
   *
   * @param { object } event DOM event
   */
  handleNavlinkClick = (event) => {
    const { webpage } = this.props;

    if (!webpage.sub_domain_name) {
      event.preventDefault();
    }
  }

  render() {
    const { validationErrors, offerings, selectedImage } = this.state;

    const {
      user, username, webpage, actions,
    } = this.props;
    const others = {
      isComplete: actions.isComplete,
      isLoading: actions.isLoading,
      webpage,
    };
    return (
      <div className="add-webpage-section">
        <div className="add-webpage-headline">
          <nav
            className="pagination is-left"
            role="navigation"
            aria-label="pagination">
            {/* <Link to="/" className="pagination-next">Preview Your Webpage</Link> */}
            <ul className="pagination-list">
              <li>
                <NavLink
                  onClick={this.handleNavlinkClick}
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
                  onClick={this.handleNavlinkClick}
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
                  onClick={this.handleNavlinkClick}
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
                  onClick={this.handleNavlinkClick}
                  to={`/dashboard/${username}/webpages/new/offerings`}
                  className="pagination-link"
                  activeClassName="is-current"
                  aria-label="Goto Offerings">
                  <i className="fa fa-money" aria-hidden="true" />
                  Products/Services (Offerings)
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
                  handleErrorReset={this.handleErrorReset}
                  {...others}
                />)}
              />
              <Route
                exact
                path="/dashboard/:username/webpages/new/offerings"
                render={() => (<Offerings
                  onSubmit={this.submitOfferings}
                  user={user}
                  offerings={offerings}
                  validationErrors={validationErrors}
                  handleErrorReset={this.handleErrorReset}
                  handleOfferingImageSelection={
                    this.handleOfferingImageSelection}
                  offeringsFormRef={this.offeringsFormRef}
                  selectedImage={selectedImage}
                  handleSaveAndPreview={this.handleSaveAndPreview}
                />)}
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
  username: PropTypes.string,
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
      createWebpageOffering,
      isLoading,
      isComplete,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWebpage));

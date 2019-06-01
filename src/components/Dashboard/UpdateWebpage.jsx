/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import BasicInfo from './CreateWebpage/BasicInfo';
import ContactInfo from './CreateWebpage/ContactInfo';
import {
  updateWebpage,
  createWebpageOffering,
  UPDATE_WEBPAGE_FAILED,
  CREATE_OFFERING_FAILED,
} from '../../actions/webpage';
import alert from '../utils/alert';
import FeaturedImages from './UpdateWebpage/FeaturedImages';
import Offerings from './CreateWebpage/Offerings';
import { CloudinaryImageUploader } from '../utils/helpers';
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
    const {
      actions, match,
    } = this.props;

    actions.isLoading();
    try {
      input.subDomainName = match.params.subDomainName;
      Object.keys(input).map((elem) => {
        if (!input[elem]) {
          delete input[elem];
        }
        return elem;
      });

      const response = await actions.updateWebpage(input);
      if (response.type === UPDATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful! Scroll Down to update others.');
      }
    } catch (error) {
      alert.error(error.message);
    } finally {
      actions.isComplete();
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
   * @description Handles the submission of the images
   *
   * @param { object } images
   */
  submitImages = async (images) => {
    const {
      actions, match
    } = this.props;

    actions.isLoading();
    try {
      images.subDomainName = match.params.subDomainName;
      const response = await actions.updateWebpage(images);
      if (response.type === UPDATE_WEBPAGE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        alert.success('Successful. Keep going!');
      }
    } catch (error) {
      alert.error(error.message);
    } finally {
      actions.isComplete();
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
    const {
      actions, match,
    } = this.props;
    const { imageArray, offerings } = this.state;
    if (!imageArray) {
      alert.error('You need to upload an image');
    }

    actions.isLoading();
    try {
      input.subDomainName = match.params.subDomainName;

      // Upload the image to cloudinary and get the response data
      const imageData = await CloudinaryImageUploader(imageArray[0]);
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
    const { match, actions } = this.props;
    actions.isLoading();

    // Make app wait for 3 seconds to simulate running background process
    // good for user experience
    setTimeout(() => {
      actions.isComplete();
      window.location.pathname = `webpage/${match.params.subDomainName}`;
    }, 3000);
  }

  render() {
    const { validationErrors, offerings, selectedImage } = this.state;

    const { user, match, actions } = this.props;

    // Returns the current webpage from the array of user's webpage.
    const currentWebpage = user && user.webpages.filter(
      webpage => webpage.sub_domain_name === match.params.subDomainName
    )[0];

    return (
      <div>
        <div className="box">
          <div className="add-webpage-headline">
            <h3 className="is-size-4">
              <i className="fa fa-globe" aria-hidden="true" />
              Basic Info
            </h3>
          </div>
          <div className="add-webpage-content">
            <BasicInfo
              onSubmit={this.onSubmit}
              user={user}
              validationErrors={validationErrors}
              handleErrorReset={this.handleErrorReset}
              webpage={currentWebpage}
            />
          </div>
        </div>
        <div className="box">
          <div className="add-webpage-headline">
            <h3 className="is-size-4">
              <i className="fa fa-address-card-o" aria-hidden="true" />
              Contact Info
            </h3>
          </div>
          <div className="add-webpage-content">
            <ContactInfo
              onSubmit={this.onSubmit}
              user={user}
              validationErrors={validationErrors}
              handleErrorReset={this.handleErrorReset}
              webpage={currentWebpage}
            />
          </div>
        </div>
        <div className="box">
          <div className="add-webpage-headline">
            <h3 className="is-size-4">
              <i className="fa fa-file-image-o" aria-hidden="true" />
              Gallery
            </h3>
          </div>
          <div className="add-webpage-content">
            <FeaturedImages
              onSubmit={this.submitImages}
              user={user}
              validationErrors={validationErrors}
              handleErrorReset={this.handleErrorReset}
              webpage={currentWebpage}
              isLoading={actions.isLoading}
              isComplete={actions.isComplete}
            />
          </div>
        </div>
        <div className="box">
          <div className="add-webpage-headline">
            <h3 className="is-size-4">
              <i className="fa fa-money" aria-hidden="true" />
              Offerings
            </h3>
          </div>
          <div className="add-webpage-content">
            <Offerings
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
              webpage={currentWebpage}
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
  user: PropTypes.object,
  history: PropTypes.object,
  webpage: PropTypes.object,
  match: PropTypes.object,
  username: PropTypes.string,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  user: currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
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

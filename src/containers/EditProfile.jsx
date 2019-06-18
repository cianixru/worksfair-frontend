import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import DashboardHeader from '../components/Dashboard/DashboardHeader';
import EditProfileForm from '../forms/EditProfileForm';
import { updateProfile, UPDATE_PROFILE_FAILED } from '../actions/user';
import { isLoading, isComplete } from '../actions/loader';
import { getCurrentUser } from '../actions/auth';
import alert from '../components/utils/alert';
import Footer from '../components/Footer/Footer';

class EditProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object,
  }

  state = {
    validationErrors: {
      first_name: [],
      last_name: [],
      email: [],
      facebook: [],
      instagram: [],
      twitter: [],
      headline: [],
      current_location: [],
      image_url: [],
    },
  }

  /**
   * @description handles submit action when the save button is clicked
   *
   * @param { object } input
   */
  onSubmit = async (input) => {
    const { actions } = this.props;

    actions.isLoading();
    try {
      Object.keys(input).map((elem) => {
        if (!input[elem]) {
          delete input[elem];
        }
        return elem;
      });
      delete input.webpages;
      const response = await actions.updateProfile(input);
      if (response.type === UPDATE_PROFILE_FAILED) {
        const { data } = response.response;
        this.setState({
          validationErrors: data,
        });
        alert.error('Request Failed. Check for more details');
      } else {
        await actions.getCurrentUser();
        alert.success('Successfully updated');
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.isComplete();
    }
  }

  /**
   * @description handles the reset of the error detail
   *
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
   * @description handle the click to view profile
   */
  handleViewProfile = () => {
    const { user } = this.props;
    window.location.pathname = `profile/${user.username}`;
  }

  render() {
    const username = localStorage.getItem('username');
    const { user } = this.props;
    const { validationErrors } = this.state;
    const navigation = [
      {
        text: 'Dashboard',
        to: `dashboard/${username}/webpages`,
      },
      {
        text: 'Your Profile',
        to: `dashboard/${username}/profile`,
      },
    ];
    return (
      <Fragment>
        <div className="dashboard-content">
          <DashboardHeader
            title="Your Profile"
            navigation={navigation}
          />
          <div>
            <div className="box">
              <EditProfileForm
                onSubmit={this.onSubmit}
                user={user}
                validationErrors={validationErrors}
                handleErrorReset={this.handleErrorReset}
                handleViewProfile={this.handleViewProfile}
              />
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  user: currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateProfile,
      isLoading,
      isComplete,
      getCurrentUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile));

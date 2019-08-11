import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SigninForm from '../../forms/Auth/SigninForm';
import {
  setAuthenticatedUser,
  AUTHENTICATION_FAILED,
  AUTHENTICATED_USER,
} from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import alert from '../utils/alert';
import { baseURL } from '../../utils/api';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} data
   */
  onSubmit = async (user) => {
    const { actions } = this.props;
    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/login/`;
      user.email = user.email.toLowerCase();
      let type = AUTHENTICATED_USER;

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({user}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          type = AUTHENTICATION_FAILED;
          alert.error('Login failed. Please check your credentials.');
        }
        return res.json();
      })
      .then(response => {
        if (type === AUTHENTICATION_FAILED) {
          const { user } = response;
          this.setState({
            validationErrors: user,
          });
          if (user.non_field_errors) {
            alert.info(user.non_field_errors[0]);
          }
        } else {
          alert.success('Successfully logged in!');
  
          window.location.pathname = `/dashboard/${
            response.user.username}/businesses`;
        }
        const payload = {
          type,
          data: response,
        };
        actions.setAuthenticatedUser(payload);
      })
      .catch(error => console.error('Error:', error));

    } catch (error) {
      console.log(error);
    } finally {
      await actions.isComplete();
    }
  }

  render() {
    return (
      <div className="auth-content margin-top-15-vh">
        <Helmet>
          <title>
            Sign in - Worksfair
          </title>
        </Helmet>
        <h3 className="subtitle is-3">
          Log in
        </h3>
        <SigninForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

Signin.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  user: currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      isLoading,
      isComplete,
      setAuthenticatedUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin));

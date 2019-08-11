import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';

import PasswordForm from '../../forms/Auth/PasswordForm';
import ResetEmailForm from '../../forms/Auth/ResetEmailForm';
import {
  setAuthenticatedUser,
  AUTHENTICATION_FAILED,
  AUTHENTICATED_USER,
} from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import alert from '../utils/alert';
import { baseURL } from '../../utils/api';
import { sendResetEmail } from '../../utils/services';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') || localStorage.getItem('token');
    this.state = {
      token,
      validationErrors: {
        password: [],
        confirm_password: [],
      },
    }
  }

  sendEmail = async (user) => {
    try {
      const { token, email, get_fullname } = user;
      const url = `${
        window.location.host}/update-password?token=${token}`;
        if (token && email) {
            await sendResetEmail(url, email, get_fullname);
        } else {
            alert.error('Something went wrong. Please try again.');
        }
    } catch (error){
      console.log(error);
    }
  }

  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} data
   */
  submitEmail = async (user) => {
    const { actions } = this.props;
    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/reset-password/`;
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
          alert.error('Reset Password failed. Please try again.');
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
          this.sendEmail(response.user);
        }
      })
      .catch(error => console.error('Error:', error));

    } catch (error) {
      console.log(error);
    } finally {
      await actions.isComplete();
    }
  }

  submitPassword = async (passwords) => {
    const { actions } = this.props;
    const { token } = this.state;
    try {
      const { email } = jwtDecode(token);
      passwords.email = email;

      await actions.isLoading();

      const url = `${baseURL}/auth/update-password/`;
      let type = AUTHENTICATED_USER;

      fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ passwords }),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      }).then(res => {
        if (!res.ok) {
          type = AUTHENTICATION_FAILED;
          alert.error('Reset password failed. Please try again');
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
          alert.success('Successful!');
  
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
      alert.error('Reset password failed. Please try again');
      console.log(error);
    } finally {
      await actions.isComplete();
    }
  }

  render() {
    const { validationErrors, token } = this.state;

    return (
      <div className="auth-content margin-top-15-vh">
        <Helmet>
          <title>
            Reset Password - Worksfair
          </title>
        </Helmet>
        { token
          ? <Fragment>
            <h3 className="subtitle is-3">
              Reset Password
            </h3>
            <PasswordForm
              validationErrors={validationErrors}
              onSubmit={this.submitPassword}
            />
          </Fragment>
          : <Fragment>
            <h3 className="subtitle is-3">
              Reset Password Email
            </h3>
            <p className="subtitle is-6 has-text-link">
              A reset password email will be sent to you.
            </p>
            <ResetEmailForm
              onSubmit={this.submitEmail}
            />
          </Fragment>
        }
      </div>
    );
  }
}

ResetPassword.propTypes = {
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
)(ResetPassword));

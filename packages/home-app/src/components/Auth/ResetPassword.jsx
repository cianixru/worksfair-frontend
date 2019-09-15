import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';

import PasswordForm from '../../forms/Auth/PasswordForm';
import ResetEmailForm from '../../forms/Auth/ResetEmailForm';
import { setAuthenticatedUser } from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import alert from '../utils/alert';
import { baseURL } from '../../utils/api';
import { sendResetEmail } from '../../utils/services';
import { ResponseCallback, RESET_PASSWORD } from '../utils/callbacks';

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
    };
  }

  sendEmail = async (user) => {
    try {
      // eslint-disable-next-line camelcase
      const { token, email, get_fullname } = user;
      const url = `${
        window.location.host}/update-password?token=${token}`;
      if (token && email) {
        await sendResetEmail(url, email, get_fullname);
      } else {
        alert.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ts-check
  /**
   * @description Handles the form submit event
   *
   * @param {object} data
   */
  submitEmail = async (data) => {
    const { actions } = this.props;
    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/reset-password/`;
      data.email = data.email.toLowerCase();
      const Callback = new ResponseCallback(RESET_PASSWORD);

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(Callback.formatJson)
        .then(Callback.handleResponseAndPayload)
        .then((payload) => {
          this.setState(payload.state);
          this.sendEmail(payload.data.user);
        })
        .catch((error) => console.error('Error:', error));
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
      const Callback = new ResponseCallback(RESET_PASSWORD);

      await actions.isLoading();

      const url = `${baseURL}/auth/update-password/`;

      fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ passwords }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }
      }).then(Callback.formatJson)
        .then(Callback.handleResponseAndPayload)
        .then((payload) => {
          this.setState(payload.state);
          actions.setAuthenticatedUser(payload);
        })
        .catch((error) => console.error('Error:', error));
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

const mapDispatchToProps = (dispatch) => ({
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

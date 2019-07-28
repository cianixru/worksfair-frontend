import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SignupForm from '../../forms/Auth/SignupForm';
import {
  setAuthenticatedUser,
  AUTHENTICATION_FAILED,
  AUTHENTICATED_USER,
} from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import alert from '../utils/alert';
import { baseURL } from '../../utils/api';
import { sendConfirmationEmail } from '../../utils/services';

class Signup extends Component {
  state = {
    validationErrors: {
      first_name: [],
      last_name: [],
      email: [],
      username: [],
    },
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

  onSubmit = async (details) => {
    const { actions, history } = this.props;
    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/register/`;
      details.email = details.email.toLowerCase();
      details.role = 'admin';
      let type = AUTHENTICATED_USER;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(details),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          type = AUTHENTICATION_FAILED;
          alert.error('Signup failed. Check for more details');
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
          alert.success('Successfully Signed up!');

          const { user: { email, token, username } } = response;
          const url = `${
            window.location.host}/dashboard/${
            username}/webpages?token=${token}`;

          if (token && email) {
            sendConfirmationEmail(url, email);
            history.push({
              pathname: `/dashboard/${username}/webpages`,
              state: { previousLocation: 'signup' }
            });
          } else {
            alert.warning('Something went wrong. Confirmation email was not sent.');
            history.push({
              pathname: `/dashboard/${username}/webpages`,
              state: { previousLocation: 'login' }
            });
          }
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
  };

  render() {
    const { validationErrors } = this.state;
    return (
      <div className="auth-content signup">
        <Helmet>
          <title>Sign up - Worksfair</title>
        </Helmet>
        <h3 className="subtitle is-3">Sign up</h3>
        <SignupForm
          onSubmit={this.onSubmit}
          validationErrors={validationErrors}
          handleErrorReset={this.handleErrorReset}
        />
      </div>
    );
  }
}

Signup.propTypes = {
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
      setAuthenticatedUser,
      isLoading,
      isComplete,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup));

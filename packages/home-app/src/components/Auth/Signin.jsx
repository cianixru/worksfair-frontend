import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SigninForm from '../../forms/Auth/SigninForm';
import {
  setAuthenticatedUser,
} from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import { baseURL } from '../../utils/api';
import { ResponseCallback, SIGNIN } from '../utils/callbacks';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} user
   */
  onSubmit = async (user) => {
    const { actions } = this.props;
    const Callback = new ResponseCallback(SIGNIN);

    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/login/`;
      user.email = user.email.toLowerCase();

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(Callback.formatJson)
        .then(Callback.handleResponseAndPayload)
        .then((payload) => actions.setAuthenticatedUser(payload))
        .catch((error) => console.error('Error:', error));
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
)(Signin));

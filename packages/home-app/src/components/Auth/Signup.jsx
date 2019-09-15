import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SignupForm from '../../forms/Auth/SignupForm';
import {
  setAuthenticatedUser,
} from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import { baseURL } from '../../utils/api';
import ResponseCallback from '../utils/signupCallback';

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
    const Callback = new ResponseCallback(history);
    try {
      await actions.isLoading();

      const url = `${baseURL}/auth/register/`;
      details.email = details.email.toLowerCase();
      details.role = 'admin';

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(Callback.formatJson)
        .then(Callback.handleResponseAndPayload)
        .then((payload) => {
          this.setState(payload.state);
          actions.setAuthenticatedUser(payload);
        })
        .catch((error) => console.error('Error:', error));
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

const mapDispatchToProps = (dispatch) => ({
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

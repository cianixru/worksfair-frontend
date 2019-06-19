import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SignupForm from '../../forms/Auth/SignupForm';
import { signup, AUTHENTICATION_FAILED } from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';
import alert from '../utils/alert';

class Signup extends Component {
  state = {
    validationErrors: {
      first_name: [],
      last_name: [],
      email: [],
    },
  }

  onSubmit = async (details) => {
    const { actions, history } = this.props;
    try {
      await actions.isLoading();
      const response = await actions.signup(details);
      if (response.type === AUTHENTICATION_FAILED) {
        const { user } = response.data;
        this.setState({
          validationErrors: user,
        });
        alert.error('Signup failed. Check for more details');
      } else {
        alert.success('Successfully Signed up!');
        history.push(`/dashboard/${response.data.user.username}/webpages`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await actions.isComplete();
    }
  };

  render() {
    const { validationErrors } = this.state;
    return (
      <div>
        <Helmet>
          <title>Sign up - Worksfair</title>
        </Helmet>
        <h3 className="subtitle is-3">Sign up</h3>
        <SignupForm
          onSubmit={this.onSubmit}
          validationErrors={validationErrors}
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
      signup,
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

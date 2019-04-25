import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SignupForm from '../../forms/Auth/SignupForm';
import { signup } from '../../actions/auth';

class Signup extends Component {
  onSubmit = async (user) => {
    const { actions, history } = this.props;
    try {
      await actions.signup(user);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h3 className="subtitle is-3">Sign up</h3>
        <SignupForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
};

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      signup,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signup));

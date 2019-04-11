import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SignupForm from '../../forms/Auth/SignupForm';
import { signup } from '../../actions/auth';

class Signup extends Component {
  onSubmit = async (user) => {
    const { actions } = this.props;
    try {
      await actions.signup(user);
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
)(Signup);

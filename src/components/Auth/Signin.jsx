import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SigninForm from '../../forms/Auth/SigninForm';
import { signin } from '../../actions/auth';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} user
   */
  onSubmit = async (user) => {
    const { actions } = this.props;
    try {
      await actions.signin(user);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h3 className="subtitle is-3">Log in</h3>
        <SigninForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

Signin.propTypes = {
  actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      signin,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Signin);

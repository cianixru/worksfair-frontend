import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SigninForm from '../../forms/Auth/SigninForm';
import { signin } from '../../actions/auth';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} user
   */
  onSubmit = async (user) => {
    const { actions, history } = this.props;
    try {
      await actions.signin(user);
      const username = localStorage.getItem('username');
      history.push(`/dashboard/${username}`);
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
  history: PropTypes.object,
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
)(withRouter(Signin));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SigninForm from '../../forms/Auth/SigninForm';
import { signin } from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} data
   */
  onSubmit = async (data) => {
    const { actions, history, user } = this.props;
    try {
      await actions.isLoading();
      await actions.signin(data);
      history.push(`/dashboard/${user.username}`);
    } catch (err) {
      console.log(err);
    } finally {
      await actions.isComplete();
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
  user: PropTypes.object,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  user: currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      signin,
      isLoading,
      isComplete,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin));

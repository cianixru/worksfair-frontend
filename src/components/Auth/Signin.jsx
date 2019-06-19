import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SigninForm from '../../forms/Auth/SigninForm';
import { signin, getCurrentUser, } from '../../actions/auth';
import { isLoading, isComplete } from '../../actions/loader';

class Signin extends Component {
  // ts-check
  /**
   * @description Handles the form submit event
   * @param {object} data
   */
  onSubmit = async (data) => {
    const { actions } = this.props;
    try {
      await actions.isLoading();
      const response = await actions.signin(data);
      window.location.pathname = `/dashboard/${
        response.data.user.username}/webpages`;
    } catch (error) {
      console.log(error.message);
    } finally {
      await actions.isComplete();
    }
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Sign in - Worksfair</title>
        </Helmet>
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
  location: PropTypes.object,
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
      getCurrentUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin));

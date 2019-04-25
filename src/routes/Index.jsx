import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import AuthRoute from './Auth';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from './Dashboard';
import { getCurrentUser } from '../actions/auth';

class Routes extends Component {
  async componentDidMount() {
    try {
      const { actions } = this.props;
      await actions.getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { currentUser, isLoading, } = this.props;
    return (
      <div>
        <div className={isLoading ? 'spin-loader' : ''}>
          { isLoading
            && <Spinner
              className="spinner"
              name="three-bounce"
              color="steelblue"
            />
          }
        </div>
        <header>
          <Navbar user={currentUser && currentUser.user} />
        </header>
        <AuthRoute />
        <Dashboard />
      </div>
    );
  }
}

Routes.propTypes = {
  actions: PropTypes.object,
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool,
};

Routes.defaultProps = {
  currentUser: {},
};

const mapStateToProps = ({ auth, loader, }) => ({
  currentUser: auth.currentUser,
  isLoading: loader.isLoading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getCurrentUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes));

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
import { getWebpage } from '../actions/webpage';
import Webpage from './Webpage';
import WebpageNav from '../components/Navbar/WebpageNav';

class Routes extends Component {
  async componentDidMount() {
    try {
      const { actions } = this.props;
      await actions.getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }

  getWebpage = async (name) => {
    try {
      const { actions } = this.props;
      await actions.getWebpage(name);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { currentUser, isLoading, webpage, actions: { getCurrentUser }, } = this.props;
    const url = window.location.pathname;
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
          { url.includes('webpage') && !url.includes('webpages/new')
            ? <WebpageNav
              user={currentUser && currentUser.user}
              webpage={webpage && webpage} />
            : <Navbar user={currentUser && currentUser.user} />
          }
        </header>
        <AuthRoute />
        <Dashboard getCurrentUser={getCurrentUser} />
        <Webpage getWebpage={this.getWebpage} />
      </div>
    );
  }
}

Routes.propTypes = {
  actions: PropTypes.object,
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool,
  webpage: PropTypes.object,
};

Routes.defaultProps = {
  currentUser: {},
};

const mapStateToProps = ({ auth, loader, webpage, }) => ({
  currentUser: auth.currentUser,
  isLoading: loader.isLoading,
  webpage: webpage.webpage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getCurrentUser,
      getWebpage,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes));

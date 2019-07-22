import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import authRoutes from './Auth';
import Navbar from '../components/Navbar/Navbar';
import dashboardRoutes from './Dashboard';
import publicRoutes from './Public';

class Routes extends Component {
  render() {
    const {
      currentUser,
      isLoading,
    } = this.props;
    const token = localStorage.getItem('token');
    const { pathname } = this.props.location;
    const isNotAuthenticatedAndDashboard = !token
      && pathname.includes('/dashboard');

    const dashRoutes = isNotAuthenticatedAndDashboard? [] : dashboardRoutes;
    const routes = [
      ...authRoutes,
      ...dashRoutes,
      ...publicRoutes
    ];
    return (
      <Fragment>
        <div className={isLoading ? 'spin-loader' : ''}>
          { isLoading
            && <Spinner
              className="spinner"
              name="three-bounce"
              color="red"
            />
          }
        </div>
        <header>
          <Navbar user={currentUser && currentUser.user} />
        </header>
        <Switch>
          {
            routes.map((route, key) => (
              <Route key={route.path+key} {...route} />
            ))
          }
        </Switch>
      </Fragment>
    );
  }
}

Routes.propTypes = {
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

export default withRouter(connect(
  mapStateToProps,
  null,
)(Routes));

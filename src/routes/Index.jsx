import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import authRoutes from './Auth';
import Navbar from '../components/Navbar/Navbar';
import dashboardRoutes from './Dashboard';
import Webpage from '../containers/Webpage';
import WebpageNav from '../components/Navbar/WebpageNav';
import publicRoutes from './Public';

class Routes extends Component {
  render() {
    const {
      currentUser,
      isLoading,
      webpage,
    } = this.props;
    const token = localStorage.getItem('token');
    const { pathname } = this.props.location;
    const isNotAuthenticatedAndDashboard = !token
      && pathname.includes('/dashboard');

    const url = window.location.pathname;
    const dashRoutes = isNotAuthenticatedAndDashboard? [] : dashboardRoutes;
    const routes = [
      ...authRoutes,
      ...dashRoutes,
      ...publicRoutes
    ];
    return (
      <div>
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
          { url.includes('webpage') && !url.includes('webpages/new')
            && !url.includes('webpages')
            ? <WebpageNav
              user={currentUser && currentUser.user}
              webpage={webpage && webpage} />
            : <Navbar user={currentUser && currentUser.user} />
          }
        
        </header>
        <Switch>
          <Route exact path="/webpage/:subDomainName"
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => {
              return (<Webpage {...props} />);
            }}
          />
          {
            routes.map((route, key) => (
              <Route key={route.path+key} {...route} />
            ))
          }
        </Switch>
      </div>
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

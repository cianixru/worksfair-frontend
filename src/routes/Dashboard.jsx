import React, { Fragment } from 'react';
import {
  withRouter, Switch, Route, Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import CreateWebpage from '../containers/CreateWebpage';
import ListWebpages from '../containers/ListWebpages';
import UpdateWebpage from '../containers/UpdateWebpage';
import { composeDashboardLayout } from '../layouts/index';
import EditProfile from '../containers/EditProfile';

const composeLayout = Component => composeDashboardLayout(Component);

class Dashboard extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    const token = localStorage.getItem('token');
    const { pathname } = this.props.location;
    const isNotAuthenticatedAndDashboard = !token
      && pathname.includes('/dashboard');
    return (
      <Switch>
        { isNotAuthenticatedAndDashboard
          ? <Redirect
            to={{
              pathname: '/login',
            }}
          />
          : (
            <Fragment>
              <Route
                exact
                path="/dashboard/:username/webpages/new/basic-info"
                component={composeLayout(CreateWebpage)} />
              <Route
                exact
                path="/dashboard/:username/webpages/new/contact-info"
                component={composeLayout(CreateWebpage)} />
              <Route
                exact
                path="/dashboard/:username/webpages/new/gallery"
                component={composeLayout(CreateWebpage)} />
              <Route
                exact
                path="/dashboard/:username/webpages/new/offerings"
                component={composeLayout(CreateWebpage)} />
              <Route
                path="/dashboard/:username/webpages/edit/:subDomainName"
                component={composeLayout(UpdateWebpage)} />
              <Route
                exact
                path="/dashboard/:username/webpages"
                component={composeLayout(ListWebpages)} />
              <Route
                exact
                path="/dashboard/:username/profile"
                component={composeLayout(EditProfile)} />
            </Fragment>)
        }
      </Switch>
    );
  }
}

export default withRouter(Dashboard);

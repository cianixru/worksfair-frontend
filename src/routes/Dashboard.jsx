import React, { Fragment } from 'react';
import {
  withRouter, Switch, Route, Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import CreateWebpage from '../containers/CreateWebpage';
import ListWebpages from '../containers/ListWebpages';
import UpdateWebpage from '../containers/UpdateWebpage';
import { composeDashboardLayout } from '../layouts/index';

const composeLayout = Component => composeDashboardLayout(Component);

class Dashboard extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    const token = localStorage.getItem('token');
    const isNotAuthenticatedAndNotLoginNorSignup = !token
      && this.props.location.pathname !== '/login'
      && this.props.location.pathname !== '/signup';
    return (
      <Switch>
        { isNotAuthenticatedAndNotLoginNorSignup
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
            </Fragment>)
        }
      </Switch>
    );
  }
}

export default withRouter(Dashboard);

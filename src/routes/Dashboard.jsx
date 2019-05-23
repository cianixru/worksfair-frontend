import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import CreateWebpage from '../containers/CreateWebpage';
import ListWebpages from '../containers/ListWebpages';
import { composeDashboardLayout } from '../layouts/index';

const composeLayout = Component => composeDashboardLayout(Component);

class Dashboard extends React.Component {
  render() {
    return (
      <Switch>
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
          path="/dashboard/:username/webpages"
          component={composeLayout(ListWebpages)} />
      </Switch>
    );
  }
}

export default withRouter(Dashboard);

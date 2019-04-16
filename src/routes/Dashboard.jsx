import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import CreateWebpage from '../containers/CreateWebpage';
import { composeDashboardLayout } from '../layouts/index';

const composeLayout = Component => composeDashboardLayout(Component);

class Dashboard extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard" component={composeLayout(CreateWebpage)} />
        <Route
          path="/dashboard/:username/webpage/new"
          component={composeLayout(CreateWebpage)} />
      </Switch>
    );
  }
}

export default withRouter(Dashboard);

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from '../containers/Home';
import SearchResult from '../containers/SearchResult';

class PublicRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/home"
          component={Home}
        />
        <Route
          exact
          path="/search"
          component={SearchResult}
        />
      </Switch>
    );
  }
}

PublicRoute.propTypes = {
  getWebpage: PropTypes.func,
};

export default withRouter(PublicRoute);

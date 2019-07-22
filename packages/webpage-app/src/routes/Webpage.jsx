import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class WebpageRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/webpage/:subDomainName"
          // eslint-disable-next-line react/jsx-no-bind
          render={(props) => {
            return (<Webpage {...props} />);
          }}
        />
      </Switch>
    );
  }
}

export default withRouter(WebpageRoute);

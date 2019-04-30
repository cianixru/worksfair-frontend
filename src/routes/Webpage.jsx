import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Webpage from '../containers/Webpage';

class WebpageRoute extends Component {
  render() {
    const { getWebpage } = this.props;
    return (
      <Switch>
        <Route exact path="/webpage/:subDomainName"
          // eslint-disable-next-line react/jsx-no-bind
          render={(props) => {
            return (<Webpage {...props} getWebpage={getWebpage} />);
          }}
        />
      </Switch>
    );
  }
}

WebpageRoute.propTypes = {
  getWebpage: PropTypes.func,
};

export default withRouter(WebpageRoute);

import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import { composeAuthLayout } from '../layouts/index';
import Logout from '../components/Auth/Logout';

const composeLayout = Component => composeAuthLayout(Component);

class Auth extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={composeLayout(Signup)} />
        <Route path="/login" component={composeLayout(Signin)} />
        <Route path="/logout" component={Logout} />
      </Switch>
    );
  }
}

export default withRouter(Auth);

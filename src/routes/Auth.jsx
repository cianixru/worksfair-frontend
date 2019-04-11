import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import AuthLayout from '../layouts/AuthLayout';
// import Footer from '../components/Footer/Footer';

class Auth extends React.Component {
  render() {
    return (
      <div>
        <AuthLayout>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Signin} />
          </Switch>
        </AuthLayout>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(Auth);

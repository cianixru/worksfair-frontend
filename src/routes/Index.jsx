import React, { Component } from 'react';
import AuthRoute from './Auth';
import Navbar from '../components/Navbar/Navbar';

class Routes extends Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <AuthRoute />
      </div>
    );
  }
}

export default Routes;

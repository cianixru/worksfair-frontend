import React, { Component } from 'react';
import AuthRoute from './Auth';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from './Dashboard';

class Routes extends Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <AuthRoute />
        <Dashboard />
      </div>
    );
  }
}

export default Routes;

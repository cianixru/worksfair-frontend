import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/home">
            <img src={logo} width="112" height="28" alt="logo" />
          </Link>

          <a role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href="/">

            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        {
          window.location.pathname !== '/signup'
            || window.location.pathname !== '/login'
            ? null
            : (<div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/">
                  Home
                </Link>

                <Link className="navbar-item" to="/">
                  About
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link className="button is-white" to="/login">
                      Log in
                    </Link>
                    <Link className="button is-white" to="/signup">
                      Sign up
                    </Link>
                    <Link
                      className="button is-danger is-outlined is-rounded"
                      to="/"
                    >
                      Create Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>)
        }
      </nav>
    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import UserNavItem from './UserNavItem';

class Navbar extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = (event) => {
    const { navbar } = this.refs;
    const { pageYOffset } = event.currentTarget;
    if (pageYOffset >= 100) {
      navbar.className = 'navbar is-fixed-top';
    } else {
      navbar.className = 'navbar';
    }
  }

  render() {
    const { user } = this.props;
    const links = [
      {
        text: 'Dashboard',
        to: `/dashboard/${user && user.username}`,
        icon: 'fa fa-tachometer',
      },
      {
        text: 'Logout',
        to: '/logout',
        icon: 'fa fa-power-off',
      },
    ];

    return (
      <nav className="navbar"
        role="navigation"
        aria-label="main navigation"
        ref="navbar"
      >
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
          window.location.pathname === '/signup'
            || window.location.pathname === '/login'
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

                  { user
                    ? <UserNavItem
                      user={user}
                      links={links} />
                    : <div className="buttons">
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
                  }
                </div>
              </div>
            </div>)
        }
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
};

export default withRouter(Navbar);

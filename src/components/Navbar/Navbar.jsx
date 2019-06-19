import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import UserNavItem from './UserNavItem';

class Navbar extends Component {
  componentDidMount() {
    const navBurger = this.navBurger.current;
    navBurger.addEventListener('click', this.toggleNavbar);
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    const navBurger = this.navBurger.current;
    navBurger.removeEventListener('click', this.toggleNavbar);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  navBurger = React.createRef()

  navBar = React.createRef()

  navMenu = React.createRef()

  scrollHandler = (event) => {
    const navbar = this.navBar.current;
    const { pageYOffset } = event.currentTarget;
    if (pageYOffset >= 100) {
      navbar.className = 'navbar is-fixed-top';
    } else {
      navbar.className = 'navbar';
    }
  }

  toggleNavbar = (event) => {
    event.preventDefault();

    const navMenu = this.navMenu.current;
    const navBurger = this.navBurger.current;
    navMenu.classList.toggle('is-active');
    navBurger.classList.toggle('is-active');
  }

  render() {
    const { user } = this.props;
    const links = [
      {
        text: 'Dashboard',
        to: `/dashboard/${user && user.username}/webpages`,
        class: 'navbar-item',
      },
      {
        text: 'Logout',
        to: '/logout',
        class: 'navbar-item',
      },
    ];

    return (
      <nav className="navbar"
        role="navigation"
        aria-label="main navigation"
        ref={this.navBar}
        data-testid=""
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
            ref={this.navBurger}
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
            : (<div
              className="navbar-menu"
              ref={this.navMenu}>
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
                        className="button is-link is-outlined is-rounded"
                        to="/login"
                      >
                        Add Your Business for Free
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

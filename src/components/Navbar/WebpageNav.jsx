import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class WebpageNav extends Component {
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
    if (pageYOffset >= 70) {
      navbar.className = 'navbar is-fixed-top';
    } else {
      navbar.className = 'navbar';
    }
  }

  toggleNavbar = (event) => {
    event.preventDefault();

    const navMenu = this.navMenu.current;
    navMenu.classList.toggle('is-active');
  }

  render() {
    const { webpage, location } = this.props;

    return (
      <nav
        className="navbar webnav"
        role="navigation"
        aria-label="main navigation"
        data-testid="WebpageNavbar"
        ref={this.navBar}
      >
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href={`${location.pathname}#home`}>
            { webpage && webpage.logo
              ? <img src={webpage.logo} width="112" height="28" alt="logo" />
              : <h2 className="webpage-title">
                <strong>{ webpage && webpage.title }</strong>
              </h2>
            }
          </a>

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

        <div
          className="navbar-menu"
          ref={this.navMenu}>
          <div className="navbar-start">
            <a
              className="navbar-item is-tab"
              href={`${location.pathname}#home`}>
              Home
            </a>
            <a
              className="navbar-item is-tab"
              href={`${location.pathname}#about`}>
              About
            </a>
            <a
              className="navbar-item is-tab"
              href={`${location.pathname}#contact`}>
              Contact
            </a>
            <a
              className="navbar-item is-tab"
              href={`${location.pathname}#offerings`}>
              Services/Products
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link
                className="button is-outlined is-rounded"
                to="/"
              >
                Create Free Webpage
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

WebpageNav.propTypes = {
  user: PropTypes.object,
  webpage: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(WebpageNav);

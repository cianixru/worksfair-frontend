import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class WebpageNav extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = (event) => {
    const { navbar } = this.refs;
    const { pageYOffset } = event.currentTarget;
    if (pageYOffset >= 70) {
      navbar.className = 'navbar is-fixed-top';
    } else {
      navbar.className = 'navbar';
    }
  }

  render() {
    const { webpage } = this.props;
    return (
      <nav className="navbar webnav"
        role="navigation"
        aria-label="main navigation"
        ref="navbar"
        data-testid="WebpageNavbar"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/home">
            { webpage && webpage.logo
              ? <img src={webpage.logo} width="112" height="28" alt="logo" />
              : <h2 className="webpage-title">
                <strong>{ webpage && webpage.title }</strong>
              </h2>
            }
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

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
                Go to Worksfair
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <Link
                className="button is-outlined is-rounded"
                to="/"
              >
                Create Webpage
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
};

export default withRouter(WebpageNav);

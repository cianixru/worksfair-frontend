import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { resolve } from 'path';
import { NavLink } from 'react-router-dom';
import keygen from 'keygenerator';

class SideNav extends Component {
  dashNav = React.createRef()

  toggleDashNav = (event) => {
    event.preventDefault();

    const dashNav = this.dashNav.current;
    dashNav.classList.toggle('active-nav');
  }

  render() {
    const {
      links: {
        main, webpage, settings,
      }
    } = this.props;
    return (
      <div>
        <div className="dashboard-button">
          <button
            className="button is-medium is-fullwidth is-dark"
            onClick={this.toggleDashNav}>
            <span className="icon">
              <i className="fa fa-navicon" />
            </span>
            <span>Dashboard Navigation</span>
          </button>
        </div>
        <div
          className="dashboard-nav"
          ref={this.dashNav}
          // style={{ display }}
        >
          <div className="dashboard-nav-inner">
            <ul data-submenu-title="Main">
              {main.map(link => (
                <li
                  key={keygen.transaction_id()}
                  className={
                    window.location.pathname === link.to ? 'active' : null
                  }
                >
                  <NavLink to={resolve(link.to)} activeClassName="active">
                    <i className={link.icon} aria-hidden="true" />
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul data-submenu-title="Webpages">
              {webpage.map(link => (
                <li
                  key={keygen.transaction_id()}
                  className={
                    window.location.pathname === link.to ? 'active' : null
                  }
                >
                  <NavLink to={resolve(link.to)} activeClassName="active">
                    <i className={link.icon} aria-hidden="true" />
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul data-submenu-title="Settings">
              {settings.map(link => (
                <li
                  key={keygen.transaction_id()}
                  className={
                    window.location.pathname === link.to ? 'active' : null
                  }
                >
                  <NavLink to={resolve(link.to)} activeClassName="active">
                    <i className={link.icon} aria-hidden="true" />
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  links: PropTypes.object,
};

export default SideNav;

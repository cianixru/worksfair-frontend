import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { resolve } from 'path';
import { NavLink } from 'react-router-dom';
import keygen from 'keygenerator';

class SideNav extends Component {
  render() {
    const {
      links: {
        main, webpage, settings,
      }
    } = this.props;
    return (
      <div className="dashboard-nav">
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
    );
  }
}

SideNav.propTypes = {
  links: PropTypes.object,
};

export default SideNav;

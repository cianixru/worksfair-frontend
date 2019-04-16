import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import keygen from 'keygenerator';

const DashboardHeader = ({ title, navigation, children }) => {
  return (
    <div className="dashboard-titlebar">
      <div className="columns">
        <div className="column">
          <h2>{title}</h2>
          {children && children}
        </div>
        <div className="column" />
        <nav className="column breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {
              navigation && navigation.map(link => (
                <li
                  key={keygen.transaction_id()}
                  className={
                    window.location.pathname === link.to ? 'is-active' : null
                  }
                >
                  <Link to={link.to}>{link.text}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.array,
  children: PropTypes.element,
};

export default DashboardHeader;

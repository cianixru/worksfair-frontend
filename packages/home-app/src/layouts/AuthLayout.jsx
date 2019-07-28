import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const AuthLayout = ({ Component }) => {
  return (
    <Fragment>
      <div className="auth-layout">
        
      </div>
      <div className="columns is-mobile auth-overlay">
        <div className="column is-one-third-desktop" >
          <Component />
        </div>
      </div>
    </Fragment>
  );
};

AuthLayout.propTypes = {
  Component: PropTypes.func,
};

export default AuthLayout;

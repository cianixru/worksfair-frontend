import React from 'react';
import PropTypes from 'prop-types';


const AuthLayout = ({ Component }) => {
  return (
    <div className="layout-auth">
      <div className="columns is-mobile is-centered">
        <div className="column is-one-third-desktop" >
          <Component />
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  Component: PropTypes.func,
};

export default AuthLayout;

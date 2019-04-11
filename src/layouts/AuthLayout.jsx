import React from 'react';
import PropTypes from 'prop-types';


const AuthLayout = (props) => {
  return (
    <div className="layout-auth">
      <div className="columns is-mobile is-centered">
        <div className="column is-one-third-desktop" >
          {props.children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.element,
};

export default AuthLayout;

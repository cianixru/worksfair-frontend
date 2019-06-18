import React from 'react';
import PropTypes from 'prop-types';
import SideNav from '../components/SideNav/SideNav';


const DashboardLayout = ({ Component }) => {
  const username = localStorage.getItem('username');
  const links = {
    main: [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/webpages`,
        icon: 'fa fa-tachometer',
      },
    ],
    webpage: [
      {
        text: 'Create Business Webpage',
        to: `/dashboard/${username}/webpages/new/basic-info`,
        icon: 'fa fa-plus-square',
      },
      {
        text: 'Your Webpages',
        to: `/dashboard/${username}/webpages`,
        icon: 'fa fa-th-list',
      },
    ],
    settings: [
      {
        text: 'Your Profile',
        to: `/dashboard/${username}/profile`,
        icon: 'fa fa-user',
      },
      {
        text: 'Logout',
        to: '/logout',
        icon: 'fa fa-power-off',
      },
    ]
  };

  return (
    <div className="columns is-desktop dashboard-layout">
      <div className="column is-one-quarter-desktop">
        <SideNav links={links} />
      </div>
      <div className="column is-three-quarter-desktop" >
        <Component />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  Component: PropTypes.func,
};

export default DashboardLayout;

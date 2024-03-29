import React from 'react';
import PropTypes from 'prop-types';
import SideNav from '../components/SideNav/SideNav';


const DashboardLayout = ({ Component }) => {
  const username = localStorage.getItem('username');
  const links = {
    main: [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/businesses`,
        icon: 'fa fa-tachometer',
      },
    ],
    webpage: [
      {
        text: 'Add Your Business',
        to: `/dashboard/${username}/business/new/basic-info`,
        icon: 'fa fa-plus-square',
      },
      {
        text: 'Your Business/Webpages',
        to: `/dashboard/${username}/businesses`,
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
      <div className="column is-three-quarter-desktop dashboard-container" >
        <Component />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  Component: PropTypes.func,
};

export default DashboardLayout;

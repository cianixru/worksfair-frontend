import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UpdateWebpage from '../components/Dashboard/UpdateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';

class UpdateWebpageContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/webpages`,
      },
      {
        text: 'Update Webpage',
        to: '/edit/',
      },
    ];
    return (
      <div className="dashboard-content">
        <DashboardHeader
          title="Update Webpage"
          navigation={navigation}
        />
        <UpdateWebpage username={username} />
      </div>
    );
  }
}

UpdateWebpageContainer.propTypes = {
  match: PropTypes.object,
};

export default UpdateWebpageContainer;

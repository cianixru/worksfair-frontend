import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CreateWebpage from '../components/Dashboard/CreateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';

class CreateWebpageContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}`,
      },
      {
        text: 'Create Webpage',
        to: `/dashboard/${username}/webpages/new`,
      },
    ];
    return (
      <div className="dashboard-content">
        <DashboardHeader
          title="Create Webpage"
          navigation={navigation}
        >
          <Link to="/demo">View Sample Webpage</Link>
        </DashboardHeader>
        <CreateWebpage />
      </div>
    );
  }
}

export default CreateWebpageContainer;

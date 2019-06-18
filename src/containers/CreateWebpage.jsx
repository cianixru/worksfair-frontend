import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CreateWebpage from '../components/Dashboard/CreateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Footer from '../components/Footer/Footer';

class CreateWebpageContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/webpages`,
      },
      {
        text: 'Create Webpage',
        to: `/dashboard/${username}/webpages/new/basic-info`,
      },
    ];
    return (
      <div className="dashboard-content">
        <DashboardHeader
          title="Create Webpage"
          navigation={navigation}
        >
          <Link to="/demo">View Sample Business Webpage</Link>
        </DashboardHeader>
        <CreateWebpage username={username} />
        <Footer/>
      </div>
    );
  }
}

export default CreateWebpageContainer;

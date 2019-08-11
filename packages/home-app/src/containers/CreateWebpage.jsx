import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import CreateWebpage from '../components/Dashboard/CreateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Footer from '../components/Footer/Footer';

class CreateWebpageContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/businesses`,
      },
      {
        text: 'Add Your Business',
        to: `/dashboard/${username}/business/new/basic-info`,
      },
    ];
    return (
      <div className="dashboard-content">
        <Helmet>
          <title>Add Your Business - Worksfair</title>
        </Helmet>
        <DashboardHeader
          title="Add Your Business"
          navigation={navigation}
        >
          <a
            href="http://ideosynergy.worksfair.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View a sample business website
          </a>
        </DashboardHeader>
        <CreateWebpage username={username} />
        <Footer/>
      </div>
    );
  }
}

export default CreateWebpageContainer;

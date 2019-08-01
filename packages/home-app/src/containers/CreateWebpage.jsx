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
        to: `/dashboard/${username}/webpages`,
      },
      {
        text: 'Create Webpage',
        to: `/dashboard/${username}/webpages/new/basic-info`,
      },
    ];
    return (
      <div className="dashboard-content">
        <Helmet>
          <title>Create Webpage - Worksfair</title>
        </Helmet>
        <DashboardHeader
          title="Create Webpage"
          navigation={navigation}
        >
          <a
            href="http://ideosynergy.worksfair.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View a sample business webpage
          </a>
        </DashboardHeader>
        <CreateWebpage username={username} />
        <Footer/>
      </div>
    );
  }
}

export default CreateWebpageContainer;

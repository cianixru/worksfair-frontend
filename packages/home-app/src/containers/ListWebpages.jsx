import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import ListWebpages from '../components/Dashboard/ListWebpages';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Footer from '../components/Footer/Footer';

class ListWebpagesContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `dashboard/${username}/webpages`,
      },
    ];
    return (
      <Fragment>
        <Helmet>
          <title>Dashboard - Worksfair</title>
        </Helmet>
        <div className="dashboard-content">
          <DashboardHeader
            title={`How far, ${username}!`}
            navigation={navigation}
          />
          <ListWebpages />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default ListWebpagesContainer;

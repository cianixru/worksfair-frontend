import React, { Component } from 'react';

import ListWebpages from '../components/Dashboard/ListWebpages';
import DashboardHeader from '../components/Dashboard/DashboardHeader';

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
      <div className="dashboard-content">
        <DashboardHeader
          title={`How far, ${username}!`}
          navigation={navigation}
        />
        <ListWebpages />
      </div>
    );
  }
}

export default ListWebpagesContainer;

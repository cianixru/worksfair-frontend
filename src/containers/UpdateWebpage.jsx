import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import UpdateWebpage from '../components/Dashboard/UpdateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Footer from '../components/Footer/Footer';

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
        to: this.props.location.pathname,
      },
    ];
    return (
      <Fragment>
        <div className="dashboard-content">
          <DashboardHeader
            title="Update Webpage"
            navigation={navigation}
          />
          <UpdateWebpage username={username} />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

UpdateWebpageContainer.propTypes = {
  location: PropTypes.object,
};

export default withRouter(UpdateWebpageContainer);

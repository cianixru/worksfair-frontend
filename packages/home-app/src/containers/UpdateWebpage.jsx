import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import UpdateWebpage from '../components/Dashboard/UpdateWebpage';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Footer from '../components/Footer/Footer';

class UpdateWebpageContainer extends Component {
  render() {
    const username = localStorage.getItem('username');
    const navigation = [
      {
        text: 'Dashboard',
        to: `/dashboard/${username}/businesses`,
      },
      {
        text: 'Update Business Info',
        to: this.props.location.pathname,
      },
    ];
    return (
      <Fragment>
        <Helmet>
          <title>Update Business Info</title>
        </Helmet>
        <div className="dashboard-content">
          <DashboardHeader
            title="Update Business Info"
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

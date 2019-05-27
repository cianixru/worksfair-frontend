import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import sampleImage from '../../assets/sample-02.jpg';
import { getDateForNextUpdate } from '../../utils/helpers';
import WebpageItem from './ListWebpages/WebpageItem';
import NoWebpages from './ListWebpages/NoWebpages';

class ListWebpages extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="tabs is-boxed">
          <ul>
            <li className="is-active">
              <Link to={`/dashboard/${user && user.username}/webpages`}>
                Active Webpages ({
                  (user && user.webpages) && user.webpages.length})
              </Link>
            </li>
            <li>
              <Link to="/">
                Inactive Webpages
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            { (user && user.webpages) && user.webpages.length > 0
              ? user.webpages.map((webpage) => {
                const dayCreated = new Date(webpage.created_at).toDateString();
                const nextUpdate = getDateForNextUpdate(webpage.updated_at);

                const itemProps = {
                  nextUpdate, dayCreated, webpage, sampleImage,
                };
                return (
                  <WebpageItem key={webpage.sub_domain_name} {...itemProps} />
                );
              })
              : <NoWebpages username={user && user.username} />
            }
          </ul>
        </div>
      </div>
    );
  }
}

ListWebpages.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  user: currentUser.user,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(ListWebpages));

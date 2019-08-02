import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getDateForNextUpdate } from '../../utils/helpers';
import WebpageItem from './ListWebpages/WebpageItem';
import NoWebpages from './ListWebpages/NoWebpages';
import {
  getCurrentUser,
  confirmAccount,
  CONFIRM_USER,
} from '../../actions/auth';
import alert from '../utils/alert';

const sampleImage = "https://imgplaceholder.com/180x180/131111?text=ADD+A+PICTURE&font-size=18";
class ListWebpages extends Component {
  async componentDidMount() {
    const { actions, location, user } = this.props;
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if (token){
        const response = await actions.confirmAccount({
          token,
        });
        if (response.type === CONFIRM_USER) {
          if (response.data.message === 'Your account has already been activated.') {
            alert.info(response.data.message);
          } else {
            alert.success(response.data.message);
          }
        } else {
          alert.error(response.data.message);
        }
        setTimeout(() => (
          window.location.replace(`/dashboard/${user.username}/webpages`)
        ), 3000);
      }
      await actions.getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { user } = this.props;
    const username = user && user.username;
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
          </ul>
        </div>
        <div>
          <ul>
            { (user && user.webpages) && user.webpages.length > 0
              ? user.webpages.map((webpage) => {
                const dayCreated = new Date(webpage.created_at).toDateString();
                const nextUpdate = getDateForNextUpdate(webpage.updated_at);

                const itemProps = {
                  nextUpdate, dayCreated, webpage, sampleImage, username
                };
                return (
                  <WebpageItem key={webpage.sub_domain_name} {...itemProps} />
                );
              })
              : <NoWebpages user={user && user} />
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getCurrentUser,
      confirmAccount,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListWebpages));

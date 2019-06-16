import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getUser } from '../actions/public';
import { isLoading, isComplete } from '../actions/loader';
import UserProfile from '../components/Dashboard/UserProfile';

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object,
    match: PropTypes.object,
    actions: PropTypes.object,
    getUser: PropTypes.func,
  }

  async componentDidMount() {
    const { match, actions } = this.props;
    try {
      actions.isLoading();
      const data = {
        username: match.params.username,
      };
      await actions.getUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      actions.isComplete();
    }
  }

  render() {
    const { user } = this.props;

    return (
      <section className="section">
        { user && <UserProfile user={user} />}
      </section>
    );
  }
}

const mapStateToProps = ({ publicData: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getUser,
      isComplete,
      isLoading,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage));

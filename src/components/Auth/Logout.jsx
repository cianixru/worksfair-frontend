import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.actions.logout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

Logout.propTypes = {
  actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NoWebpages = ({ user }) => (
  <li>
    <div className="message is-warning">
      <div className="message-body">
        <p className="is-size-5">
          You have no active webpages
        </p>
        { user.confirmed_account &&
          <Link
            to={`/dashboard/${user.username}/webpages/new/basic-info`}
            className="button is-link is-outlined  margin-top-25">
            Create a Webpage
          </Link>
        }
      </div>
    </div>
  </li>
);

NoWebpages.propTypes = {
  user: PropTypes.object,
};

export default NoWebpages;

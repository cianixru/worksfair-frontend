import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NoWebpages = ({ username }) => (
  <li>
    <div className="message is-warning">
      <div className="message-body">
        <p className="is-size-5 margin-bottom-25">
          You have no active webpages
        </p>
        <Link
          to={`/dashboard/${username}/webpages/new/basic-info`}
          className="button is-link is-outlined"
        >
          Create a Webpage
        </Link>
      </div>
    </div>
  </li>
);

NoWebpages.propTypes = {
  username: PropTypes.string,
};

export default NoWebpages;

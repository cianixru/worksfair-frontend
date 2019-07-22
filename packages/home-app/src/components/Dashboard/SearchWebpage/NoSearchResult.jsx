import React from 'react';
import PropTypes from 'prop-types';

const NoWebpages = () => (
  <li>
    <div className="message is-warning">
      <div className="message-body">
        <p className="is-size-5 margin-bottom-25">
          Sorry, we could not find any business matching your description.
        </p>
        <p className="has-text-info">
            Perhaps you can try better keywords
        </p>
      </div>
    </div>
  </li>
);

NoWebpages.propTypes = {
  username: PropTypes.string,
};

export default NoWebpages;

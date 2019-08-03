import React from 'react';
import PropTypes from 'prop-types';

import { textColourHelper } from '../../utils/helpers';

const TitleBar = ({ webpage }) => {
  const colour = textColourHelper(webpage && webpage.colour);
  const message = <span className="has-text-grey-light">Not available yet</span>;
  const phone = webpage.phone ? webpage.phone : message;
  const email = webpage.email ? webpage.email : message;
  const address = webpage.address
    ? `${webpage.address}, ${webpage.city}, ${webpage.state}` : message;

  return (
    <div id="titlebar" className="webpage-sections">
      <div>
        <h2 className="title is-4 titles has-text-grey">
          Contact { webpage.title }
          {webpage.verified_business && <i className="verified-icon" />}
          <span> </span>
          <span
            className={`button is-rounded ${webpage.colour} is-outlined`}>
            { webpage.keywords && webpage.keywords.split(',')[0] }
          </span>
          {webpage.verified_business && <i className="verified-icon" />}
        </h2>
        <p className="webpage-title-content">
          <i className={`fa fa-map-marker ${colour}`} aria-hidden="true" />
          {address}
        </p>
        <p className="webpage-title-content">
          <i className={`fa fa-phone ${colour}`} aria-hidden="true" />
          {phone}
        </p>
        <p className="webpage-title-content">
          <i className={`fa fa-envelope-o ${colour}`} aria-hidden="true" />
          {email}
        </p>
      </div>

      {
        webpage.verified_business && <div
          className="verified-badge">
          <i className="fa fa-check-circle-o" aria-hidden="true" />
            Verified By Worksfair.com
        </div>
      }
    </div>
  );
};

TitleBar.propTypes = {
  webpage: PropTypes.object
};

export default TitleBar;

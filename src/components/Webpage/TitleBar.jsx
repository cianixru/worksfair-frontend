import React from 'react';
import PropTypes from 'prop-types';

import { backgroundColourHelper } from '../../utils/helpers';

const TitleBar = ({ webpage }) => {
  return (
    <div id="titlebar" className="webpage-sections">
      <div>
        <h2>{ webpage.title } <i className="verified-icon" />
          <span
            className={`button is-rounded ${webpage.colour} is-outlined`}>
            { webpage.keywords.split(',')[0] }
          </span>
        </h2>
        { webpage.address
            && <span className="webpage-address">
              <i className="fa fa-map-marker" aria-hidden="true" />
              { `${webpage.address}, ${webpage.city}, ${webpage.state}` }
            </span>
        }
      </div>

      <div
        className={`${backgroundColourHelper(webpage.colour)} verified-badge`}>
        <i className="fa fa-check-circle-o" aria-hidden="true" />
          Verified Business
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  webpage: PropTypes.object
};

export default TitleBar;

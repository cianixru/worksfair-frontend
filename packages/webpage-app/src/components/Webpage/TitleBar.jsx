import React from 'react';
import PropTypes from 'prop-types';


const TitleBar = ({ webpage }) => {
  return (
    <div id="titlebar" className="webpage-sections">
      <div>
        <h2>{ webpage.title }
          {webpage.verified_business && <i className="verified-icon" />}
          <span> </span>
          <span
            className={`button is-rounded ${webpage.colour} is-outlined`}>
            { webpage.keywords && webpage.keywords.split(',')[0] }
          </span>
        </h2>
        { webpage.address
            && <span className="webpage-address">
              <i className="fa fa-map-marker" aria-hidden="true" />
              { `${webpage.address}, ${webpage.city}, ${webpage.state}` }
            </span>
        }
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

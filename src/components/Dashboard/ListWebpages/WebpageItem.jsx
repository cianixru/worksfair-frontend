import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import { textColourHelper } from '../../../utils/helpers';

const WebpageItem = ({
  nextUpdate, dayCreated, webpage, sampleImage
}) => (
  <li>
    <div className="media box">
      <div className="media-left">
        <figure className="image is-180x180">
          <img
            src={(webpage.featured_images && webpage.featured_images[0])
              || sampleImage}
            alt="sample" />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <h3>
            <Link
              to={`/webpage/${webpage.sub_domain_name}`}
              className={textColourHelper(webpage.colour)}
            >
              {webpage.title}
            </Link>
          </h3>
          <span>
            {`${webpage.address}, ${webpage.city}, ${webpage.state}`}
          </span>
        </div>
        <div>
          <h6 className="is-size-7">
            <strong>Day Created:</strong>
            <span className="has-text-black"> {dayCreated}</span>
          </h6>
          <h6 className="is-size-7">
            <strong>Due For Update:</strong>
            <span className="has-text-warning"> {nextUpdate}</span>
          </h6>
        </div>
      </div>
      <div>
        <Link to="/" className="button is-white">
          <i className="fa fa-edit is-size-5 has-text-grey"/>
        </Link>
      </div>
    </div>
  </li>
);

WebpageItem.propTypes = {
  webpage: PropTypes.object,
  nextUpdate: PropTypes.string,
  dayCreated: PropTypes.string,
  sampleImage: PropTypes.string,
};

export default WebpageItem;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { textColourHelper } from '../../../utils/helpers';

const WebpageItem = ({
  dayCreated, webpage, sampleImage
}) => (
  <li>
    <div className="columns box">
      <div className="column is-3">
        <figure className="image is-180x180">
          <img
            src={(webpage.featured_images && webpage.featured_images[0])
              || sampleImage}
            alt="sample" />
        </figure>
      </div>
      <div className="column is-7">
        <div className="content">
          <h3>
            <Link
              to={`/webpage/${webpage.sub_domain_name}`}
              className={textColourHelper(webpage.colour)}
            >
              {webpage.title}
            </Link>
          </h3>
          <p>{webpage.description}</p>
          <p className="is-size-6">
            {`${webpage.address}, `}
            <strong>{`${webpage.city}, ${webpage.state} `}</strong>
          </p>
        </div>
        <div>
          <h6 className="is-size-7">
            <strong>Added to Worksfair on:</strong>
            <span className="has-text-black"> {dayCreated}</span>
          </h6>
        </div>
      </div>
    </div>
  </li>
);

WebpageItem.propTypes = {
  webpage: PropTypes.object,
  dayCreated: PropTypes.string,
  sampleImage: PropTypes.string,
};

export default WebpageItem;

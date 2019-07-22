import React from 'react';
import PropTypes from 'prop-types';

import { textColourHelper } from '../../../utils/helpers';

const WebpageItem = ({
  dayCreated, webpage, sampleImage
}) => (
  <li>
    <div className="columns box">
      <div className="column is-3">
        <figure className="image is-150x150">
          <img
            src={(webpage.featured_images && webpage.featured_images[0])
              || sampleImage}
            alt="sample" />
        </figure>
      </div>
      <div className="column is-9">
        <div className="content">
          <h3>
            <a
              href={`http://${webpage.sub_domain_name}.worksfair.com`}
              className={textColourHelper(webpage.colour)}
            >
              {webpage.title}
            </a>
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

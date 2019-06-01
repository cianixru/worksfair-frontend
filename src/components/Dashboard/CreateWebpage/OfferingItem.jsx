import React from 'react';
import PropTypes from 'prop-types';

import { addNaira } from '../../utils/helpers';

const OfferingItem = ({
  offerings,
}) => {
  return (
    <ul>
      { offerings.length > 0
        && offerings.map(offering => (
          <li
            className="media box"
            key={offering.title}
          >
            <div className="media-left">
              <figure className="image is-180x180">
                <img
                  src={offering.image}
                  alt=""
                  className="offering-image"
                />
              </figure>
            </div>
            <div className="media-content">
              <h4 className="title is-5">
                {offering.title}
              </h4>
              <p>{offering.description}</p>
              <div className="">
                {addNaira(offering.price)}
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

OfferingItem.propTypes = {
  offerings: PropTypes.array,
};

export default OfferingItem;

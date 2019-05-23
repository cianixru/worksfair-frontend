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
            className="columns box"
            key={offering.title}
          >
            <div className="column is-4">
              <img
                src={offering.image}
                alt=""
                className="offering-image"
              />
            </div>
            <div className="column is-6">
              <h4 className="subtitle is-5">
                {offering.title}
              </h4>
              <p>{offering.description}</p>
            </div>
            <div className="column is-2">
              {addNaira(offering.price)}
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

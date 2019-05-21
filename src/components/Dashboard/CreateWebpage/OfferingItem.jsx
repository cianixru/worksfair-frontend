import React from 'react';
import PropTypes from 'prop-types';

const OfferingItem = ({
  offerings,
}) => {
  return (
    <div>
      { offerings.length > 0
        && offerings.map(offering => (
          <div
            className="columns card card-content"
            key={offering.title}
          >
            <div className="column is-4">
              <img
                src={offering.image}
                alt=""
                className="offering-image"
              />
            </div>
            <div className="column is-7">
              <h4 className="title is-5 has-text-grey-darker">
                {offering.title}
              </h4>
              <p>{offering.description}</p>
            </div>
            <div className="column is-1">
              <p>{offering.price}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

OfferingItem.propTypes = {
  offerings: PropTypes.array,
};

export default OfferingItem;

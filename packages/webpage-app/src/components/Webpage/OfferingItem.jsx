import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import { addNairaSign } from '../utils/helpers';

const OfferingItem = ({
  offerings,
  colour,
}) => {
  return (
    <ul className="columns">
      { offerings.length > 0
        && offerings.map(offering => (
          <div
            key={offering.title}
            className="column is-6">
            <li
              className="box"
            >
              <div className="columns is-desktop">
                <div className="column">
                  <figure className="image is-180x180">
                    <Image
                      cloudName="worksfair"
                      publicId={offering.image}
                      type="fetch"
                      className="offering-image">
                      <Transformation width="180" fetchFormat="auto" />
                    </Image>
                  </figure>
                </div>
                <div className="column">
                  <h4 className="title is-5">
                    {offering.title}
                  </h4>
                  <p>{offering.description}</p>
                  <div className={`tag ${colour} is-large`}>
                    {addNairaSign(offering.price)}
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))
      }
    </ul>
  );
};

OfferingItem.propTypes = {
  offerings: PropTypes.array,
};

export default OfferingItem;

import React from 'react';
import PropTypes from 'prop-types';
import OfferingContent from './OfferingContent';

const OfferingItem = ({
  offerings,
  validationErrors,
  handleErrorReset,
  handleOfferingImageSelection,
  selectedImage,
  onSubmit,
  colour,
  handleDelete,
}) => {
  return (
    <ul>
      { offerings.length > 0
        && offerings.map((offering, index) => (
          <OfferingContent
            key={`${offering.title}${index}`}
            offering={offering}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleOfferingImageSelection={handleOfferingImageSelection}
            selectedImage={selectedImage}
            onSubmit={onSubmit}
            colour={colour}
            handleDelete={handleDelete}
          />
        ))
      }
    </ul>
  );
};

OfferingItem.propTypes = {
  offerings: PropTypes.array.isRequired,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  handleOfferingImageSelection: PropTypes.func,
  offeringsFormRef: PropTypes.object,
  selectedImage: PropTypes.string,
  colour: PropTypes.string,
  onSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
  webpage: PropTypes.object,
};

export default OfferingItem;

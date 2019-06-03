import React from 'react';
import PropTypes from 'prop-types';

import ImageUpload from '../../utils/ImageUpload';
import OfferingsForm from '../../../forms/Webpage/OfferingsForm';
import OfferingItems from './OfferingItem';

const Offerings = ({
  onSubmit,
  validationErrors,
  handleErrorReset,
  handleOfferingImageSelection,
  offerings,
  offeringsFormRef,
  selectedImage,
  handleSaveAndPreview,
  webpage,
  onUpdateOffering,
  handleDelete,
}) => {
  return (
    <div>
      <div className="margin-bottom-25">
        <OfferingItems
          offerings={(webpage && webpage.offerings) || offerings}
          validationErrors={validationErrors}
          handleErrorReset={handleErrorReset}
          handleOfferingImageSelection={handleOfferingImageSelection}
          selectedImage={selectedImage}
          onSubmit={onUpdateOffering}
          colour={webpage && webpage.colour}
          handleDelete={handleDelete}
        />
      </div>
      <div className="columns box margin-bottom-25">
        <div className="column is-one-third">
          <ImageUpload
            handleOfferingImageSelection={handleOfferingImageSelection}
            selectedImage={selectedImage}
          />
        </div>
        <div className="column">
          <OfferingsForm
            onSubmit={onSubmit}
            validationErrors={validationErrors}
            offeringsFormRef={offeringsFormRef}
            handleErrorReset={handleErrorReset}
          />
        </div>
      </div>
      <div className="control">
        <button
          type="submit"
          // disabled={pristine || invalid}
          className="button is-medium is-danger is-rounded"
          data-testid="save-and-preview"
          onClick={handleSaveAndPreview}
        >
          Preview Webpage
        </button>
      </div>
    </div>
  );
};

Offerings.propTypes = {
  onSubmit: PropTypes.func,
  onUpdateOffering: PropTypes.func,
  user: PropTypes.object,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  handleOfferingImageSelection: PropTypes.func,
  offerings: PropTypes.array,
  offeringsFormRef: PropTypes.object,
  selectedImage: PropTypes.string,
  handleSaveAndPreview: PropTypes.func,
  handleDelete: PropTypes.func,
  webpage: PropTypes.object,
};

export default Offerings;

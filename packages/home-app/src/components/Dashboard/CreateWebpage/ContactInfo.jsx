import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ContactInfoForm from '../../../forms/Webpage/ContactInfoForm';

const ContactInfo = ({
  onSubmit, validationErrors, handleErrorReset, webpage,
}) => {
  return (
    <Fragment>
      <div className="add-webpage-form">
        <ContactInfoForm
          onSubmit={onSubmit}
          validationErrors={validationErrors}
          handleErrorReset={handleErrorReset}
          webpage={webpage} />
      </div>
    </Fragment>
  );
};

ContactInfo.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  webpage: PropTypes.object,
};

export default ContactInfo;

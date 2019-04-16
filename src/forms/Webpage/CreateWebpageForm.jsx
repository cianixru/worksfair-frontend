import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

import Tooltip from '../../atoms/Tooltip';
import { tooltipMessage } from '../../utils/messages';

// @ts-check
/**
 * The CreateWebpageForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const CreateWebpageForm = ({ onSubmit, validate, }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <h5>
                Business Name
                <Tooltip message={tooltipMessage.businessName} />
              </h5>
              <div className="control">
                <Field
                  className="input is-medium"
                  name="title"
                  type="text"
                  component="input"
                  validate={validate}
                  data-testid="business-name"
                />
              </div>
            </div>

            <div className="field">
              <h5>
                Describe your business
                <Tooltip message={tooltipMessage.description} />
              </h5>
              <div className="control">
                <Field
                  className="input is-medium"
                  name="keywords"
                  type="text"
                  component="input"
                  validate={validate}
                  data-testid="business-keywords"
                />
              </div>
            </div>

            <div className="field">
              <h5>
                Keywords
                <Tooltip message={tooltipMessage.keywords} />
              </h5>
              <div className="control">
                <Field
                  className="input is-medium"
                  name="keywords"
                  type="text"
                  component="input"
                  validate={validate}
                  data-testid="business-keywords"
                />
              </div>
            </div>
            <div className="control">
              <button
                type="submit"
                disabled={pristine || invalid}
                className="button is-danger is-medium is-rounded"
              >
                Save
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

CreateWebpageForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
};

export default CreateWebpageForm;

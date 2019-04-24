import React from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';

import Tooltip from '../../atoms/Tooltip';
import { tooltipMessage } from '../../utils/messages';
import WebpageText from '../../atoms/WebpageText';

// @ts-check
/**
 * The CreateWebpageForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const CreateWebpageForm = ({
  onSubmit,
  validate,
  validationErrors,
  handleErrorReset,
}) => {
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
                <WebpageText
                  className="input is-medium"
                  name="title"
                  validate={validate}
                  dataTestId="business-name"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>

            <div className="field">
              <h5>
                Describe your business
                <Tooltip message={tooltipMessage.description} />
              </h5>
              <div className="control">
                <WebpageText
                  className="input is-medium"
                  name="description"
                  validate={validate}
                  dataTestId="description"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>

            <div className="field">
              <h5>
                Keywords
                <Tooltip message={tooltipMessage.keywords} />
              </h5>
              <div className="control">
                <WebpageText
                  className="input is-medium"
                  name="keywords"
                  validate={validate}
                  dataTestId="business-keywords"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>
            <div className="control">
              <button
                type="submit"
                disabled={pristine || invalid}
                className="button is-danger is-medium is-rounded"
                data-testid="create-webpage"
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
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
};

export default CreateWebpageForm;

/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

import WebpageText from '../../atoms/WebpageText';
import Tooltip from '../../atoms/Tooltip';
import { tooltipMessage } from '../../utils/messages';

// @ts-check
/**
 * The DetailsForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const DetailsForm = ({
  onSubmit,
  validate,
  validationErrors,
  handleErrorReset,
  detail,
  handleEditToggle,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={detail && detail}
      // eslint-disable-next-line react/jsx-no-bind
      render={({
        handleSubmit, form, pristine, submitting, invalid
      }) => {
        return (
          <form
            onSubmit={handleSubmit} >
            <div className="field">
              <h5>
                Title
                <Tooltip message={tooltipMessage.detailsTitle} />
              </h5>
              <div className="control">
                <WebpageText
                  className={`input ${handleEditToggle ? 'is-normal' : 'is-medium'}`}
                  name="title"
                  validate={validate}
                  dataTestId="detail-title"
                  placeholder="Eg. Our Vision"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>

            <div className="field">
              <h5>
                Description
                <Tooltip message={tooltipMessage.detailsDescription} />
              </h5>
              <div className="control">
                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <div>
                      <textarea {...input}
                        className="textarea is-normal"
                        rows={3}
                        placeholder={tooltipMessage.detailsDescription} />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="control buttons are-medium">
              <button
                type="submit"
                disabled={pristine || submitting || invalid}
                className="button is-light"
                data-testid="add-offering"
              >
                { handleEditToggle ? 'Save' : 'Add Content' }
              </button>
              <button
                type="button"
                onClick={handleEditToggle || form.reset}
                className="button"
                data-testid="add-detail"
              >
                { handleEditToggle ? 'Cancel' : 'Reset' }
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

DetailsForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  handleEditToggle: PropTypes.func,
  DetailsFormRef: PropTypes.object,
  detail: PropTypes.object,
};

export default DetailsForm;

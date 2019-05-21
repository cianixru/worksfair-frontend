/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';

import WebpageText from '../../atoms/WebpageText';

// @ts-check
/**
 * The OfferingsForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const OfferingsForm = ({
  onSubmit,
  validate,
  validationErrors,
  handleErrorReset,
  offeringsFormRef,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({
        handleSubmit, form, pristine, submitting, invalid
      }) => {
        return (
          <form onSubmit={handleSubmit} ref={offeringsFormRef} >
            <div className="field">
              <div className="control">
                <WebpageText
                  className="input is-medium"
                  name="title"
                  validate={validate}
                  dataTestId="offering-name"
                  placeholder="Name of item"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <WebpageText
                  className="input is-medium"
                  name="description"
                  validate={validate}
                  placeholder="Describe this item"
                  dataTestId="offering-description"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <WebpageText
                  className="input is-medium"
                  name="price"
                  validate={validate}
                  dataTestId="offering-price"
                  placeholder="Price"
                  validationErrors={validationErrors}
                  handleErrorReset={handleErrorReset}
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
                Add Item
              </button>
              <button
                type="button"
                onClick={form.reset}
                className="button"
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

OfferingsForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  offeringsFormRef: PropTypes.object,
};

export default OfferingsForm;

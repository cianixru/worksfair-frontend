/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Form, Field } from 'react-final-form';
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
  webpage,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={webpage}
      // eslint-disable-next-line react/jsx-no-bind
      render={({
        handleSubmit,
        pristine,
        invalid,
        submitSucceeded,
        submitting,
      }) => {
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
                  defaultValue={webpage && webpage.title}
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
                  defaultValue={webpage && webpage.description}
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
                  defaultValue={webpage && webpage.keywords}
                />
              </div>
            </div>
            <div className="field">
              <h5>
                Colour
                <Tooltip message={tooltipMessage.colour} />
              </h5>
              <div className="field">
                <div className="control">
                  <div className="select is-link">
                    <Field
                      name="colour"
                      component="select"
                    >
                      <option>Select Colour Theme</option>
                      <option value="is-danger">❤️ Red</option>
                      <option value="is-primary">💚 Green</option>
                      <option value="is-info">💙 Blue</option>
                      <option value="is-warning">🧡 Orange</option>
                      <option value="is-dark">🖤 Black</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            <div className="control">
              <button
                type="submit"
                disabled={pristine || invalid || submitSucceeded || submitting}
                className="button is-link is-medium is-rounded"
                data-testid="create-webpage"
              >
                Save & Continue
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
  webpage: PropTypes.object,
};

export default CreateWebpageForm;

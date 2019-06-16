/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

import Tooltip from '../atoms/Tooltip';
import { tooltipMessage } from '../utils/messages';
import WebpageText from '../atoms/WebpageText';

// @ts-check
/**
 * The CreateWebpageForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const EditProfileForm = ({
  onSubmit,
  validate,
  validationErrors,
  handleErrorReset,
  user,
  handleViewProfile,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={user}
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
            <div className="add-webpage-headline">
              <h3 className="is-size-4">
                <i className="fa fa-user-o" aria-hidden="true" />
                Bio
              </h3>
            </div>
            <div className="add-webpage-content">
              <div className="field">
                <h5>
                Email
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="email"
                    validate={validate}
                    dataTestId="email"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                Username
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="username"
                    validate={validate}
                    dataTestId="username"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                First Name
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="first_name"
                    validate={validate}
                    dataTestId="first-name"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Eg. Tony"
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                Last Name
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="last_name"
                    validate={validate}
                    dataTestId="last-name"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Eg. Elumelu"
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                Location
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="current_location"
                    validate={validate}
                    dataTestId="current_location"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Lagos, Nigeria"
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                  Headline
                  <Tooltip message={tooltipMessage.headline} />
                </h5>
                <div className="control">
                  <Field
                    name="headline"
                    // eslint-disable-next-line react/jsx-no-bind
                    render={({ input }) => (
                      <div>
                        <textarea {...input}
                          className="textarea is-medium"
                          rows={2}
                          placeholder={tooltipMessage.headlineExample} />
                        { validationErrors[input.name]
                            && validationErrors[input.name].map((error) => {
                              return (
                                <span className="input-error" key={error}>
                                  {toSentenceCase(error)}
                                </span>
                              );
                            })
                        }
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="add-webpage-headline">
              <h3 className="is-size-4">
                <i className="fa fa-globe" aria-hidden="true" />
                Social Media
              </h3>
            </div>
            <div className="add-webpage-content">
              <div className="field">
                <h5>
                  Facebook Link
                  <Tooltip message={tooltipMessage.facebook} />
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="facebook"
                    validate={validate}
                    dataTestId="facebook"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Eg. https://www.facebook.com/tony.elumelu"

                  />
                </div>
              </div>

              <div className="field">
                <h5>
                  Twitter Link
                  <Tooltip message={tooltipMessage.twitter} />
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="twitter"
                    validate={validate}
                    dataTestId="twitter"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Eg. https://www.twitter.com/segun.arinze"
                  />
                </div>
              </div>

              <div className="field">
                <h5>
                  Instagram Link
                  <Tooltip message={tooltipMessage.instagram} />
                </h5>
                <div className="control">
                  <WebpageText
                    className="input is-medium"
                    name="instagram"
                    validate={validate}
                    dataTestId="instagram"
                    validationErrors={validationErrors}
                    handleErrorReset={handleErrorReset}
                    placeholder="Eg. https://www.instagram.com/billy_jean"
                  />
                </div>
              </div>
            </div>

            <div className="control buttons">
              <button
                type="submit"
                disabled={pristine || invalid || submitSucceeded || submitting}
                className="button is-info is-medium is-rounded"
                data-testid="update-profile"
              >
                Save
              </button>
              <button
                className="button is-info is-medium is-rounded is-outlined"
                data-testid="view profile"
                onClick={handleViewProfile}
              >
                View Profile
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

EditProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  user: PropTypes.object,
};

export default EditProfileForm;

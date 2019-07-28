import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { toSentenceCase } from '../../components/utils/helpers';

// @ts-check
/**
 * The SigninForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const PasswordForm = ({ onSubmit, validate,  validationErrors, }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            
            <div className="field">
                <label>Password</label>
                <div className="control has-icons-left">
                <Field
                    name="password"
                    type="password"
                    component="input"
                    placeholder="Password"
                    validate={validate}
                    className="input is-medium"
                    data-testid="update-password"
                    required
                />
                <span className="icon is-medium is-left">
                    <i className="fa fa-lock" />
                </span>
                </div>
                { validationErrors.password
                && validationErrors.password.map((error) => {
                    return (
                    <span className="input-error" key={error}>
                        {toSentenceCase(error)}
                    </span>
                    );
                })
                }
            </div>

          <div className="field">
            <label>Repeat Password</label>
            <div className="control has-icons-left">
              <Field
                name="confirm_password"
                type="password"
                component="input"
                placeholder="Confirm Password"
                validate={validate}
                className="input is-medium"
                data-testid="confirm-password"
                required
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-lock" />
              </span>
            </div>
            { validationErrors.confirm_password
              && validationErrors.confirm_password.map((error) => {
                return (
                  <span className="input-error" key={error}>
                    {toSentenceCase(error)}
                  </span>
                );
              })
            }
          </div>
            <div className="control">
              <button
                type="submit"
                disabled={pristine || invalid}
                className="button is-link is-medium is-rounded"
              >
                Submit
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

PasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
};

export default PasswordForm;

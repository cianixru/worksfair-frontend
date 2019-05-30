import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toSentenceCase } from '../../components/utils/helpers';

// @ts-check
/**
 * The SignupForm componenent
 * @param {object} props
 * @returns {JSX} the signup form
 */
const SignupForm = ({ onSubmit, validate, validationErrors }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} >
          <Fragment>
            <div className="field">
              <label>First Name</label>
              <div className="control has-icons-left">
                <Field
                  className="input is-medium"
                  name="first_name"
                  component="input"
                  placeholder="First Name"
                  validate={validate}
                  data-testid="firstName"
                  required
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-user-o" />
                </span>
              </div>
              { validationErrors.first_name
                && validationErrors.first_name.map((error) => {
                  return (
                    <span className="input-error" key={error}>
                      {toSentenceCase(error)}
                    </span>
                  );
                })
              }
            </div>
          </Fragment>
          <Fragment>
            <div className="field">
              <label>Last Name</label>
              <div className="control has-icons-left">
                <Field
                  name="last_name"
                  component="input"
                  placeholder="Last Name (Surname)"
                  validate={validate}
                  className="input is-medium"
                  data-testid="lastName"
                  required
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-user-o" />
                </span>
              </div>
            </div>
            { validationErrors.last_name
              && validationErrors.last_name.map((error) => {
                return (
                  <span className="input-error" key={error}>
                    {toSentenceCase(error)}
                  </span>
                );
              })
            }
          </Fragment>

          <Fragment>
            <div className="field">
              <label>Username</label>
              <div className="control has-icons-left">
                <Field
                  name="username"
                  component="input"
                  placeholder="Username"
                  validate={validate}
                  className="input is-medium"
                  data-testid="username"
                  required
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-user-o" />
                </span>
              </div>
            </div>
            { validationErrors.last_name
              && validationErrors.last_name.map((error) => {
                return (
                  <span className="input-error" key={error}>
                    {toSentenceCase(error)}
                  </span>
                );
              })
            }
          </Fragment>

          <Fragment>
            <div className="field">
              <label>Email</label>
              <div className="control has-icons-left">
                <Field
                  name="email"
                  type="email"
                  component="input"
                  placeholder="Email"
                  validate={validate}
                  className="input is-medium"
                  data-testid="email"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope-o" />
                </span>
              </div>
            </div>
            { validationErrors.email
              && validationErrors.email.map((error) => {
                return (
                  <span className="input-error" key={error}>
                    {toSentenceCase(error)}
                  </span>
                );
              })
            }
          </Fragment>

          <Fragment>
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
                  data-testid="password"
                  required
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-lock" />
                </span>
              </div>
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
          </Fragment>

          <Fragment>
            <div className="field">
              <label>Repeat Password</label>
              <div className="control has-icons-left">
                <Field
                  name="confirm_password"
                  type="password"
                  component="input"
                  placeholder="Repeat Password"
                  validate={validate}
                  className="input is-medium"
                  data-testid="confirmPassword"
                  required
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-lock" />
                </span>
              </div>
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
          </Fragment>
          <div className="field">
            Already signed up? <Link to="/login">Log in</Link>
          </div>
          <div className="control">
            <button
              type="submit"
              disabled={pristine || invalid}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={invalid ? () => { } : handleSubmit}
              className="button is-danger is-medium is-rounded"
            >
              Signup
            </button>
          </div>
        </form>
      )}
    />

  );
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
};

export default SignupForm;

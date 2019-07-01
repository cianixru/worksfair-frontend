import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toSentenceCase } from '../../components/utils/helpers';
import AuthText from '../../atoms/AuthText';

// @ts-check
/**
 * The SignupForm componenent
 * @param {object} props
 * @returns {JSX} the signup form
 */
const SignupForm = ({
  onSubmit,
  validate,
  validationErrors,
  handleErrorReset
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} >
          <div className="field">
            <label>First Name</label>
            <AuthText
              className="input is-medium"
              name="first_name"
              component="input"
              placeholder="First Name"
              validate={validate}
              dataTestId="firstName"
              required
              icon="fa fa-user-o"
              validationErrors={validationErrors}
              handleErrorReset={handleErrorReset}
            />
          </div>

          <div className="field">
            <label>Last Name</label>
            <AuthText
              name="last_name"
              component="input"
              placeholder="Last Name (Surname)"
              validate={validate}
              className="input is-medium"
              dataTestId="lastName"
              required
              icon="fa fa-user-o"
              validationErrors={validationErrors}
              handleErrorReset={handleErrorReset}
            />
          </div>
          
          <div className="field">
            <label>Username</label>
            <AuthText
              name="username"
              component="input"
              placeholder="Username"
              validate={validate}
              className="input is-medium"
              dataTestId="username"
              required
              icon="fa fa-user-o"
              validationErrors={validationErrors}
              handleErrorReset={handleErrorReset}
            />
          </div>
          
          <div className="field">
            <label>Email</label>
            <AuthText
              name="email"
              type="email"
              component="input"
              placeholder="Email"
              validate={validate}
              className="input is-medium"
              dataTestId="email"
              required
              icon="fa fa-envelope-o"
              validationErrors={validationErrors}
              handleErrorReset={handleErrorReset}
            />
          </div>

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
            Already signed up? <Link to="/login">Log in</Link>
          </div>
          <div className="control">
            <button
              type="submit"
              disabled={pristine || invalid}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={invalid ? () => { } : handleSubmit}
              className="button is-link is-medium is-rounded"
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

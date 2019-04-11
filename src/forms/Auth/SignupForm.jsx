import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// @ts-check
/**
 * The SignupForm componenent
 * @param {object} props
 * @returns {JSX} the signup form
 */
const SignupForm = ({ onSubmit, validate, }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} >
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
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-user-o" />
              </span>
            </div>
          </div>

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
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-user-o" />
              </span>
            </div>
          </div>

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
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope-o" />
              </span>
            </div>
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
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-lock" />
              </span>
            </div>
          </div>

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
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-lock" />
              </span>
            </div>
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
};

export default SignupForm;

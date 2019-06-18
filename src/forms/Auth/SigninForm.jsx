import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// @ts-check
/**
 * The SigninForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const SigninForm = ({ onSubmit, validate, }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <div className="control has-icons-left">
                <Field
                  className="input is-medium"
                  name="email"
                  type="email"
                  component="input"
                  placeholder="Email"
                  validate={validate}
                  data-testid="signin-email"
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-envelope-o" />
                </span>
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="control has-icons-left">
                <Field
                  className="input is-medium"
                  name="password"
                  type="password"
                  component="input"
                  placeholder="Password"
                  validate={validate}
                  data-testid="signin-password"
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-lock" />
                </span>
              </div>
            </div>
            <div className="field">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            <div className="control">
              <button
                type="submit"
                disabled={pristine || invalid}
                className="button is-link is-medium is-rounded"
              >
                Login
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

SigninForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
};

export default SigninForm;

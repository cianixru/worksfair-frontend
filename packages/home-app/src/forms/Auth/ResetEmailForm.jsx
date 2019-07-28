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
const ResetEmailForm = ({ onSubmit, validate, }) => {
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
                  data-testid="update-password-email"
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-envelope-o" />
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
                Send
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

ResetEmailForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
};

export default ResetEmailForm;

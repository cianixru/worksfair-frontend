/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

// @ts-check
/**
 * The SearchForm componenent
 * @param {object} props
 * @returns {JSX}
 */
const SearchForm = ({
  onSubmit,
  validate,
  data
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={data}
      // eslint-disable-next-line react/jsx-no-bind
      render={({
        handleSubmit,
        pristine,
        invalid,
        submitting,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="main-search-input">

              <div className="main-search-input-item">
                <Field
                  name="keywords"
                  type="text"
                  className="input"
                  component="input"
                  placeholder="What do you need?"
                />
              </div>

              <div className="main-search-input-item location">
                <Field
                  name="location"
                  type="text"
                  component="input"
                  className="input"
                  placeholder="Which city or town?"
                />
                {/* <a href="/"><i className="fa fa-dot-circle-o" /></a> */}
              </div>

              <button
                className="button is-info is-rounded"
                disabled={pristine || invalid || submitting}>
                Search
              </button>

            </div>
          </form>
        );
      }}
    />
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  webpage: PropTypes.object,
  data: PropTypes.object,
};

export default SearchForm;

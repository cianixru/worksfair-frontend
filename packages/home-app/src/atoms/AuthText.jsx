import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import { toSentenceCase } from '../components/utils/helpers';

const AuthText = ({
  className,
  name,
  validationErrors,
  handleErrorReset,
  dataTestId,
  validate,
  placeholder,
  disabled,
  icon,
}) => {
  const errorReset = () => handleErrorReset(name);
  return (
    <Fragment>
      <div className="control has-icons-left">
        <Field
          className={className}
          type="text"
          validate={validate}
          data-testid={dataTestId}
          component="input"
          name={name}
          placeholder={placeholder}
          // eslint-disable-next-line react/jsx-no-bind
          onFocus={errorReset}
          disabled={disabled}
        />
        <span className="icon is-medium is-left">
          <i className={icon} />
        </span>
      </div>
      { validationErrors[name]
        && validationErrors[name].map((error) => {
          return (
            <span className="input-error" key={error}>
              {toSentenceCase(error)}
            </span>
          );
        })
      }
    </Fragment>
  );
};

AuthText.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  validationErrors: PropTypes.object,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  handleErrorReset: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  validate: PropTypes.any,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
};

export default AuthText;

import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import { toSentenceCase } from '../components/utils/helpers';

const WebpageText = ({
  className,
  name,
  validationErrors,
  handleErrorReset,
  dataTestId,
  validate,
  placeholder,
}) => {
  const errorReset = () => handleErrorReset(name);
  return (
    <Fragment>
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
      />
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

WebpageText.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  validationErrors: PropTypes.object,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  handleErrorReset: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  validate: PropTypes.any,
  placeholder: PropTypes.string,
};

export default WebpageText;

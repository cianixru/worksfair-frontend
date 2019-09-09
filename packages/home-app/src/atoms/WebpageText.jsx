import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { makeWebsiteLink } from '../utils/helpers';

import { toSentenceCase } from '../components/utils/helpers';

const WebpageText = ({
  className,
  name,
  validationErrors,
  handleErrorReset,
  dataTestId,
  validate,
  placeholder,
  info,
  disabled
}) => {
  const errorReset = () => handleErrorReset(name);

  return (
    <Fragment>
      {/* <Field
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
      /> */}
      <Field
        validate={validate}
        name={name}>
        {({ input, meta }) => {
          return (<div>
            <input
              type="text"
              className={className}
              {...input}
              placeholder={placeholder}
              data-testid={dataTestId}
              onFocus={errorReset}
              disabled={disabled}
            />
            {meta.touched && meta.error && <span>{meta.error}</span>}
            {input.name === 'title' && window.location.pathname.includes('new')
              && <span>Your website URL will be
                <span className="has-text-info"> {makeWebsiteLink(input.value)}</span>
              </span>}
          </div>);
        }}
      </Field>
      { validationErrors[name]
        && validationErrors[name].map((error) => {
          return (
            <span className="input-error" key={error}>
              {toSentenceCase(error)}
            </span>
          );
        })
      }
      <ul>
        { info
          && info.map((item) => {
            return (
              <li className="input-info" key={item}>
                {item}
              </li>
            );
          })
        }
      </ul>
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
  disabled: PropTypes.bool,
  info: PropTypes.array,
};

export default WebpageText;

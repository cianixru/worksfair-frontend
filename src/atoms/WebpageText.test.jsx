import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Form } from 'react-final-form';

import WebpageText from './WebpageText';

afterEach(cleanup);

describe('WebpageText.jsx', () => {
  const validationErrors = {
    title: [
      'Title must be present',
    ]
  };
  const handleErrorReset = jest.fn();
  const onSubmit = jest.fn();
  test('Should display the WebpageText Component', () => {
    const component = render(
      <Form
        onSubmit={onSubmit}
      >
        <WebpageText
          className="input is-medium"
          name="title"
          dataTestId="business-name"
          validationErrors={validationErrors}
          handleErrorReset={handleErrorReset}
        />
      </Form>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

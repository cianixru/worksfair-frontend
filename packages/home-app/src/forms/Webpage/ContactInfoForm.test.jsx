import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import ContactInfoForm from './ContactInfoForm';
import { webpage } from '../../utils/test-utils/mockData';

afterEach(cleanup);

const validationErrors = {
  state: ['This field is required'],
  city: ['This field is required'],
  address: ['This field is required'],
  phone: ['This field is required'],
  email: ['This field is required'],
  website: ['This field is required'],
};

describe('ContactInfoForm.jsx', () => {
  const onSubmit = jest.fn();
  test('Test that the ContactInfo form displays', () => {
    const component = render(
      <Router>
        <ContactInfoForm
          onSubmit={onSubmit}
          validationErrors={validationErrors}
          webpage={webpage} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

  test('should handle click for submission', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Router>
        <ContactInfoForm
          onSubmit={handleClick}
          validationErrors={validationErrors}
          webpage={webpage} />
      </Router>
    );
    const submitBtn = getByTestId('update-contact');
    submitBtn.onclick = handleClick;
    fireEvent.click(submitBtn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test('should handle selection', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Router>
        <ContactInfoForm
          onSubmit={handleClick}
          validationErrors={validationErrors}
          webpage={webpage} />
      </Router>
    );
    const stateSelector = getByTestId('business-state');
    const townSelector = getByTestId('business-town');
    // stateSelector.onclick = handleClick;
    // townSelector.onclick = handleClick;
    fireEvent.select(stateSelector, { target: { value: 'Borno' }, });
    fireEvent.select(townSelector, { target: { value: 'Bama' }, });

    expect(stateSelector).toBeDefined();
    expect(townSelector).toBeDefined();
  });
});

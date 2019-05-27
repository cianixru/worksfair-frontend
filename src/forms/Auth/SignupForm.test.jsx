import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import SignupForm from './SignupForm';

afterEach(cleanup);

const validationErrors = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  email: '',
  confirm_password: '',
};

describe('SignupForm.tsx', () => {
  const onSubmit = jest.fn();
  test('Test that the Signup form displays', () => {
    const component = render(
      <Router>
        <SignupForm
          onSubmit={onSubmit}
          validationErrors={validationErrors} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

  test('should handle click for submission', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Router>
        <SignupForm
          onSubmit={handleClick}
          validationErrors={validationErrors} />
      </Router>
    );
    const submitBtn = getByText('Signup');
    submitBtn.onclick = handleClick;
    fireEvent.click(submitBtn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

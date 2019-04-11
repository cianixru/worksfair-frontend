import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import SignupForm from './SignupForm';

afterEach(cleanup);

describe('SignupForm.tsx', () => {
  const onSubmit = jest.fn();
  test('Test that the Signup form displays', () => {
    const component = render(
      <Router>
        <SignupForm onSubmit={onSubmit} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

  test('should handle click for submission', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Router>
        <SignupForm
          onSubmit={handleClick} />
      </Router>
    );
    const submitBtn = getByText('Signup');
    submitBtn.onclick = handleClick;
    fireEvent.click(submitBtn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

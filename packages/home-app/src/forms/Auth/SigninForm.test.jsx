
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import SigninForm from './SigninForm';

afterEach(cleanup);

describe('SigninForm.jsx', () => {
  const onSubmit = jest.fn();
  test('Test that the Signin form displays', () => {
    const component = render(
      <Router>
        <SigninForm onSubmit={onSubmit} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

  test('should handle click for submission', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Router>
        <SigninForm
          onSubmit={handleClick} />
      </Router>
    );
    const submitBtn = getByText('Login');
    submitBtn.onclick = handleClick;
    fireEvent.click(submitBtn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

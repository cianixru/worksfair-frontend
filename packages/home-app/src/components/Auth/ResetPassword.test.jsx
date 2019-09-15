import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ResetPassword from './ResetPassword';

afterEach(cleanup);

const actions = {
  setAuthenticatedUser: jest.fn(),
  isLoading: jest.fn(),
};
const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({ auth: { currentUser: {} } });

describe('ResetPassword.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword actions={actions} />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  test('should send reset email a user', () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword actions={actions} />
        </Router>
      </Provider>
    );

    const email = getByTestId('update-password-email');
    const sendButton = getByText('Send');

    fireEvent.change(email, { target: { value: 'theo.io@hannon.com' } });
    expect(email.value).toEqual('theo.io@hannon.com');

    fireEvent.click(sendButton);
  });


  test('should change password a user', () => {
    localStorage.setItem('token', 'nshjhfasvdb WASVDW SDQWJVA');
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword actions={actions} />
        </Router>
      </Provider>
    );

    const password = getByTestId('update-password');
    const confirmPassword = getByTestId('confirm-password');
    const submitButton = getByText('Submit');

    fireEvent.change(confirmPassword, { target: { value: 'password1$' } });
    expect(confirmPassword.value).toEqual('password1$');

    fireEvent.change(password, { target: { value: 'password1$' } });
    expect(password.value).toEqual('password1$');

    fireEvent.click(submitButton);
  });

  test.skip('should map dispatch to prop correctly', () => {
    const dispatch = () => { };
    const componentState = mapDispatchToProps(dispatch);
    expect(componentState.actions.signin).toBeDefined();
  });
});

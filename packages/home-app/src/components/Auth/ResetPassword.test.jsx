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

  test('should login a user', () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword actions={actions} />
        </Router>
      </Provider>
    );

    const email = getByTestId('update-password-email');

    fireEvent.change(email, { target: { value: 'theo.io@hannon.com' } });
    expect(email.value).toEqual('theo.io@hannon.com');
  });


  test('should login a user', () => {
    localStorage.setItem('token', 'nshjhfasvdb WASVDW SDQWJVA');
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword actions={actions} />
        </Router>
      </Provider>
    );

    const password = getByTestId('update-password');
    const confirm_password = getByTestId('confirm-password');

    fireEvent.change(confirm_password, { target: { value: 'password1$' } });
    expect(confirm_password.value).toEqual('password1$');

    fireEvent.change(password, { target: { value: 'password1$' } });
    expect(password.value).toEqual('password1$');
  });

  test.skip('should map dispatch to prop correctly', () => {
    const dispatch = () => { };
    const componentState = mapDispatchToProps(dispatch);
    expect(componentState.actions.signin).toBeDefined();
  });
});

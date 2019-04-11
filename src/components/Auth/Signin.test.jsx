import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Signin from './Signin';

afterEach(cleanup);

const actions = {
  Signin: jest.fn(),
};
const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({});

describe('Signin.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Signin actions={actions} />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  test('should register a user', () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <Signin actions={actions} />
        </Router>
      </Provider>
    );

    const email = getByTestId('signin-email');
    const password = getByTestId('signin-password');

    fireEvent.change(email, { target: { value: 'theo.okafor@worksfair.com' } });
    expect(email.value).toEqual('theo.okafor@worksfair.com');

    fireEvent.change(password, { target: { value: 'password1$' } });
    expect(password.value).toEqual('password1$');

    const submitBtn = getByText('Login');
    fireEvent.click(submitBtn);
    // expect(Signin).toHaveBeenCalledTimes(1);
  });

  test.skip('should map dispatch to prop correctly', () => {
    const dispatch = () => { };
    const componentState = mapDispatchToProps(dispatch);
    expect(componentState.actions.signin).toBeDefined();
  });
});

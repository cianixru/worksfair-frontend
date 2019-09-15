import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Signup from './Signup';

afterEach(cleanup);

const actions = {
  signup: jest.fn(),
};
const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({ auth: { currentUser: {} } });

describe('Signup.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Signup actions={actions} />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  test('should register a user', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <Signup actions={actions} />
        </Router>
      </Provider>
    );

    const firstName = getByTestId('firstName');
    const lastName = getByTestId('lastName');
    const email = getByTestId('email');
    const password = getByTestId('password');

    fireEvent.change(firstName, { target: { value: 'Theo' } });
    expect(firstName.value).toEqual('Theo');

    fireEvent.change(lastName, { target: { value: 'Okafor' } });
    expect(lastName.value).toEqual('Okafor');

    fireEvent.change(email, { target: { value: 'theo.okafor@worksfair.com' } });
    expect(email.value).toEqual('theo.okafor@worksfair.com');

    fireEvent.focus(email);
    expect(email.value).toEqual('theo.okafor@worksfair.com');

    fireEvent.change(password, { target: { value: 'password1$' } });
    expect(password.value).toEqual('password1$');

    const submitBtn = getByText('Signup');
    await fireEvent.click(submitBtn);
  });

  test.skip('should map dispatch to prop correctly', () => {
    const dispatch = () => { };
    const componentState = mapDispatchToProps(dispatch);
    expect(componentState.actions.signup).toBeDefined();
  });
});

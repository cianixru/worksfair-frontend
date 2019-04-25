import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Logout from './Logout';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({});

describe('Logout.jsx', () => {
  const actions = {
    logout: jest.fn(),
  };
  test.skip('should call the logout action', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Logout actions={actions} />
        </Router>
      </Provider>
    );
    expect(actions.logout).toBeCalled();
  });
  test('should redirect to the Login page', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Logout actions={actions} />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import EmailConfirmation from './EmailConfirmation';
import { user } from '../../utils/test-utils/mockData';

afterEach(cleanup);

const actions = {
  EmailConfirmation: jest.fn(),
};
const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({ auth: { currentUser: { user } } });

describe('EmailConfirmation.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <EmailConfirmation previousLocation="login" />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

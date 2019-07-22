import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import { user } from '../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} },
  publicData: { user }
});

describe('ProfilePage.jsx', () => {
  test('Should display the ProfilePage Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <ProfilePage />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ListWebpages from './ListWebpages';
import { user, webpage } from '../../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: { user, } },
  webpage: { newWebpage: webpage }
});

describe('ListWebpages.jsx', () => {
  test('Should display the ListWebpages Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <ListWebpages user={user} />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

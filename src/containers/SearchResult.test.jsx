import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import SearchResult from './SearchResult';
import { webpage } from '../actions/webpage.test';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);

describe('SearchResult.jsx', () => {
  test('Should display the SearchResult with no results', () => {
    const mockStore = store({
      auth: { currentUser: {} },
      publicData: { webpages: [] }
    });

    const component = render(
      <Provider store={mockStore}>
        <Router>
          <SearchResult />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
  test('Should display the SearchResult Component with results', () => {
    const mockStore = store({
      auth: { currentUser: {} },
      publicData: { webpages: [webpage] }
    });

    const component = render(
      <Provider store={mockStore}>
        <Router>
          <SearchResult />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ServerError from './ServerError';
import NotFound from './NotFound';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});
describe('NotFound.jsx', () => {
    test('Should display the NotFound Component', () => {
        const component = render(
        <Provider store={mockStore}>
            <Router>
              <NotFound />
            </Router>
        </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

describe('ServerError.jsx', () => {
  test('Should display the ServerError Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <ServerError />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

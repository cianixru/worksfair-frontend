import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Description from './Description';
import Terms from './Terms';
import Privacy from './Privacy';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});
describe('Description.jsx', () => {
    test('Should display the Description Component', () => {
        const component = render(
        <Provider store={mockStore}>
            <Router>
              <Description />
            </Router>
        </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

describe('Terms.jsx', () => {
  test('Should display the Terms Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Terms />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

describe('Privacy.jsx', () => {
    test('Should display the Privacy Component', () => {
        const component = render(
        <Provider store={mockStore}>
            <Router>
            <Privacy />
            </Router>
        </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Webpage from './Webpage';
import { webpage } from '../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { webpage, },
  loader: { isLoading: false, },
});

describe('Webpage.jsx', () => {
  const props = {
    match: {
      params: { subDomainName: 'name' },
    },
    getWebpage: jest.fn(),
  };

  test('Should display the Webpage Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Webpage {...props} />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component.getByText('Happiness')).toBeDefined();
    expect(component.getByText('Welcome to Happiness')).toBeDefined();
    expect(component.getByText('Webpage Creator')).toBeDefined();
    expect(component.getByText('Our Services/Products')).toBeDefined();
  });
});

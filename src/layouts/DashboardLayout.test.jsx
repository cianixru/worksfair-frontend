import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import CreateWebpage from '../containers/CreateWebpage';
import DashboardLayout from './DashboardLayout';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {}, },
  webpage: { newWebpage: {}, },
});

const Component = component => component;

describe('CreateWebpage.jsx', () => {
  test('Should display the CreateWebpage Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <DashboardLayout Component={Component(CreateWebpage)} />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

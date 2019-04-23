import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import SideNav from './SideNav';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({});

describe('DashboardHeader.jsx', () => {
  const links = {
    main: [
      {
        text: 'Dashboard',
        to: '/dashboard/theo',
      },
      {
        text: 'Create Webpage',
        to: '/dashboard/theo/webpage/new',
      },
    ],
    webpage: [
      {
        text: 'Create Webpage',
        to: '/dashboard/theo/webpage/new',
      },
    ],
    settings: [
      {
        text: 'Create Webpage',
        to: '/dashboard/theo/webpage/new',
      },
    ],
  };
  test('Should display the SideNave Component with links', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <SideNav
            links={links}
          />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

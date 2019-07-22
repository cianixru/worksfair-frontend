import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import DashboardHeader from './DashboardHeader';
import { user } from '../../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {user} },
  webpage: { newWebpage: {} }
});

describe('DashboardHeader.jsx', () => {
  test('Should display the DashboardHeader Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <DashboardHeader />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  const navigation = [
    {
      text: 'Dashboard',
      to: '/dashboard/theo',
    },
    {
      text: 'Create Webpage',
      to: '/dashboard/theo/webpage/new',
    },
  ];
  test('Should display the DashboardHeader Component with links', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <DashboardHeader
            title="The Dashboard"
            navigation={navigation}
          >
            <p>This is a dashboard</p>
          </DashboardHeader>
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

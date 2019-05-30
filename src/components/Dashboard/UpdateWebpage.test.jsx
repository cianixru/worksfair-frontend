import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import UpdateWebpage from './UpdateWebpage';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('UpdateWebpage.jsx', () => {
  // const validationErrors = {
  //   title: [
  //     'Title must be present',
  //   ]
  // };

  test('Should display the UpdateWebpage Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <UpdateWebpage />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import OfferingItem from './OfferingItem';
import { offerings } from '../../utils/helpers';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('OfferingItem.jsx', () => {
  const onSubmit = jest.fn();
  const user = {};
  const validationErrors = {};
  const handleErrorReset = jest.fn();

  test('that component renders correctly', async () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <OfferingItem
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            offerings={offerings}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});

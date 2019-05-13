import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import BasicInfo from './BasicInfo';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('BasicInfo.jsx', () => {
  test('should submit the create webpage form data', () => {
    const onSubmit = jest.fn();
    const user = {};
    const validationErrors = {};
    const handleErrorReset = jest.fn();

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <BasicInfo
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
          />
        </Router>
      </Provider>
    );

    const createBtn = getByTestId('create-webpage');
    createBtn.onclick = onSubmit;
    fireEvent.click(createBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

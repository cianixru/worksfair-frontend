import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import { user } from '../../../utils/test-utils/mockData';
import DetailItem from './DetailItem';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('Details.jsx', () => {
  const onSubmit = jest.fn();
  const handleDelete = jest.fn();
  const validationErrors = {};
  const handleErrorReset = jest.fn();
  const { details } = user.webpages[0];

  test('should should display form correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <DetailItem
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleDelete={handleDelete}
            details={details}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  test('should submit the create Detail form data', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <DetailItem
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleDelete={handleDelete}
            details={details}
          />
        </Router>
      </Provider>
    );

    const deleteConfirmBtn = getByTestId('delete-confirm');
    deleteConfirmBtn.onclick = handleDelete;
    fireEvent.click(deleteConfirmBtn);
    expect(handleDelete).toHaveBeenCalledTimes(2);
  });
});

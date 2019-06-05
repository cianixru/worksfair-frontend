import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Details from './Details';
import { user } from '../../../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('Details.jsx', () => {
  const onSubmit = jest.fn();
  const validationErrors = {};
  const handleErrorReset = jest.fn();
  const { details } = user.webpages[0];

  test('should should display form correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Details
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
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
          <Details
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            details={details}
          />
        </Router>
      </Provider>
    );

    const saveDetailBtn = getByTestId('add-detail');
    saveDetailBtn.onclick = onSubmit;
    fireEvent.click(saveDetailBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const titleBox = getByTestId('detail-title');
    titleBox.onchange = handleErrorReset;
    fireEvent.change(titleBox);
    expect(handleErrorReset).toHaveBeenCalledTimes(1);
  });
});

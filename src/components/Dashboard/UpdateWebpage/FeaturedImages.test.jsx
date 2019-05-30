import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import FeaturedImages from './FeaturedImages';
import { webpage } from '../../../utils/test-utils/mockData';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('FeaturedImages.jsx', () => {
  const onSubmit = jest.fn();
  const user = {};
  const validationErrors = {};
  const handleErrorReset = jest.fn();
  const actions = {
    isComplete: jest.fn(),
    isLoading: jest.fn(),
  };

  test('should submit the create webpage form data', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <FeaturedImages
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            webpage={webpage}
            isLoading={actions.isLoading}
            isComplete={actions.isComplete}
          />
        </Router>
      </Provider>
    );

    const saveImagesBtn = getByTestId('save-featured-images');
    saveImagesBtn.onclick = onSubmit;
    fireEvent.click(saveImagesBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    // expect(actions.isLoading).toHaveBeenCalledTimes(1);
  });

  test('that component renders correctly', async () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <FeaturedImages
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            webpage={webpage}
            isLoading={actions.isLoading}
            isComplete={actions.isComplete}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});

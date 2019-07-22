import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ImageUploader from './ImageUploader';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('ImageUploader.jsx', () => {
  const onSubmit = jest.fn();
  const user = {};
  const validationErrors = {};
  const handleErrorReset = jest.fn();
  test('should submit the create webpage form data', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ImageUploader
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
          />
        </Router>
      </Provider>
    );

    const saveImagesBtn = getByTestId('save-featured-images');
    saveImagesBtn.onclick = onSubmit;
    fireEvent.click(saveImagesBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('that component renders correctly', async () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <ImageUploader
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});

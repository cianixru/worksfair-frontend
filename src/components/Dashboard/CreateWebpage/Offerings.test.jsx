import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import Offerings from './Offerings';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('Offerings.jsx', () => {
  const onSubmit = jest.fn();
  const user = {};
  const validationErrors = {};
  const handleErrorReset = jest.fn();
  const handleOfferingImageSelection = jest.fn();
  const offerings = [];
  const selectedImage = 'dahehjsdsa.ocm';
  const handleSaveAndPreview = jest.fn();

  test('should should display form correctly', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <Offerings
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleOfferingImageSelection={handleOfferingImageSelection}
            offerings={offerings}
            selectedImage={selectedImage}
            handleSaveAndPreview={handleSaveAndPreview}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  test('should submit the create offering form data', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <Offerings
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            handleOfferingImageSelection={handleOfferingImageSelection}
            offerings={offerings}
            selectedImage={selectedImage}
            handleSaveAndPreview={handleSaveAndPreview}
          />
        </Router>
      </Provider>
    );

    const saveOfferingBtn = getByTestId('add-offering');
    saveOfferingBtn.onclick = onSubmit;
    fireEvent.click(saveOfferingBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

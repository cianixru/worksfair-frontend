import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import ContactInfo from './ContactInfo';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('ContactInfo.jsx', () => {
  test('should submit the create webpage form data', () => {
    const onSubmit = jest.fn();
    const user = {};
    const validationErrors = {};
    const handleErrorReset = jest.fn();

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <ContactInfo
            onSubmit={onSubmit}
            user={user}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
          />
        </Router>
      </Provider>
    );

    const updateBtn = getByTestId('update-contact');
    updateBtn.onclick = onSubmit;
    fireEvent.click(updateBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

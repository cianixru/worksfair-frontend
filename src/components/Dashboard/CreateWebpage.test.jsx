import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import CreateWebpage from './CreateWebpage';

afterEach(cleanup);

const middlewares = [thunk];
const store = configureMockStore(middlewares);
const mockStore = store({
  auth: { currentUser: {} },
  webpage: { newWebpage: {} }
});

describe('CreateWebpage.jsx', () => {
  // const validationErrors = {
  //   title: [
  //     'Title must be present',
  //   ]
  // };

  test('Should display the CreateWebpage Component', () => {
    const component = render(
      <Provider store={mockStore}>
        <Router>
          <CreateWebpage />
        </Router>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  test('should submit the create webpage form data', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Router>
          <CreateWebpage />
        </Router>
      </Provider>
    );

    const createBtn = getByTestId('create-webpage');
    createBtn.onclick = onSubmit;
    fireEvent.click(createBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

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

  test('invoke onDragEnter when dragenter event occurs', async () => {
    const file = new File([
      JSON.stringify({ ping: true })
    ], 'ping.json', { type: 'application/json' });
    const onDragEnter = jest.fn();

    const flushPromises = (ui, container) => {
      return new Promise(resolve => setImmediate(() => {
        render(ui, { container });
        resolve(container);
      }));
    };

    const dispatchEvt = (node, type, data) => {
      const event = new Event(type, { bubbles: true });
      Object.assign(event, data);
      fireEvent(node, event);
    };

    const mockData = (files) => {
      return {
        dataTransfer: {
          files,
          items: files.map(elem => ({
            kind: 'file',
            type: elem.type,
            getAsFile: () => elem
          })),
          types: ['Files']
        }
      };
    };

    const data = mockData([file]);

    const ui = (
      <ImageUploader
        onSubmit={onSubmit}
        user={user}
        validationErrors={validationErrors}
        handleErrorReset={handleErrorReset}
        onDragEnter={onDragEnter}
      />
    );
    const { container } = render(ui);
    const dropzone = container.querySelector('div');

    dispatchEvt(dropzone, 'dragenter', data);
    await flushPromises(ui, container);
  });
});

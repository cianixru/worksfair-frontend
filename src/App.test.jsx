import React from 'react';
import App from './App';
import { render } from 'react-testing-library';

test('Test that the Footer displays', () => {
  const component = render(
    <App />
  );
  expect(component).toMatchSnapshot();
});

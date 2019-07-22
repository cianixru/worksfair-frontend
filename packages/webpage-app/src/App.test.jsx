import React from 'react';
import { render } from 'react-testing-library';

import App from './App';

test('Test that the Footer displays', () => {
  const component = render(
    <App />
  );
  expect(component).toMatchSnapshot();
});

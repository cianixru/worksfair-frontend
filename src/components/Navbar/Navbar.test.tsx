import React from 'react';
import { render } from 'react-testing-library';
import Navbar from './Navbar';

test('Test that the Footer displays', () => {
  const component = render(
    <Navbar />
  );
  expect(component).toMatchSnapshot();
});
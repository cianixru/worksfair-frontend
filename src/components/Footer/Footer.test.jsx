import React from 'react';
import { render } from 'react-testing-library';
import Footer from './Footer';

test('Test that the Footer displays', () => {
  const component = render(
    <Footer />
  );
  expect(component).toMatchSnapshot();
});

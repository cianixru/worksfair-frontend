import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';

test('Test that the Navbar displays', () => {
  const component = render(
    <Router>
      <Navbar />
    </Router>
  );
  expect(component).toMatchSnapshot();
});

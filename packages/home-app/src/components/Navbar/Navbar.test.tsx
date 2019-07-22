import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import { user } from '../../utils/test-utils/mockData';

test('Test that the Navbar displays', () => {
  const component = render(
    <Router>
      <Navbar />
    </Router>
  );
  expect(component).toMatchSnapshot();
});

test('Test that the Navbar displays with userNav', () => {
  const component = render(
    <Router>
      <Navbar user={user} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});

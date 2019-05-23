import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import NoWebpages from './NoWebpages';

afterEach(cleanup);

describe('NoWebpages.jsx', () => {
  test('Should display the NoWebpages Component', () => {
    const component = render(
      <Router>
        <NoWebpages username="TheoOkafor" />
      </Router>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

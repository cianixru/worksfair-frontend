import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import NoWebpages from './NoWebpages';

afterEach(cleanup);

describe('NoWebpages.jsx', () => {
  test('Should display the NoWebpages Component', () => {
    const component = render(
      <Router>
        <NoWebpages user={{
          username: "TheoOkafor",
          confirmed_account: false
        }} />
      </Router>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

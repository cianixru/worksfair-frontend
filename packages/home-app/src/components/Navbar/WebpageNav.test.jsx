import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import WebpageNav from './WebpageNav';
import { webpage } from '../../utils/test-utils/mockData';

test('Test that the WebpageNav displays', () => {
  const component = render(
    <Router>
      <WebpageNav webpage={webpage} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});

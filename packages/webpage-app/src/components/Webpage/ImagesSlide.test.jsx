import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import ImageSlide from './ImagesSlide';
import { webpage } from '../../utils/test-utils/mockData';

test('Test that the ImageSlide displays default pictures', () => {
  webpage.featured_images = null;
  const component = render(
    <Router>
      <ImageSlide webpage={webpage} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});

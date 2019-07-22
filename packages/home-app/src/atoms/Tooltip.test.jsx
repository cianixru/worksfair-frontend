import React from 'react';
import { render } from 'react-testing-library';

import Tooltip from './Tooltip';

describe('Tooltip.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <Tooltip message={'Test tooltip'} />
    );
    expect(component).toMatchSnapshot();
  });
});

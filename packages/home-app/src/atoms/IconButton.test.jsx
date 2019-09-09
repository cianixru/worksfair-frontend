import React from 'react';
import { render } from 'react-testing-library';

import IconButton from './IconButton';

describe('IconButton.jsx', () => {
  const handleClick = jest.fn();
  test('renders correctly', () => {
    const component = render(
      <IconButton
        handleClick={handleClick}
        icon="fa fa-facebook"
        colour="has-text-info" />
    );
    expect(component).toMatchSnapshot();
  });
});

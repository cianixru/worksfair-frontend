import React from 'react';
import { render } from 'react-testing-library';

import SocialIcon from './SocialIcon';

describe('SocialIcon.jsx', () => {
  test('renders correctly', () => {
    const component = render(
      <SocialIcon
        icon="fa fa-facebook"
        colour="has-text-info" />
    );
    expect(component).toMatchSnapshot();
  });
});

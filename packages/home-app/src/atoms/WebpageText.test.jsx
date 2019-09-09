import React from 'react';
import { render } from 'react-testing-library';

import WebpageText from './WebpageText';

describe('WebpageText.jsx', () => {
  const handleClick = jest.fn();
  test('renders correctly', () => {
    const component = render(
      <WebpageText
        className="text"
        name="description"
        validationErrors={['Here', 'We', 'are']}
        handleErrorReset={handleClick}
        placeholder="text"
        info={['Here', 'We', 'are']}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

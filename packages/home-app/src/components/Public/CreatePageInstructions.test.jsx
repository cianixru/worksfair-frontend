import React from 'react';
import { render } from 'react-testing-library';
import CreateWebpageInstructions from './CreatePageInstructions';

test('Test that the CreateWebpageInstructions displays', () => {
  const component = render(
    <CreateWebpageInstructions />
  );
  expect(component).toMatchSnapshot();
});
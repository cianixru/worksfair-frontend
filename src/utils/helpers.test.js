import 'jest';
import formatMessage from './helpers';

test('should format message array to string', () => {
  const response = {
    title: ['Title must be provided'],
  };
  expect(formatMessage(response)).toEqual(' Title must be provided');
});

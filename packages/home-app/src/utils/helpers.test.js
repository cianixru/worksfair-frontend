import formatMessage, { makeWebsiteLink } from './helpers';

test('should format message array to string', () => {
  const response = {
    title: ['Title must be provided'],
  };
  expect(formatMessage(response)).toEqual(' Title must be provided');
});

test('should return the webpage URL', () => {
  const title = 'ideosynergy';
  expect(makeWebsiteLink(title)).toEqual('ideosynergy.worksfair.com');
});

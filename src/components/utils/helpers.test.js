import 'jest';
import { toSentenceCase } from './helpers';

test('should convert sentence to sentence case', () => {
  expect(toSentenceCase('my cheese')).toEqual('My cheese');
});

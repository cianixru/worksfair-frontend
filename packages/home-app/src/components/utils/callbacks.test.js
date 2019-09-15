import { ResponseCallback } from './callbacks';

describe('Callbacks.js', () => {
  const Callback = new ResponseCallback();

  const data = { user: { non_field_errors: 'user callback' } };
  const failurePayload = {
    type: 'AUTHENTICATION_FAILED',
    data,
    state: {
      validationErrors: data.user,
    },
  };
  const successPayload = {
    type: 'AUTHENTICATED_USER',
    data,
  };
  const response = {
    json: jest.fn().mockReturnValueOnce(data),
  };
  test('should handle response and payload', () => {
    expect(Callback.handleResponseAndPayload(data)).toEqual(successPayload);
  });
  test('should format JSON', () => {
    expect(Callback.formatJson(response)).toEqual(data);
  });
  test('should NOT handle response and payload', () => {
    expect(Callback.handleResponseAndPayload(data)).toEqual(failurePayload);
  });
});

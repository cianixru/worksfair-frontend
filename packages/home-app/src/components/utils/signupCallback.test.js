import ResponseCallback from './signupCallback';

describe('signupCallbacks.js', () => {
  const Callback = new ResponseCallback({ push: jest.fn() });

  const data = {
    user: {
      email: 't3rdday@yahoo.com',
      token: 'WYSIWYG',
      username: 'theo',
      non_field_errors: 'user callback',
    }
  };
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
  test('should handle response and payload', () => {
    const info = {
      user: {
        username: 'theo',
        non_field_errors: 'user callback',
      }
    };
    expect(Callback.handleResponseAndPayload(info)).toEqual({
      type: 'AUTHENTICATED_USER',
      data: info,
      state: undefined,
    });
  });
  test('should format JSON', () => {
    expect(Callback.formatJson(response)).toEqual(data);
  });
  test('should NOT handle response and payload', () => {
    expect(Callback.handleResponseAndPayload(data)).toEqual(failurePayload);
  });
});

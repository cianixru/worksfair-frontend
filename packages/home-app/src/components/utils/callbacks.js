
import {
  AUTHENTICATION_FAILED,
  AUTHENTICATED_USER,
} from '../../actions/auth';
import alert from './alert';

export const SIGNIN = 'SIGNIN';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export class ResponseCallback {
  constructor(action) {
    this.type = AUTHENTICATED_USER;
    switch (action) {
    case SIGNIN:
      this.successMessage = 'Successfully logged in!';
      this.failureMessage = 'Login failed. Please check your credentials';
      break;
    case RESET_PASSWORD:
      this.successMessage = 'Successful!';
      this.failureMessage = 'Reset Password failed. Please try again.';
      break;
    default:
      this.successMessage = 'Successful!';
      this.failureMessage = 'Failed';
    }
  }

  formatJson = (response) => {
    if (!response.ok) {
      this.type = AUTHENTICATION_FAILED;
      alert.error(this.failureMessage);
    }
    return response.json();
  }

  handleResponseAndPayload = (response) => {
    let state;
    if (this.type === AUTHENTICATION_FAILED) {
      const { user } = response;
      state = {
        validationErrors: user,
      };
      if (user.non_field_errors) {
        alert.info(user.non_field_errors[0]);
      }
    } else {
      alert.success(this.successMessage);

      window.location.pathname = `/dashboard/${
        response.user.username}/businesses`;
    }
    const payload = {
      type: this.type,
      data: response,
      state,
    };
    return payload;
  }
}


import {
  AUTHENTICATION_FAILED,
  AUTHENTICATED_USER,
} from '../../actions/auth';
import alert from './alert';
import { sendConfirmationEmail } from '../../utils/services';

class ResponseCallback {
  constructor(history) {
    this.history = history;
    this.type = AUTHENTICATED_USER;
    this.successMessage = 'Successfully Signed up!';
    this.failureMessage = 'Signup failed. Check for more details';
    this.emailFailMssg = 'Something went wrong. Confirmation email was not sent.';
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

      const { user: { email, token, username } } = response;
      const url = `${
        window.location.host}/dashboard/${
        username}/businesses?token=${token}`;

      if (token && email) {
        sendConfirmationEmail(url, email);
        this.history.push({
          pathname: `/dashboard/${username}/businesses`,
          state: { previousLocation: 'signup' }
        });
      } else {
        console.warn(this.emailFailMssg);
        this.history.push({
          pathname: `/dashboard/${username}/businesses`,
          state: { previousLocation: 'login' }
        });
      }
    }
    const payload = {
      type: this.type,
      data: response,
      state,
    };
    return payload;
  }
}

export default ResponseCallback;

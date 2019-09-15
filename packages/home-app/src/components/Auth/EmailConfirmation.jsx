import React, { Component } from 'react';
import PropTypes from 'prop-types';

import alert from '../utils/alert';
import { sendConfirmationEmail } from '../../utils/services';

class EmailConfirmation extends Component {
  sendConfirmationEmail = async () => {
    try {
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const url = `${
        window.location.host}/dashboard/${
        username}/businesses?token=${token}`;
      if (token && email) {
        await sendConfirmationEmail(url, email);
      } else {
        alert.error('Something went wrong. Please try to log into your account.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const content = {
      signup: {
        icon: 'fa-paper-plane-o',
        iconColour: 'has-text-info',
        main: 'We have sent you an email',
      },
      login: {
        icon: 'fa-exclamation-triangle',
        iconColour: 'has-text-warning',
        main: 'You have not confirmed your account',
      },
    };
    const { previousLocation } = this.props;
    return (
      <div className="message-body">
        <div>
          <div>
            <span className="icon is-normal">
              <i
                className={`fa ${
                  content[previousLocation].icon} is-size-3 ${
                  content[previousLocation].iconColour} `}
                aria-hidden="true" />
            </span>
          </div>
          <p className="is-size-4">{content[previousLocation].main}</p>
          <p className="is-size-6">
            Your account needs to be confirmed for you to use worksfair. Find the confirmation email in your inbox.
          </p>
          <p className="margin-top-25">
            <button
              className="button is-info is-outlined"
              onClick={this.sendConfirmationEmail}>
              Resend Email
            </button>
          </p>
        </div>
      </div>
    );
  }
}

EmailConfirmation.propTypes = {
  location: PropTypes.object,
  previousLocation: PropTypes.string,
};

export default EmailConfirmation;

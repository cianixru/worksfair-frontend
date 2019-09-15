import dotenv from 'dotenv';
import axios from 'axios';

import {
  accountConfirmationEmail,
  passwordResetEmail,
} from './emailTemplates';
import alert from '../components/utils/alert';

dotenv.config();

const {
  REACT_APP_EMAIL_ACCOUNT,
  REACT_APP_SERVER_URL,
} = process.env;

const url = `${REACT_APP_SERVER_URL}/sendmail`;
const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';
let type;

const emailer = {
  setMailOptions: (email, subject, html) => ({
    from: REACT_APP_EMAIL_ACCOUNT,
    to: email,
    subject,
    html,
  }),
  sendEmail: async (mailOptions) => await axios({
    url: '/sendmail',
    method: 'post',
    data: { mailOptions },
    baseURL: REACT_APP_SERVER_URL,
  }),
  sendEmailWithFetch: async (mailOptions) => await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ mailOptions }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (!res.ok) {
      type = SEND_EMAIL_FAILED;
      alert.warning('Email failed to send. Please contact the admin via admin@worksfair.com');
    }
    return res.json();
  })
    .then((response) => {
      if (type === SEND_EMAIL_FAILED) {
        console.log(response);
      } else {
        alert.success('Email has been sent successfully');
      }
    })
    .catch((error) => console.error('Error:', error))
};

export const sendConfirmationEmail = (appUrl, email) => {
  try {
    const emailBody = accountConfirmationEmail.replace(/{url}/g, appUrl);
    const emailOptions = emailer.setMailOptions(email, 'Email Confirmation', emailBody);
    emailer.sendEmailWithFetch(emailOptions);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const sendResetEmail = (url, email, fullname) => {
  try {
    const emailBody = passwordResetEmail.replace(/{url}/g, url);
    const emailOptions = emailer.setMailOptions(email, 'Password Reset', emailBody);
    emailer.sendEmailWithFetch(emailOptions);
    return;
  } catch (error) {
    console.log(error);
  }
};

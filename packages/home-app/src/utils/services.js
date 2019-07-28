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

const emailer = {
  setMailOptions: (email, subject, html) => ({
    from: REACT_APP_EMAIL_ACCOUNT,
    to: email,
    subject,
    html,
  }),
  sendEmail: async mailOptions => await axios({
    url: '/sendmail',
    method: 'post',
    data: { mailOptions },
    baseURL: REACT_APP_SERVER_URL,
  }),
};

export const sendConfirmationEmail = (url, email) => {
  try {
    const emailBody = accountConfirmationEmail.replace(/{url}/g, url);
    const emailOptions = emailer.setMailOptions(email, 'Email Confirmation', emailBody);
    emailer.sendEmail(emailOptions);
    alert.success('Email has been sent successfully');
    return;
  } catch (error) {
    console.log(error);
  }
}

export const sendResetEmail = (url, email, fullname) => {
  try {
    const emailBody = passwordResetEmail.replace(/{url}/g, url);
    const emailOptions = emailer.setMailOptions(email, 'Password Reset', emailBody);
    emailer.sendEmail(emailOptions);
    alert.success('An email has been sent to your account!');
    return;
  } catch (error) {
    console.log(error);
  }
}

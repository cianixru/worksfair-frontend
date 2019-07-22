const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const {
  REACT_APP_EMAIL_ACCOUNT,
  REACT_APP_EMAIL_PASSWORD,
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
  
app.post('/sendmail', (request, response) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: REACT_APP_EMAIL_ACCOUNT,
      pass: REACT_APP_EMAIL_PASSWORD,
    }
  });
  const { mailOptions } = request.body;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return response.status(500).json({
        status: 500,
        error,
      });
    }
    console.log('Message sent: %s', info.messageId);
    return response.status(200).json({
      status: 200,
      data: info,
    });
  });
});
  
app.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'), (error) => {
    if (error) {
      res.status(500).send(error);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express server is running on ${PORT}`)
);
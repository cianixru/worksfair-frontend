const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const vhost = require('vhost');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const {
  REACT_APP_SERVER_HOST,
  REACT_APP_EMAIL_ACCOUNT,
  REACT_APP_EMAIL_PASSWORD,
  REACT_APP_ALTERNATE_SERVER_HOST,
} = process.env;

const mainapp = express();
const webpageApp = express();

mainapp.use(bodyParser.json());

mainapp.use(express.static(path.join(__dirname, 'packages/home-app/build')));
webpageApp.use(express.static(path.join(__dirname, 'packages/webpage-app/build')));

mainapp.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
  
mainapp.post('/sendmail', (request, response) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
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
  } catch (error ) {
    console.log(error.message);
    return response.status(500).json({
      status: 500,
      error: error.message,
    });
  }
});

mainapp.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, 'packages/home-app/build', 'index.html'), (error) => {
    if (error) {
      response.status(500).send(error);
    }
  });
});

webpageApp.use( function (request, response) {
  const subDomain = request.vhost[0];

  console.log(subDomain);
  response.sendFile(path.join(__dirname, 'packages/webpage-app/build', 'index.html'), (error) => {
    if (error) {
      response.status(500).send(error);
    }
  });
});

// create main app
const app = express();

// add vhost routing for main app
app.use(vhost(REACT_APP_SERVER_HOST, mainapp));
app.use(vhost(REACT_APP_ALTERNATE_SERVER_HOST, mainapp));

app.use(vhost('*.worksfair.com', webpageApp));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express server is running on ${PORT}`)
);

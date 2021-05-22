import nodemailer from 'nodemailer';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

class EmailService {
  constructor() {}

  createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, // ClientID
      process.env.CLIENT_SECRET, // Client Secret
      'https://developers.google.com/oauthplayground' // Redirect URL
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return smtpTransport;
  };

  sendEmail = async (email, emailContent) => {
    try {
      const emailTransporter = await this.createTransporter();
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Vaccine Slot Available!',
        html: emailContent,
      };
      emailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Email could not sent: ' + error);
          return;
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default EmailService;

import nodemailer from "nodemailer";
import { google } from "googleapis";
import { activateEmailTemplate } from "@/emails/activateEmailTemplates";

// const { OAuth2 } = google.auth;
// const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

// const {
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   SENDER_EMAIL_ADDRESS,
// } = process.env;

// const oauth2Client = new OAuth2(
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   OAUTH_PLAYGROUND
// );

export const sendEmail = (to, url, txt, subject, template) => {
  // oauth2Client.setCredentials({
  //   refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  // });
  // const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    // service: "gmail",
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      // type: "OAuth2",
      // user: SENDER_EMAIL_ADDRESS,
      // clientId: MAILING_SERVICE_CLIENT_ID,
      // clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      // refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      // accessToken,
    },
  });
  const mailOptions = {
    from: `Nails Republic ${process.env.MAIL_USERNAME}`,
    to: to,
    subject: subject,
    html: template(to, url),
  };
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};

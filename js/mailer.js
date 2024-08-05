const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();
const redirect = process.env.REDIRECT_UI
const client = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const email = process.env.EMAIL
const refreshtoken = process.env.REFRESH
const reciever = process.env.EMAIL_RECIEVER

const oAuth2Client = new google.auth.OAuth2(
    client,
    secret,
    redirect
);

oAuth2Client.setCredentials({
    refresh_token: refreshtoken,
});



async function sendMail(to, subject, field) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: email,
                clientId: client,
                clientSecret: secret,
                refreshToken: refreshtoken,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: email,
            to: reciever,
            subject,
            text: field
        };

        const result = await transporter.sendMail(mailOptions);
        // console.log('Email sent...', result);
    } catch (error) {
        // console.error('Error sending email:', error);
    }
}

module.exports = sendMail;

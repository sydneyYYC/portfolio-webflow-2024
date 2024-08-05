const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./js/mailer');
require('dotenv').config();

// var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({origin: 'https://main--sydney-bruce-portfolio-webflow.netlify.app'}));

// Middleware to parse JSON payloads
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/contact', async (req, res) => {
  const { name, email, field } = req.body; // Extract data from the request body
//   console.log('Received data:', req.body); // Log received data for debugging
  const subject = `Contact Form Submission from ${name}`;
  const text = `Message from ${name} (${email}):\n\n${field}`;

  try {
      await sendEmail(email, subject, text); // Call sendEmail with the extracted data
      res.status(200).send('Email sent successfully!');
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email.');
  }
});

app.listen(5501, () => {
    console.log('Server running on http://localhost:5501');
});
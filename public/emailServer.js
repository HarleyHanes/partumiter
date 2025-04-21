const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = 3009;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // serve index.html

// Email handler
app.post('/send-email', (req, res) => {
  console.log('/send-email route hit');
  const { email, message } = req.body;
  console.log('Received email and message data');
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Response from Developer',
    text: message
  };
  console.log('Defined mail options');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('Defined transportor');

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      const fullError = {
	      message: err.message,
	      stack: err.stack,
	      ...err
	};
      console.error('SEND ERROR:',JSON.stringify(fullError,null,2));
      console.log('Send error detected');
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log("Sent succesfully");
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3009;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // serve index.html

// Email handler
app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Response from Developer',
    text: message
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending mail:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const { user, password } = require('../env/env')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: password
  }
});

const otp = Math.floor(1000 + Math.random() * 9000);
this.otpCode = Math.floor(100000 + Math.random() * 900000);
// const otpCodes = otpCode

router.post("/verifyotp", (req, res) => {
  const { otp } = req.body;
  console.log("otp==========================>", this.otpCode)
 
  if (otp == this.otpCode) {
    console.log("otp======>", otp);
    console.log(this.otpCode);
    res.status(200).send({ message: 'OTP verified successfull' });

  } else {
    res.status(401).send({ message: 'OTP Verified Successfull' });
  }
});

router.post("/generateOTP", (req, res) => {
  const { email } = req.body;
  // Generate a new OTP code and send it via email
  const mailOptions = {
    from: user,
    to: email,
    subject: "LogIn OTP",
    text: `Your OTP code is ${this.otpCode}.`,
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      console.error('Error sending email: ', error);
      res.status(500).send({ message: 'Failed to send OTP' });
    } else {
      // console.log('OTP sent: ', this.otpCode);
      res.status(200).send({ message: 'OTP sent successfully' });
    }
    var otpCode = this.otpCode
    console.log("otpverfi",otpCode)
  });
});


module.exports = router;

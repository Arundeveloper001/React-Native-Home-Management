const nodemailer = require('nodemailer');
const OTP = require('../modals/OTPSchema')
const { user, password } = require('../env/env')
const otpGenerator = require('otp-generator')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: password
    }
})

var mailOptions = {
    from: user,
    to: "",
    subject: "",
    text: ""
}

const setMailData = (to, subject, text) => {
    mailOptions.to = to
    mailOptions.subject = subject
    mailOptions.text = text
}


const SendMail = (to) => {
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    let subject = "Varification Code From Betwin"
    let text = `Your Betwin Varification code is ${otp} `
    setMailData(to, subject, text)

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error)
        } else {
            const NewOtp = new OTP({ toMail: to, OTP: otp, created_time: new Date() })
            const result = await NewOtp.save()
            console.log("resultOTp",result)
            console.log("otp genrated", otp)
            console.log("Email Sent Successfully...", info.response)
            return info
        }
    })
}

module.exports = {
    SendMail
}

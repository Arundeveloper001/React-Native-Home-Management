const { SendMail } = require('../Functions/MailerFunction')
const OTP = require('../modals/OTPSchema');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Mail Services Gateway...");
})


router.post("/SendMail", async (req, res) => {
    var result = await SendMail(req.body.toMail)
    // console.log("result====>",result);
    res.statusMessage = "Mail sent Successfully..."
    res.status(200).json({
        Results: result
    })
})


router.post("/VerifyOtp", async (req, res) => {
    // console.log("req",req.body.mail);
    var result = await OTP.findOne({ toMail: req.body.mail })
    console.log("req.body.OTP",result);
    if (result.OTP == req.body.OTP) {
        var result = await OTP.findOneAndDelete({ toMail: req.body.mail })
        res.statusMessage = "OTP Verify Successfully..."
        res.status(200).json()
    }
    else {
        res.statusMessage = "OTP Verification Failed..."
        res.status(400).json()
    }
    console.log("getingdtatafrommongodb", result)
})



module.exports = router;
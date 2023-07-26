const express = require('express');
const router = express.Router();
const user = require("../modals/Users")

router.post('/register', async (req, res) => {

  let { name, email, password } = req.body
  if (!name || !email || !password) {
    res.statusMessage = "Missing some required Data....."
    return res.status(201).json()
  }
  try {
    const newUser = new user({
      name:name,
      email: email.toLowerCase(),
      password:password,
    })
    const result = await newUser.save()
    // console.log("result===>", result)
    if (result) {
        res.statusMessage = "New User created Successfully..."
        res.status(200).json({          
            data: result
        })
    }
  }
  catch(err){
    res.statusMessage = "User already exists..."
    res.status(400).json({
        error: err
    })
  }
})


router.post('/login', async (req, res) => {
  // console.log("Body ===>> ", req.body)
  let { email, password } = req.body

  if (!email || !password) {
    res.statusMessage = "mail/password required..."
    return res.status(201).json()
}
try {
  let result = await user.findOne({ email:email })
  console.log("result----->",result)
  if (email === result.email && password === result.password) {
    res.statusMessage = "LoggedIn Successfully..."
    res.status(200).json({
        data: result
    })
}
else {
    res.statusMessage = "Wrong Credetial... Check Again..."
    res.status(400).json()
}
}
catch (err) {
  res.statusMessage = "User Not Found..."
  res.status(400).json({
      error: err,
  })
}

})


module.exports = router;



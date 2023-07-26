const express = require('express');
const router = express.Router();
const employee = require("../modals/Employee")

router.post('/addEmployee', async (req, res) => {

    let { name, email, password, category,employeeType } = req.body
    if (!name || !email || !password || !category ||!employeeType) {
        res.statusMessage = "Missing some required Data....."
        return res.status(201).json()
    }
    try {
        const newEmployee = new employee({
            name: name,
            email: email,
            password: password,
            category: category,
            employeeType:employeeType
        })
        const result = await newEmployee.save()
        // console.log("result===>", result)
        if (result) {
            res.statusMessage = "New User created Successfully..."
            res.status(200).json({
                data: result
            })
        }
    }
    catch (err) {
        res.statusMessage = "User already exists..."
        res.status(400).json({
            error: err
        })
    }
})


router.post('/employeeLogin', async (req, res) => {
    // console.log("Body ===>> ", req.body)
    let { email, password } = req.body
  
    if (!email || !password ) {
      res.statusMessage = "mail/password required..."
      return res.status(201).json()
  }
  try {
    let result = await employee.findOne({ email:email })
    // console.log("result----->",result)
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

router.get('/getEmployees', async (req, res) => {
    var result = await employee.find()
    // console.log("result====>", result);
    res.statusMessage = "Employee fetched successfully..."
    res.status(200).json({
        Length: result.length,
        Results: result
    })
})


router.post('/deleteEmployee/:id', async (req, res) => {
// console.log("req====>",req.params.id);
    if (!req.params.id) {
        res.statusMessage = "Some required missing..."
        return res.status(201).json({
            error: 'Some required missing...'
        })
    }

    try {
        let result = await employee.findOneAndDelete({ _id: req.params.id })
        if (result) {
            res.statusMessage = "User deleted successfully..."
            res.status(200).json({
                Results: result
            })
        }
    }

    catch (err) {
        res.statusMessage = "User delete Failed..."
        res.status(400).json({
        })
    }
})

router.post('/updateEmployee/:id', async (req, res) => {
    let { name, email, password, category } = req.body
// console.log("req",req.body);
    if (!name|| !email || !password ||!category || !req.params.id) {
        res.statusMessage = "Employee details updation Failed..."
        return res.status(201).json({
            error: 'Some required missing...'
        })
    }

    try {
        let result = await employee.findOneAndUpdate({ _id: req.params.id }, {
            name: name,
            email: email,
            password: password,
            category: category,
        })

        if (result) {
            res.statusMessage = "Updated successfully..."
            res.status(200).json({
                Results: result
            })
        }
    }
    catch (err) {
        res.statusMessage = "Updation Failed..."
        res.status(400).json({
            error: err
        })
    }
})

module.exports = router;


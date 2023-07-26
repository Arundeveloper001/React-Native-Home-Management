const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { DB_CONNECTION_URL } = require('./env/env')

const userAuth = require("./Routes/UserRouter")
const employeeAuth = require("./Routes/EmployeeRouter")
const reviews = require("./Routes/Ratings")
// const mailer = require("./Routes/Mailer")
const mailerRoute = require("./Routes/MailerRouter")
const uploadImg = require("./Routes/Test")

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.json({message:"Server is running"})
})
app.use(userAuth);
app.use(employeeAuth)
app.use(reviews)
app.use("/mailer",mailerRoute)
// app.use(uploadImg)


mongoose.connect(DB_CONNECTION_URL, {
    useNewUrlParser: true
}).then((result) => {
    console.log("MongoDB connected")    
}).catch(err => console.log(err));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {    
    console.log('Backend Server alive on port ' + PORT)
})
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    employeeType:{
        type: String,
        required: true
    }
});

const Employees = mongoose.model("employee", EmployeeSchema);
module.exports = Employees;
const mongoose = require('mongoose');
// scheama for the user

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: [true,"salary must be provided"]
    },
    createdAt:{
        type:Date,
        default :Date.now()
    }
}, {
    versionKey: false
});


const EmployeeModel = mongoose.model('masaiEmployee', employeeSchema)

module.exports = {
    EmployeeModel
}
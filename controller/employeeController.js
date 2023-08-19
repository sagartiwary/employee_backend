

// add employee

const { default: mongoose } = require("mongoose");
const { EmployeeModel } = require("../model/employeeSchema");

const addEmployee = async (req, res) => {
    const { firstName, lastName, salary, email, department } = req.body;
    try {
        let newEmployee = new EmployeeModel({
            firstName, lastName, email, salary, department
        });
        await newEmployee.save();
        res.status(200).json({ msg: "new employee added successfully", newEmployee })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// get empoyee

const getEmploye = async (req, res) => {
    try {
        let gotAllEmployee = await EmployeeModel.find();
        res.status(200).json({ msg: "All Employees", gotAllEmployee })
    } catch (error) {
        res.status(400).json({ msg: "Not Found!!" })
    }
}

// edit the specific employee

const editEmployee = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Employee not Found" })
    }
    try {
        let editible = await EmployeeModel.findByIdAndUpdate({ _id: id }, req.body);
        if (editible) {
            res.status(200).json({ msg: "Employee updated Successfully", editible })
        } else {
            res.status(400).json({ msg: "Not Found" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed to update!!" })
    }
}


const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Employee not Found" })
    }
    try {
        let editible = await EmployeeModel.findByIdAndDelete({ _id: id });
        if (editible) {
            res.status(200).json({ msg: "Employee Deleted Successfully", editible })
        } else {
            res.status(400).json({ msg: "Not Found" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed to Delete!!" })
    }
}




// filter 
const filterByDept=async(req,res)=>{
    try {
        let department = req.query.department;
        const query = department ? { department } : {};
        const employee = await EmployeeModel.find(query);
        res.status(200).json({ msg: "filter successfull", employee })
    } catch (error) {
        res.status(400).json({ msg: "some internal error" })
    }
}

// pagination

const paginateImplement=async(req,res)=>{
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = 2;
        let employee = await EmployeeModel.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json({ msg: employee })
    } catch (error) {
        res.status(400).json({ msg: "internal error " })
    }
}

module.exports = {
    addEmployee, getEmploye, editEmployee, deleteEmployee,filterByDept,paginateImplement
}
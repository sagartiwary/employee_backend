const express = require("express");
const { addEmployee, getEmploye, editEmployee, deleteEmployee, filterByDept, paginateImplement } = require("../controller/employeeController");
const employeeRouter = express.Router();
const { auth } = require("../middleware/auth");
const { EmployeeModel } = require("../model/employeeSchema");
// filter 
employeeRouter.get("/filter",filterByDept)
// pagination
employeeRouter.get("/paginate",paginateImplement);

employeeRouter.post("/add", auth, addEmployee)
employeeRouter.get('/', auth, getEmploye);
employeeRouter.put("/:id", auth, editEmployee);
employeeRouter.delete("/:id", auth, deleteEmployee);



module.exports = {
    employeeRouter
}
const express = require("express");
const { userRegister, userLogin } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", userRegister)
userRouter.post("/login", userLogin)
module.exports = {
    userRouter
}
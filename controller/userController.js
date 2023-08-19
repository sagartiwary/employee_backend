

// registration

const { UserModel } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
function checkPass(pass) {
    let numRes = /[0-9]/
    let alphaRes = /[A-Z]/;
    let maxLength = 8;


    return (
        numRes.test(pass) && alphaRes.test(pass)
        && maxLength >= 8
    )
}

const userRegister = async (req, res) => {

    let { email, password, confirm_password } = req.body;
    if (!checkPass(password)) {
        return res.status(401).json("Provide more details to the password")
    }
    try {
        let userExist = await UserModel.findOne({ email });
        if (userExist) {
            res.status(200).json({ msg: "User Already Existed!!" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    return res.status(400).json({ msg: err.message })
                } else {
                    let newUser = new UserModel({
                        email, password: hash,
                        confirm_password: hash
                    });
                    await newUser.save();
                    res.status(200).json({
                        msg: "new User Added",
                        newUser
                    })
                }
            })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

// login logic
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let exsitedUser = await UserModel.findOne({ email });
        if (exsitedUser) {
            bcrypt.compare(password, exsitedUser.password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ data: "sagar" }, "sagar", {
                        expiresIn: "7d"
                    });
                    res.status(200).json({ msg: "successfull Login !!", token })
                } else {
                    return res.status(400).json({ msg: "Wrong Credentials" })
                }
            })
        } else {
            res.status(201).json({ msg: "User does not exist" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = {
    userRegister, userLogin
}
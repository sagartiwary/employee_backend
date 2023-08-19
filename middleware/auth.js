const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            let decoded = jwt.verify(token, "sagar");
            if (decoded) {
                next()
            } else {
                res.status(200).json("Please Login!!")
            }
        } catch (error) {
               res.status(400).json({msg:error.message})
        }
    } else {
        res.status(400).json("Invalid token!!")
    }
}

module.exports = {
    auth
}
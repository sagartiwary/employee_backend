const mongoose = require('mongoose');
// scheama for the user

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});


const UserModel = mongoose.model('masaiUser', userSchema)

module.exports = {
    UserModel
}
const mongoose=require('mongoose');
require("dotenv").config();
let url=process.env.MONGO_URL;
const connect=mongoose.connect(url);
module.exports={
    connect
}
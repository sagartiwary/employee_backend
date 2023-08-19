const express = require('express');
const { connect } = require('./db/db');
const { userRouter } = require('./route/userRoute');
const { employeeRouter } = require('./route/employeeRoute');
const app = express();
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json());
app.use("/users", userRouter);
app.use("/employees", employeeRouter);

app.listen(port, async (req, res) => {
    try {
        await connect;
        console.log(`db is connected now ${port}`)
    } catch (error) {
        console.log(`db is not connected`)
    }
})
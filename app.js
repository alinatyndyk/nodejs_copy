const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');

const {userRouter, authRouter} = require("./routes");
const {PORT, MONGO_URL} = require("./configs/configs");
const runCronJobs = require('./cron/cron');
const {mainErrorHandler} = require("./errors");

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('REQUEST get / PROCESSED');
    res.json('Res body get /');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(mainErrorHandler);

app.listen(PORT, () => {
    console.log("App listen port 5000");
    mongoose.connect(MONGO_URL).then(() => {
        console.log('connected to testCopy database');

        runCronJobs();
    });
})
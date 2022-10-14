const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');

const {userRouter, authRouter} = require("./routes");
const {PORT, MONGO_URL} = require("./configs/configs");
const runCronJobs = require('./cron/cron');
const {mainErrorHandler} = require("./errors");


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {
    console.log('CONNECTED');
    console.log('=============================')
    console.log(socket.id);
    console.log(socket.handshake.auth);
    console.log('=============================')

    socket.on('message:create', (data) => {
        console.log(data);

        // emit even to sender
        // socket.emit('user:create', {name: 'Socket', hard: 10});
        // emit even to all users including sender
        // io.emit('user:create', {body: 'all users'});
        // emit event to all users despite sender
        socket.broadcast.emit('user:create', {body: 'without sender'});

    });

        socket.on('room:join', (data) => {
            const {roomId} = data;
            socket.join(roomId);

            // send tp room users without sender
            // socket.to(roomId).emit('room:newMember', {userName: socket.id});
            // send tp room users with sender
            io.to(roomId).emit('room:newMember', {userName: socket.id});
        })

});


app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('REQUEST get / PROCESSED');
    res.json('Res body get /');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(mainErrorHandler);

server.listen(PORT, () => {
    console.log("App listen port 5000");
    mongoose.connect(MONGO_URL).then(() => {
        console.log('connected to testCopy database');

        runCronJobs();
    });
})
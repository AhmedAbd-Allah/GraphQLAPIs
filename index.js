// express init
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// socket configuration
module.exports = io;

// request body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importing configurations
const config = require('./config');

// Startup database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphQL', { useNewUrlParser: true });


// Routers import
const checkStatus = require('./middlewares/checkStatus');
const checkMobile = require('./middlewares/checkMobile');
const userRouter = require('./api/users/index');
const diseaseRouter = require('./api/diseases/index');


// setting Config for GraphQL
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//initialize passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/user',checkStatus,checkMobile,userRouter);
app.use('/disease',checkStatus,diseaseRouter);

// app configuration
var port = process.env.PORT || 9000;
server.listen(port,()=>{
    console.log("server  on");
});

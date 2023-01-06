var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { checkConnectionDb } = require('./utils/checkDbConnection');

var app = express();

const cors = require("cors");
// const { cloudinary } = require('./config/cloudinary.config');

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CHECK DB CONNECTION
checkConnectionDb()

app.use('/', indexRouter);



module.exports = app;

const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const { checkOverload } = require('./helpers/check.connect');
const app = express();

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
//init db
require('./dbs/init.mongodb');
checkOverload();
//init routes
app.use('/', require('./routes'));
app.get('/', (req, res, next) => {
    return res.status(200).json({
        'message': 'Hello'
    })
})

//handle errors

app.use((req , res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'internal server error'
    })
})

module.exports = app;
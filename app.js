const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const app = express();

// Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 404,
    //     message: 'Not Found',
    // });
    const err = new Error(`Can't find ${req.originalUrl} on thsi server`);
    err.status = 'Fail';
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.merssage,
    });
});

module.exports = app;

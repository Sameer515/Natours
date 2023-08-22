
const express = require('express');
const morgan = require('morgan');

const tourRouter = require ('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const app=express();

// Middleware
app.use(morgan ('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public/`));

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);


module.exports=app
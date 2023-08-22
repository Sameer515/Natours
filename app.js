
const express = require('express');
const morgan = require('morgan');

const tourRouter = require ('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const app=express();

// Middleware
app.use(morgan ('dev'));

app.use(express.json());

const port= 3000;



//Route handlers






app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);

//Start server

app.listen(port,()=>{

    console.log(`Server is running on port ${port}`);

});

module.exports=app
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `./config.env` });

const DB = process.env.DataBase.replace(
    '<PASSWORD>',
    process.env.Database_Password,
);

// mongoose connect

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection established'));

// Read JSONfile and update database
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//import data to database

const imoprtData = async () => {
    try {
        await Tour.create(tours);
        console.log('DB has been updated successfully');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//Delete all Data from Collection in DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('DB has been Cleaned successfully');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--importa') {
    imoprtData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

//process.exit();

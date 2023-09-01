//const fs = require('fs');

const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'Error',
//             message: 'Tour not found or invalid ID',
//         });
//     }
//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(404).json({
//             status: 'fali',
//             message: 'missing name or price',
//         });
//     }
//     next();
// };

exports.getallTours = async (req, res) => {
    try {
        //Build query string
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        //advance filtering a
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        );
        //gte,gt,lte,lt
        //console.log(JSON.parse(queryStr));
        let query = Tour.find(JSON.parse(queryStr));

        //sorting request

        if (req.query.sort) {
            const sortby = req.query.sort.split(',').join(' ');
            query = query.sort(req.query.sort);
            //sort('price rating avg'))
        }

        //Execute query

        const tours = await query;
        //send response
        res.status(200).json({
            status: 'Success',
            reqesttime: new Date().toISOString(),
            results: tours.length,
            data: { tours },
        });
    } catch (e) {
        res.status(404).json({
            status: 'Error',
            message: e.message,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { tour },
        });
    } catch (e) {
        res.status(404).json({
            status: 'Failed not found',
            message: e.message,
        });
    }
    // const id = req.params.id * 1;
    // //const tour = tours.find((el) => el.id === id);
    // res.status(200).json({
    //     data: { tour },
    // });
};

exports.createTour = async (req, res) => {
    // console.log(req.body);
    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = { id: newId, ...req.body };
    // tours.push(newTour);
    // fs.writeFile(
    //     `${__dirname}/dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours),
    //     (error) => {
    //         res.status(201).json({
    //             status: 'Success',
    //             data: {
    //                 tours: newTour,
    //             },
    //         });
    //     },
    // );

    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: {
                tours: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fali',
            message: err,
        });
    }
};
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'Success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed not found',
            message: err.message,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'Success',
            data: null,
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Tour not found or invalid ID',
            message: err.message,
        });
    }

    // if (req.params.id * 1 > tours.length) {
    // return res.status(404).json({
    //     status: 'Error',
    //     message: 'Tour not found or invalid ID',
    //  });
    //}
    // res.status(204).json({
    //     status: 'Success',
    //     data: null,
    // });
};

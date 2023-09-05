//const fs = require('fs');
const APIFeatuer = require('../utils/apiFeatures');
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

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getallTours = async (req, res) => {
    try {
        //Build query string
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        // const queryObj = { ...req.query };
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach((el) => delete queryObj[el]);

        // //advance filtering a
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(
        //     /\b(gte|gt|lte|lt)\b/g,
        //     (match) => `$${match}`,
        // );
        // //gte,gt,lte,lt
        // //console.log(JSON.parse(queryStr));
        // let query = Tour.find(JSON.parse(queryStr));

        //sorting request

        // if (req.query.sort) {
        //     const sortby = req.query.sort.split(',').join(' ');
        //     query = query.sort(req.query.sort);
        //     //sort('price rating avg'))
        // } else {
        //     query = query.sort('-createdAT');
        // }

        // //Filed Limiting
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select('name duration price');
        // } else {
        //     query = query.select('-__v');
        // }

        //Pagination
        //pages=2&limit=10
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;

        // query = query.skip(skip).limit(limit);
        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error('This Page does not exist');
        // }

        //Execute query
        const features = new APIFeatuer(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await features.query;
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

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            { $match: { ratingsAverage: { $gte: 4.5 } } },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRating: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                },
            },
            {
                $sort: { avgPrice: 1 },
            },
            // {
            //     $match: { _id: { $ne: 'EASY' } },
            // },
        ]);
        res.status(200).json({
            status: 'Success',
            data: {
                stats,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: 'failed',
            message: e,
        });
    }
};

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1; // 2021

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates',
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' },
                },
            },
            {
                $addFields: { month: '$_id' },
            },
            {
                $project: {
                    _id: 0,
                },
            },
            {
                $sort: { numTourStarts: -1 },
            },
            {
                $limit: 12,
            },
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                plan,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

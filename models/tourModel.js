const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tour must have a name'],
            unique: true,
            trim: true,
        },
        slug: String,

        duration: {
            type: Number,
            required: [true, 'Tour must have a duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'Tour must have a group size'],
        },
        difficulty: {
            type: String,
            required: [true, 'Tour must have a difficulty'],
        },
        ratingsAverage: { type: Number, defaul: 4.5 },
        ratingsQuantity: { type: Number, defaul: 0 },
        price: {
            type: Number,
            required: [true, 'Tour must have a price'],
        },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true,
            required: [true, 'Tour must have a summary'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'Tour must have a image'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
        secrettour: {
            type: Boolean,
            default: false,
        },
    },
    { toJSON: { virtuals: true } },
    { toObject: { virtuals: true } },
);

tourSchema.virtual('durationweeks').get(function () {
    return this.duration / 7;
});
//Docoument Middleware :rund before .save and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save', function(next) {
//     console.log('Will save the document');
//     next();
// });

// tourSchema.post('save', function(doc, next)  {
//     console.log(doc);
//     next();
// });

//Query Middleware

tourSchema.pre(/^find/, function (next) {
    this.find({ secrettour: { $ne: true } });
    this.startDates = Date.now();

    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(docs);
    next();
});

//Aggregation Middleware
tourSchema.pre(/^agg/, function (next) {
    this.pipeline().unshift({ $match: { secrettour: { $ne: true } } });
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const monadMadnessSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        twitter: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

monadMadnessSchema.plugin(toJSON);
monadMadnessSchema.plugin(paginate);

const MonadMadness = mongoose.model('MonadMadness', monadMadnessSchema);
module.exports = MonadMadness;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const spaceSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        items: [
            {
                title: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

spaceSchema.plugin(toJSON);
spaceSchema.plugin(paginate);

const Space = mongoose.model('Space', spaceSchema);
module.exports = Space;

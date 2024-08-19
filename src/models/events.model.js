const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { formatDate, formatDateTime } = require('../utils/utils');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['Podcast', 'Meetup', 'Conference'], // Add other categories as needed
        },
    },
    {
        timestamps: true,
    }
);

// Index the date field for better sorting performance
eventSchema.index({ date: 1 });

eventSchema.plugin(toJSON, {
    transformations: [
        { fieldKey: 'date', transformFn: formatDate },
        { fieldKey: 'createdAt', transformFn: formatDateTime },
    ],
    showHiddenField: { createdAt: true },
});

eventSchema.plugin(paginate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index the date field for better sorting performance
eventSchema.index({ date: 1 });

eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

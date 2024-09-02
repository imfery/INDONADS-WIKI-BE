const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { NEWS_CATEGORIES } = require('../config/enums');
const { formatDateTime } = require('../utils/utils');

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: NEWS_CATEGORIES,
            required: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            // Ensure these fields are defined
            type: String,
            required: true,
        },
        updatedBy: {
            // Ensure these fields are defined
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

newsSchema.plugin(paginate);
newsSchema.plugin(toJSON, {
    transformations: [{ fieldKey: 'createdAt', transformFn: formatDateTime }],
    showHiddenField: { createdAt: true },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

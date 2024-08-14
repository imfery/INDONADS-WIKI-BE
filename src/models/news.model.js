const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { DEFAULT_URL, NEWS_TAGS, NEWS_CATEGORIES } = require('../config/enums');

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
        coverImageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        tags: [
            {
                type: String,
                enum: NEWS_TAGS,
            },
        ],
        category: {
            type: String,
            enum: NEWS_CATEGORIES,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

newsSchema.virtual('url').get(function () {
    const titleSlug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return `${DEFAULT_URL}/news/${titleSlug}-${this._id}`;
});

newsSchema.pre('save', function (next) {
    if (!this.content || this.content.trim().length === 0) {
        return next(new Error('Content cannot be empty'));
    }
    next();
});

newsSchema.plugin(toJSON);
newsSchema.plugin(paginate);

const News = mongoose.model('News', newsSchema);

module.exports = News;

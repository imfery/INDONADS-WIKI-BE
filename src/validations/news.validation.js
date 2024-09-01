const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { NEWS_CATEGORIES } = require('../config/enums');
const LATEST_NEWS_COUNT = require('../constants/index');

const validateContentBlocks = (value, helpers) => {
    try {
        const content = JSON.parse(value);
        if (!content.blocks || content.blocks.length === 0) {
            return helpers.error('any.invalid');
        }
        return value;
    } catch (e) {
        return helpers.error('any.invalid');
    }
};

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        summary: Joi.string().required().trim(),
        content: Joi.string().required().custom(validateContentBlocks, 'Content blocks validation'),
        category: Joi.string()
            .valid(...NEWS_CATEGORIES)
            .required()
            .trim(),
        isActive: Joi.boolean(),
    }),
};

const getNews = {
    query: Joi.object().keys({
        sortField: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getLatestNews = {
    query: Joi.object().keys({
        limit: Joi.number().integer().default(LATEST_NEWS_COUNT),
    }),
};

const getNewsById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

const updateNewsById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().trim(),
            summary: Joi.string().trim(),
            content: Joi.string().required().custom(validateContentBlocks, 'Content blocks validation'),
            category: Joi.string()
                .valid(...NEWS_CATEGORIES)
                .trim(),
            isActive: Joi.boolean(),
        })
        .min(1),
};

const deleteNewsById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createNews,
    getNews,
    getLatestNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
};

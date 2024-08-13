const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { NEWS_TAGS, NEWS_CATEGORIES } = require('../config/enums');
const LATEST_NEWS_COUNT = require('../constants/index')

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        summary: Joi.string().required().trim(),
        content: Joi.string().required(),
        coverImageUrl: Joi.string().uri().required().trim(),
        tags: Joi.array().items(Joi.string().valid(...NEWS_TAGS)),
        category: Joi.string().valid(...NEWS_CATEGORIES).required().trim(),
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
            content: Joi.string(),
            coverImageUrl: Joi.string().uri().trim(),
            tags: Joi.array().items(Joi.string().valid(...NEWS_TAGS)),
            category: Joi.string().valid(...NEWS_CATEGORIES).trim(),
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

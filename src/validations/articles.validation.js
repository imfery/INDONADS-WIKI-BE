const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { ARTICLES_CATEGORIES } = require('../config/enums');
const LATEST_ARTICLES_COUNT = require('../constants/index');

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

const createArticles = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        summary: Joi.string().required().trim(),
        content: Joi.string().required().custom(validateContentBlocks, 'Content blocks validation'),
        category: Joi.string()
            .valid(...ARTICLES_CATEGORIES)
            .required()
            .trim(),
        isActive: Joi.boolean(),
    }),
};

const getArticles = {
    query: Joi.object().keys({
        sortField: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getLatestArticles = {
    query: Joi.object().keys({
        limit: Joi.number().integer().default(LATEST_ARTICLES_COUNT),
    }),
};

const getArticlesById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

const updateArticlesById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().trim(),
            summary: Joi.string().trim(),
            content: Joi.string().required().custom(validateContentBlocks, 'Content blocks validation'),
            category: Joi.string()
                .valid(...ARTICLES_CATEGORIES)
                .trim(),
            isActive: Joi.boolean(),
        })
        .min(1),
};

const deleteArticlesById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createArticles,
    getArticles,
    getLatestArticles,
    getArticlesById,
    updateArticlesById,
    deleteArticlesById,
};

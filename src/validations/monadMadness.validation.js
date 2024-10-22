const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMonadMadness = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        image: Joi.string().required().trim(),
        twitter: Joi.string().required().trim(),
        website: Joi.string().required().trim(),
        location: Joi.string().optional().trim(),
    }),
};

const getAllMonadMadness = {
    query: Joi.object().keys({
        sortField: Joi.string().optional(),
        sortBy: Joi.string().optional(),
        limit: Joi.number().integer().optional(),
        page: Joi.number().integer().optional(),
    }),
};

const getMonadMadnessById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

const updateMonadMadnessById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().trim(),
            description: Joi.string().trim(),
            image: Joi.string().trim(),
            twitter: Joi.string().trim(),
            website: Joi.string().trim(),
            location: Joi.string().optional().trim(),
        })
        .min(1),
};

const deleteMonadMadnessById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createMonadMadness,
    getAllMonadMadness,
    getMonadMadnessById,
    updateMonadMadnessById,
    deleteMonadMadnessById,
};

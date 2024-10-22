const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSpace = {
    body: Joi.object().keys({
        category: Joi.string().required().trim(),
        items: Joi.array()
            .items(
                Joi.object({
                    title: Joi.string().required().trim(),
                    url: Joi.string().uri().required().trim(),
                })
            )
            .required(),
    }),
};

const getAllSpaces = {
    query: Joi.object().keys({
        sortField: Joi.string().optional(),
        sortBy: Joi.string().optional(),
        limit: Joi.number().integer().optional(),
        page: Joi.number().integer().optional(),
    }),
};

const getSpaceById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

const updateSpaceById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            category: Joi.string().trim(),
            items: Joi.array().items(
                Joi.object({
                    title: Joi.string().trim(),
                    url: Joi.string().uri().trim(),
                })
            ),
        })
        .min(1),
};

const deleteSpaceById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createSpace,
    getAllSpaces,
    getSpaceById,
    updateSpaceById,
    deleteSpaceById,
};

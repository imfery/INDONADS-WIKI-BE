const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.date().required(),
        location: Joi.string().required(),
        category: Joi.string().required(),
    }),
};

const getEvents = {
    query: Joi.object().keys({
        sortField: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getEventById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

const updateEventById = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            date: Joi.date().required(),
            location: Joi.string().required(),
            category: Joi.string().required(),
        })
        .min(1),
};

const deleteEventById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEventById,
    deleteEventById,
};

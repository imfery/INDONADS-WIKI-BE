const Joi = require('joi');

const createEvent = {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      location: Joi.string().required(),
      image: Joi.string().required()
    }),
};

module.exports = {
    createEvent
};
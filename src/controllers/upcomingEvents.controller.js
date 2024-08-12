const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');
const { successResponse } = require('./custom.controller')

const createEvent = catchAsync(async (req, res) => {
    const user = await eventService.createEvent(req.body);
    res.status(httpStatus.CREATED).send(successPostResponse(user));
});

// const getEvent = catchAsync(async (req, res) => {
//     const event = await eventService.getEventById(req.params.eventId);
//     if (!event) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//     }
//     res.send(user);
// });

module.exports = {
    createEvent,
    // getEvent,
};
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');
const { successResponse } = require('./custom.controller');

const createEvent = catchAsync(async (req, res) => {
    const event = await eventService.createEvent(req.body);
    res.status(httpStatus.CREATED).send(successResponse(event));
});

const getEvents = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortField', 'sortBy', 'limit', 'page']);
    const result = await eventService.queryEvents(filter, options);
    res.send(successResponse(result));
});

const getEventsSummary = catchAsync(async (req, res) => {
    const eventsSummary = await eventService.getEventsSummary();

    res.status(httpStatus.OK).send(successResponse(eventsSummary));
});

const getEventById = catchAsync(async (req, res) => {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    res.send(successResponse(event));
});

const updateEventById = catchAsync(async (req, res) => {
    const event = await eventService.updateEventById(req.params.id, req.body);
    res.send(successResponse(event));
});

const deleteEventById = catchAsync(async (req, res) => {
    await eventService.deleteEventById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    getEventsSummary,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { monadMadnessService } = require('../services');
const { successResponse } = require('./custom.controller');

const createMonadMadness = catchAsync(async (req, res) => {
    const data = await monadMadnessService.createMonadMadness(req.body);
    res.status(httpStatus.CREATED).send(successResponse(data));
});

const getAllMonadMadness = catchAsync(async (req, res) => {
    const data = await monadMadnessService.getAllMonadMadness();
    res.status(httpStatus.OK).send(successResponse(data));
});

const updateMonadMadnessById = catchAsync(async (req, res) => {
    const data = await monadMadnessService.updateMonadMadnessById(req.params.id, req.body);
    res.status(httpStatus.OK).send(successResponse(data));
});

const deleteMonadMadnessById = catchAsync(async (req, res) => {
    await monadMadnessService.deleteMonadMadnessById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createMonadMadness,
    getAllMonadMadness,
    updateMonadMadnessById,
    deleteMonadMadnessById,
};

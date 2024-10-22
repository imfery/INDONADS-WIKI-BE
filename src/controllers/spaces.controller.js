const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { spacesService } = require('../services');
const { successResponse } = require('./custom.controller');

const createSpace = catchAsync(async (req, res) => {
    const data = await spacesService.createSpace(req.body);
    res.status(httpStatus.CREATED).send(successResponse(data));
});

const getAllSpaces = catchAsync(async (req, res) => {
    const data = await spacesService.getAllSpaces(req.query);
    res.status(httpStatus.OK).send(successResponse(data));
});

const updateSpaceById = catchAsync(async (req, res) => {
    const data = await spacesService.updateSpaceById(req.params.id, req.body);
    res.status(httpStatus.OK).send(successResponse(data));
});

const deleteSpaceById = catchAsync(async (req, res) => {
    await spacesService.deleteSpaceById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

const getSpaceById = catchAsync(async (req, res) => {
    const data = await spacesService.getSpaceById(req.params.id);
    if (!data) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Entry not found' });
    } else {
        res.status(httpStatus.OK).send(successResponse(data));
    }
});

module.exports = {
    createSpace,
    getAllSpaces,
    getSpaceById,
    updateSpaceById,
    deleteSpaceById,
};

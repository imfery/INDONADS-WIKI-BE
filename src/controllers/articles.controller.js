const httpStatus = require('http-status');
const jwt = require('jsonwebtoken'); // Import jwt
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articlesService, userService } = require('../services');
const { successResponse } = require('./custom.controller');

const createArticles = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.sub;

    const user = await userService.getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    const articlesData = {
        ...req.body,
        createdBy: user.name,
        updatedBy: user.name,
    };

    const articles = await articlesService.createArticles(articlesData);
    res.status(httpStatus.CREATED).send(successResponse(articles));
});

const getArticles = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortField', 'sortBy', 'limit', 'page']);
    const result = await articlesService.queryArticles(filter, options);
    res.send(successResponse(result));
});

const getLatestArticles = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortField', 'sortBy', 'limit', 'page']);
    const latestArticles = await articlesService.getLatestArticles(options);
    const response = {
        ...latestArticles,
    };

    res.status(httpStatus.OK).send(successResponse(response));
});

const getArticlesById = catchAsync(async (req, res) => {
    const articles = await articlesService.getArticlesById(req.params.id);
    if (!articles) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Articles not found');
    }
    res.send(successResponse(articles));
});

const updateArticlesById = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.decode(token);
    const userId = decodedToken.sub;

    const user = await userService.getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    const articlesData = {
        ...req.body,
        updatedBy: user.name,
    };

    const articles = await articlesService.updateArticlesById(req.params.id, articlesData);
    res.send(successResponse(articles));
});

const deleteArticlesById = catchAsync(async (req, res) => {
    await articlesService.deleteArticlesById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

const getActiveArticles = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortField', 'sortBy', 'limit', 'page']);
    const result = await articlesService.queryActiveArticles(options);
    res.send(successResponse(result));
});

module.exports = {
    createArticles,
    getArticles,
    getArticlesById,
    updateArticlesById,
    deleteArticlesById,
    getLatestArticles,
    getActiveArticles,
};

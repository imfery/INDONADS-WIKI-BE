const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsService } = require('../services');
const { successResponse } = require('./custom.controller');

const createNews = catchAsync(async (req, res) => {
    const news = await newsService.createNews(req.body);
    res.status(httpStatus.CREATED).send(successResponse(news));
});

const getNews = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await newsService.queryNews(filter, options);
    res.send(successResponse(result));
});

const getLatestNews = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortField', 'sortBy', 'limit', 'page']);
    const latestNews = await newsService.getLatestNews(options);
    const response = {
        data: latestNews.data || [],
        timestamps: Math.floor(Date.now() / 1000),
    };

    res.status(httpStatus.OK).send(successResponse(response));
});

const getNewsById = catchAsync(async (req, res) => {
    const news = await newsService.getNewsById(req.params.id);
    if (!news) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    res.send(successResponse(news));
});

const updateNewsById = catchAsync(async (req, res) => {
    const news = await newsService.updateNewsById(req.params.id, req.body);
    res.send(successResponse(news));
});

const deleteNewsById = catchAsync(async (req, res) => {
    await newsService.deleteNewsById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createNews,
    getNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
    getLatestNews,
};

const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');
const { LATEST_NEWS_COUNT } = require('../constants/index');

/**
 * Create a news item
 * @param {Object} newsBody
 * @returns {Promise<News>}
 */
const createNews = async (newsBody) => {
    return News.create(newsBody);
};

/**
 * Query for news items
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortField] - Field to sort by (e.g., 'date')
 * @param {string} [options.sortBy] - Sort order (either 'asc' or 'desc')
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNews = async (filter, options) => {
    const sortField = options.sortField || 'createdAt';
    const sortOrder = options.sortBy === 'desc' ? -1 : 1;

    const sort = { [sortField]: sortOrder };
    const limit = options.limit || 10;

    const usePagination = options.limit !== undefined && options.page !== undefined;
    const page = options.page || 1;
    const skip = (page - 1) * limit;

    let result;

    if (usePagination) {
        const news = await News.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalResults = await News.countDocuments(filter).exec();
        const totalPages = Math.ceil(totalResults / limit);

        result = {
            news: news,
            page,
            limit,
            totalPages,
            totalResults
        };
    } else {
        const news = await News.find(filter).sort(sort).limit(limit).exec();

        result = {
            news: news
        };
    }

    return result;
};



/**
 * Fetch latest news
 * @param {Object} [options]
 * @returns {Promise<Object>}
 */
const getLatestNews = async () => {
    const latestFilter = {};

    const latestOptions = {
        limit: LATEST_NEWS_COUNT,
        sortField: 'createdAt',
        sortBy: 'desc'
    };

    const result = await queryNews(latestFilter, latestOptions);

    return {
        ...result || [],
        // news: result.data || [] // Default to empty array if `data` is undefined
    };
};




/**
 * Fetch news by ID
 * @param {ObjectId} id
 * @returns {Promise<News>}
 */
const getNewsById = async (id) => {
    const newsItem = await News.findById(id);
    if (!newsItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    return newsItem;
};

/**
 * Update news by ID
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<News>}
 */
const updateNewsById = async (id, updateBody) => {
    const newsItem = await getNewsById(id);
    if (!newsItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    Object.assign(newsItem, updateBody);
    await newsItem.save();
    return newsItem;
};

/**
 * Delete news by ID
 * @param {ObjectId} id
 * @returns {Promise<News>}
 */
const deleteNewsById = async (id) => {
    const newsItem = await getNewsById(id);
    if (!newsItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    await newsItem.remove();
    return newsItem;
};

module.exports = {
    createNews,
    queryNews,
    getLatestNews,
    getNewsById,
    updateNewsById,
    deleteNewsById
};

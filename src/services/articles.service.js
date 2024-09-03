const httpStatus = require('http-status');
const { Articles } = require('../models');
const ApiError = require('../utils/ApiError');
const { LATEST_ARTICLES_COUNT } = require('../constants/index');

/**
 * Create a articles item
 * @param {Object} articlesBody
 * @returns {Promise<Articles>}
 */
const createArticles = async (articlesBody) => {
    return Articles.create(articlesBody);
};

/**
 * Query for articles items
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortField] - Field to sort by (e.g., 'date')
 * @param {string} [options.sortBy] - Sort order (either 'asc' or 'desc')
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryArticles = async (filter, options) => {
    const sortField = options.sortField || 'updatedAt'; // Default to 'updatedAt'
    const sortOrder = options.sortBy === 'desc' ? -1 : 1;

    const sort = { [sortField]: sortOrder };

    const limit = options.limit || 10;
    const page = options.page || 1;
    const skip = (page - 1) * limit;

    const usePagination = options.limit !== undefined && options.page !== undefined;

    let result;

    if (usePagination) {
        const articles = await Articles.find(filter).sort(sort).skip(skip).limit(limit).exec();

        const totalResults = await Articles.countDocuments(filter).exec();
        const totalPages = Math.ceil(totalResults / limit);

        result = {
            articles,
            page,
            limit,
            totalPages,
            totalResults,
        };
    } else {
        const articles = await Articles.find(filter).sort(sort).limit(limit).exec();

        result = {
            articles,
        };
    }

    return result;
};

/**
 * Fetch latest articles
 * @param {Object} [options]
 * @returns {Promise<Object>}
 */
const getLatestArticles = async () => {
    const latestFilter = {};

    const latestOptions = {
        limit: LATEST_ARTICLES_COUNT,
        sortField: 'createdAt',
        sortBy: 'desc',
    };

    const result = await queryArticles(latestFilter, latestOptions);

    return {
        ...(result || []),
        // articles: result.data || [] // Default to empty array if `data` is undefined
    };
};

/**
 * Fetch articles by ID
 * @param {ObjectId} id
 * @returns {Promise<Articles>}
 */
const getArticlesById = async (id) => {
    const articlesItem = await Articles.findById(id);
    if (!articlesItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Articles not found');
    }
    return articlesItem;
};

/**
 * Update articles by ID
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Articles>}
 */
const updateArticlesById = async (id, updateBody) => {
    const articlesItem = await getArticlesById(id);
    if (!articlesItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Articles not found');
    }
    Object.assign(articlesItem, updateBody);
    await articlesItem.save();
    return articlesItem;
};

/**
 * Delete articles by ID
 * @param {ObjectId} id
 * @returns {Promise<Articles>}
 */
const deleteArticlesById = async (id) => {
    const articlesItem = await getArticlesById(id);
    if (!articlesItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Articles not found');
    }
    await articlesItem.remove();
    return articlesItem;
};

module.exports = {
    createArticles,
    queryArticles,
    getLatestArticles,
    getArticlesById,
    updateArticlesById,
    deleteArticlesById,
};

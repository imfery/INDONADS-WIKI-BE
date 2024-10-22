const Space = require('../models/spaces.model');

/**
 * Create a new space entry
 * @param {Object} body
 * @returns {Promise<Space>}
 */
const createSpace = async (body) => {
    return Space.create(body);
};

/**
 * Get all space entries with dynamic sorting
 * @param {Object} query - Query parameters for sorting
 * @returns {Promise<Array>}
 */
const getAllSpaces = async (query = {}) => {
    const { sortField = 'createdAt', sortBy = 'desc' } = query;

    const sortOrder = sortBy === 'desc' ? -1 : 1;

    const sortOptions = { [sortField]: sortOrder };

    const spaces = await Space.find().sort(sortOptions);

    const responseData = spaces.map((space) => ({
        id: space.id,
        category: space.category,
        items: space.items.map((item) => ({
            title: item.title,
            url: item.url,
        })),
    }));

    return responseData;
};

/**
 * Get space entry by id
 * @param {ObjectId} id
 * @returns {Promise<Space>}
 */
const getSpaceById = async (id) => {
    return Space.findById(id);
};

/**
 * Update space by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Space>}
 */
const updateSpaceById = async (id, updateBody) => {
    return Space.findByIdAndUpdate(id, updateBody, { new: true });
};

/**
 * Delete space by id
 * @param {ObjectId} id
 * @returns {Promise<Space>}
 */
const deleteSpaceById = async (id) => {
    return Space.findByIdAndDelete(id);
};

module.exports = {
    createSpace,
    getAllSpaces,
    getSpaceById,
    updateSpaceById,
    deleteSpaceById,
};

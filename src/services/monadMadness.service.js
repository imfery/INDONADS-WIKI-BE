const MonadMadness = require('../models/monadMadness.model');

/**
 * Create a new monad madness entry
 * @param {Object} body
 * @returns {Promise<MonadMadness>}
 */
const createMonadMadness = async (body) => {
    return MonadMadness.create(body);
};

/**
 * Get all monad madness entries
 * @returns {Promise<Array>}
 */
const getAllMonadMadness = async (query = {}) => {
    const { sortField = 'createdAt', sortBy = 'desc', limit, page } = query;

    const sortOrder = sortBy === 'desc' ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    if (typeof limit === 'undefined' && typeof page === 'undefined') {
        const participants = await MonadMadness.find().sort(sortOptions);
        return { participants };
    }

    const calculatedLimit = parseInt(limit, 10) || 10;
    const calculatedPage = parseInt(page, 10) || 1;
    const skip = (calculatedPage - 1) * calculatedLimit;

    const participants = await MonadMadness.find().sort(sortOptions).skip(skip).limit(calculatedLimit);

    const totalResults = await MonadMadness.countDocuments().exec();
    const totalPages = Math.ceil(totalResults / calculatedLimit);

    return {
        participants,
        page: calculatedPage,
        limit: calculatedLimit,
        totalPages,
        totalResults,
    };
};

/**
 * Get monad madness entry by id
 * @param {ObjectId} id
 * @returns {Promise<MonadMadness>}
 */
const getMonadMadnessById = async (id) => {
    return MonadMadness.findById(id);
};

/**
 * Update monad madness by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<MonadMadness>}
 */
const updateMonadMadnessById = async (id, updateBody) => {
    const monadMadness = await MonadMadness.findByIdAndUpdate(id, updateBody, { new: true });
    return monadMadness;
};

/**
 * Delete monad madness by id
 * @param {ObjectId} id
 * @returns {Promise<MonadMadness>}
 */
const deleteMonadMadnessById = async (id) => {
    const monadMadness = await MonadMadness.findByIdAndDelete(id);
    return monadMadness;
};

module.exports = {
    createMonadMadness,
    getAllMonadMadness,
    getMonadMadnessById,
    updateMonadMadnessById,
    deleteMonadMadnessById,
};

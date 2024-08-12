const httpStatus = require('http-status');
const { Event } = require('../models');

/**
 * Create an event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */

const createEvent = async (userBody) => {
    return Event.create(userBody);
};

// /**
//  * Query for events
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryEvents = async (filter, options) => {
//     const events = await Event.paginate(filter, options);
//     return events;
// };

// /**
//  * Get event by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getEventById = async (id) => {
//     return Event.findById(id);
// };


module.exports = {
    createEvent,
    // queryEvents,
    // getEventById,
};  
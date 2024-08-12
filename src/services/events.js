const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */

const createEvent = async (userBody) => {
    return Event.create(userBody);
};

/**
 * Query for events
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortField] - Field to sort by (e.g., 'date')
 * @param {string} [options.sortBy] - Sort order (either 'asc' or 'desc')
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEvents = async (filter, options) => {
    const sortField = options.sortField || 'date';
    const sortOrder = options.sortBy === 'desc' ? -1 : 1;

    const sort = { [sortField]: sortOrder };

    // Optionally set pagination defaults
    const limit = options.limit || 10;
    const page = options.page || 1;
    const skip = (page - 1) * limit;

    const events = await Event.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();

    const totalResults = await Event.countDocuments(filter).exec();
    const totalPages = Math.ceil(totalResults / limit);

    return {
        results: events,
        page,
        limit,
        totalPages,
        totalResults
    };
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEventById = async (id) => {
    return Event.findById(id);
};

/**
 * Update event by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateEventById = async (id, updateBody) => {
    const event = await getEventById(id);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    Object.assign(event, updateBody);
    await event.save();
    return event;
  };
  
  /**
   * Delete event by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  const deleteEventById = async (id) => {
    const event = await getEventById(id);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    await event.remove();
    return event;
  };


module.exports = {
    createEvent,
    queryEvents,
    getEventById,
    updateEventById,
    deleteEventById
};  
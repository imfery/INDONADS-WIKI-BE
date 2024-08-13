const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/events.validation');
const eventController = require('../../controllers/events');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router
    .route('/')
    .post(auth('manageEvents'), validate(eventValidation.createEvent), eventController.createEvent)
    .get(validate(eventValidation.getEvents), eventController.getEvents);

router
    .route('/summary')
    .get(validate(eventController.getEventsSummary), catchAsync(eventController.getEventsSummary));

router
    .route('/detail/:id')
    .get(validate(eventValidation.getEventById), eventController.getEventById)
    .patch(auth('manageEvents'), validate(eventValidation.updateEventById), eventController.updateEventById)
    .delete(auth('manageEvents'), validate(eventValidation.deleteEventById), eventController.deleteEventById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Events management and retrieval
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     description: Get a list of all upcoming events.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         default: date
 *         description: Field to sort by (e.g., 'date')
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         default: asc
 *         description: Sort order (either 'asc' or 'desc')
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Number of the page
 *     responses:
 *       '200':
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '404':
 *         description: No events found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create an event
 *     description: Only admins can create events.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /events/summary:
 *   get:
 *     summary: Retrieve a list of events summary
 *     description: Get a summary of recent 10 upcoming events and 3 concluded events.
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: A summary of upcoming and concluded events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 upcomingEvents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                   description: List of upcoming events
 *                 concludedEvents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                   description: List of concluded events
 *       '404':
 *         description: No events found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /events/detail/{id}:
 *   get:
 *     summary: Retrieve a specific event
 *     description: Get details of a specific event by ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A specific event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 * 
 *   patch:
 *     summary: Update a specific event
 *     description: Update the details of a specific event by ID.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 * 
 *   delete:
 *     summary: Delete a specific event
 *     description: Remove an event by ID.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 message:
 *                   type: string
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the event
 *         description:
 *           type: string
 *           description: A brief description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *         image:
 *           type: string
 *           description: URL or path to the event image
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - image
 */

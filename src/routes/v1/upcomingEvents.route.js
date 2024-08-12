const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/upcomingEvents.validation');
const eventController = require('../../controllers/upcomingEvents.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageEvents'), validate(eventValidation.createEvent), eventController.createEvent)
  // .get(auth('getUsers'), validate(eventValidation.getUsers), eventController.getUsers);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(eventValidation.getUser), eventController.getUser)
//   .patch(auth('manageUsers'), validate(eventValidation.updateUser), eventController.updateUser)
//   .delete(auth('manageUsers'), validate(eventValidation.deleteUser), eventController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Events management and retrieval
 */

// /**
//  * @swagger
//  * /events:
//  *   get:
//  *     summary: Retrieve a list of events
//  *     description: Get a list of all upcoming events.
//  *     tags: [Events]
//  *     responses:
//  *       '200':
//  *         description: A list of events
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Event'
//  *       '404':
//  *         description: No events found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                 message:
//  *                   type: stringz
//  */

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

// /**
//  * @swagger
//  * /events/{id}:
//  *   get:
//  *     summary: Retrieve a specific event
//  *     description: Get details of a specific event by ID.
//  *     tags: [Events]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: A specific event
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Event'
//  *       '404':
//  *         description: Event not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  * 
//  *   put:
//  *     summary: Update a specific event
//  *     description: Update the details of a specific event by ID.
//  *     tags: [Events]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Event'
//  *     responses:
//  *       '200':
//  *         description: Event updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Event'
//  *       '400':
//  *         description: Invalid input
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  *       '404':
//  *         description: Event not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  * 
//  *   delete:
//  *     summary: Delete a specific event
//  *     description: Remove an event by ID.
//  *     tags: [Events]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '204':
//  *         description: Event deleted successfully
//  *       '404':
//  *         description: Event not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  */

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

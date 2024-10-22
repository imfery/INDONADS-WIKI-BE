const express = require('express');
const auth = require('../../middlewares/auth'); // Authentication middleware
const validate = require('../../middlewares/validate'); // Validation middleware
const monadMadnessValidation = require('../../validations/monadMadness.validation');
const monadMadnessController = require('../../controllers/monadMadness.controller');

const router = express.Router();

router
    .route('/')
    .get(validate(monadMadnessValidation.getAllMonadMadness), monadMadnessController.getAllMonadMadness)
    .post(
        auth('manageMadness'),
        validate(monadMadnessValidation.createMonadMadness),
        monadMadnessController.createMonadMadness
    );

router
    .route('/:id')
    .get(validate(monadMadnessValidation.getMonadMadnessById), monadMadnessController.getMonadMadnessById)
    .patch(
        auth('manageMadness'),
        validate(monadMadnessValidation.updateMonadMadnessById),
        monadMadnessController.updateMonadMadnessById
    )
    .delete(
        auth('manageMadness'),
        validate(monadMadnessValidation.deleteMonadMadnessById),
        monadMadnessController.deleteMonadMadnessById
    );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: MonadMadness
 *   description: Monad Madness management
 */

/**
 * @swagger
 * /monad-madness:
 *   get:
 *     summary: Get all Monad Madness entries
 *     description: Retrieve a list of all Monad Madness entries. Optional pagination and sorting can be applied using query parameters.
 *     tags: [MonadMadness]
 *     parameters:
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           example: createdAt
 *         description: The field to sort by (e.g., 'title', 'createdAt', etc.)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *         description: The sort order (either 'asc' for ascending or 'desc' for descending)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The maximum number of results per page. Leave empty for no pagination.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve. Leave empty for no pagination.
 *     responses:
 *       200:
 *         description: Successfully retrieved all entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: tes
 *                       description:
 *                         type: string
 *                         example: tes
 *                       image:
 *                         type: string
 *                         example: tes
 *                       twitter:
 *                         type: string
 *                         example: tes
 *                       website:
 *                         type: string
 *                         example: tes
 *                 timestamps:
 *                   type: number
 *                   example: 1727702361
 *       400:
 *         description: Bad request due to invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /monad-madness/{id}:
 *   get:
 *     summary: Get a Monad Madness entry by ID
 *     description: Retrieve a specific Monad Madness entry by its ID.
 *     tags: [MonadMadness]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Monad Madness entry to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Entry Title"
 *                     description:
 *                       type: string
 *                       example: "Entry description"
 *                     image:
 *                       type: string
 *                       example: "Entry image"
 *                     twitter:
 *                       type: string
 *                       example: "Entry twitter"
 *                     website:
 *                       type: string
 *                       example: "Entry website"
 *       404:
 *         description: Entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entry not found"
 */

/**
 * @swagger
 * /monad-madness:
 *   post:
 *     summary: Create a Monad Madness entry
 *     description: Create a new entry for Monad Madness.
 *     tags: [MonadMadness]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "tes"
 *                 required: true
 *               description:
 *                 type: string
 *                 example: "tes"
 *                 required: true
 *               image:
 *                 type: string
 *                 example: "tes"
 *                 required: true
 *               twitter:
 *                 type: string
 *                 example: "tes"
 *                 required: true
 *               website:
 *                 type: string
 *                 example: "tes"
 *                 required: true
 *               location:
 *                 type: string
 *                 example: "Bangkok"
 *     responses:
 *       201:
 *         description: Entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Entry created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "tes"
 *                     description:
 *                       type: string
 *                       example: "tes"
 *                     image:
 *                       type: string
 *                       example: "tes"
 *                     twitter:
 *                       type: string
 *                       example: "tes"
 *                     website:
 *                       type: string
 *                       example: "tes"
 *               location:
 *                 type: string
 *                 example: "Bangkok"
 */

/**
 * @swagger
 * /monad-madness/{id}:
 *   patch:
 *     summary: Update a Monad Madness entry
 *     description: Update an existing Monad Madness entry by ID.
 *     tags: [MonadMadness]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Monad Madness entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               image:
 *                 type: string
 *                 example: "Updated image"
 *               twitter:
 *                 type: string
 *                 example: "Updated twitter"
 *               website:
 *                 type: string
 *                 example: "Updated website"
 *     responses:
 *       200:
 *         description: Successfully updated the entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Entry updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     description:
 *                       type: string
 *                       example: "Updated description"
 *                     image:
 *                       type: string
 *                       example: "Updated image"
 *                     twitter:
 *                       type: string
 *                       example: "Updated twitter"
 *                     website:
 *                       type: string
 *                       example: "Updated website"
 */

/**
 * @swagger
 * /monad-madness/{id}:
 *   delete:
 *     summary: Delete a Monad Madness entry
 *     description: Delete a Monad Madness entry by ID.
 *     tags: [MonadMadness]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Monad Madness entry to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the entry
 */

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const spacesValidation = require('../../validations/spaces.validation');
const spacesController = require('../../controllers/spaces.controller');

const router = express.Router();

router
    .route('/')
    .get(validate(spacesValidation.getAllSpaces), spacesController.getAllSpaces)
    .post(auth('manageSpaces'), validate(spacesValidation.createSpace), spacesController.createSpace);

router
    .route('/:id')
    .get(validate(spacesValidation.getSpaceById), spacesController.getSpaceById)
    .patch(auth('manageSpaces'), validate(spacesValidation.updateSpaceById), spacesController.updateSpaceById)
    .delete(auth('manageSpaces'), validate(spacesValidation.deleteSpaceById), spacesController.deleteSpaceById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Spaces
 *   description: Spaces management
 */

/**
 * @swagger
 * /spaces:
 *   get:
 *     summary: Get all spaces entries
 *     description: Retrieve a list of all spaces entries. Sorting can be applied using query parameters.
 *     tags: [Spaces]
 *     parameters:
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           example: createdAt
 *         description: The field to sort by (e.g., 'category', 'createdAt', etc.)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *         description: The sort order (either 'asc' for ascending or 'desc' for descending)
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
 *                       category:
 *                         type: string
 *                         example: "INDONADS AMA"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                               example: "Segalanya Tentang Monad"
 *                             url:
 *                               type: string
 *                               example: "https://x.com/indonads_/status/1748323108975743401?s=46&t=RElNKQgCEl-H3JnaVv9pyg"
 *                 timestamps:
 *                   type: integer
 *                   example: 1727702361
 *       400:
 *         description: Bad request due to invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Create a space entry
 *     description: Create a new entry for spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "INDONADS AMA"
 *                 required: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Segalanya Tentang Monad"
 *                     url:
 *                       type: string
 *                       example: "https://x.com/indonads_/status/1748323108975743401?s=46&t=RElNKQgCEl-H3JnaVv9pyg"
 *     responses:
 *       201:
 *         description: Space entry created successfully
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
 *                     category:
 *                       type: string
 *                       example: "INDONADS AMA"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "Segalanya Tentang Monad"
 *                           url:
 *                             type: string
 *                             example: "https://x.com/indonads_/status/1748323108975743401?s=46&t=RElNKQgCEl-H3JnaVv9pyg"
 *       400:
 *         description: Bad request due to invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *     summary: Get a space entry by ID
 *     description: Retrieve a specific space entry by its ID.
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the space entry to retrieve
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
 *                     category:
 *                       type: string
 *                       example: "INDONADS AMA"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "Segalanya Tentang Monad"
 *                           url:
 *                             type: string
 *                             example: "https://x.com/indonads_/status/1748323108975743401?s=46&t=RElNKQgCEl-H3JnaVv9pyg"
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /spaces/{id}:
 *   patch:
 *     summary: Update a space entry
 *     description: Update an existing space entry by ID.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the space entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Updated Category"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     url:
 *                       type: string
 *                       example: "Updated URL"
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
 *                     category:
 *                       type: string
 *                       example: "Updated Category"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "Updated Title"
 *                           url:
 *                             type: string
 *                             example: "Updated URL"
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Delete a space entry
 *     description: Delete a space entry by ID.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []  # Bearer authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the space entry to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the entry
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

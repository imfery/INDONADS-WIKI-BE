const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const articlesValidation = require('../../validations/articles.validation');
const articlesController = require('../../controllers/articles.controller');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router
    .route('/')
    .post(auth('manageArticles'), validate(articlesValidation.createArticles), catchAsync(articlesController.createArticles))
    .get(validate(articlesValidation.getArticles), catchAsync(articlesController.getArticles));

router
    .route('/latest')
    .get(validate(articlesValidation.getLatestArticles), catchAsync(articlesController.getLatestArticles));

router
    .route('/:id')
    .get(validate(articlesValidation.getArticlesById), catchAsync(articlesController.getArticlesById))
    .patch(
        auth('manageArticles'),
        validate(articlesValidation.updateArticlesById),
        catchAsync(articlesController.updateArticlesById)
    )
    .delete(
        auth('manageArticles'),
        validate(articlesValidation.deleteArticlesById),
        catchAsync(articlesController.deleteArticlesById)
    );

module.exports = router;

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     description: Get a list of all articles items.
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: desc
 *           description: Sort order (either 'asc' or 'desc')
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *           description: Maximum number of articles items
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           description: Page number
 *     responses:
 *       '200':
 *         description: A list of articles items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articles'
 *       '404':
 *         description: No articles found
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
 * /articles:
 *   post:
 *     summary: Create a articles item
 *     description: Only admins can create articles items.
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the articles item
 *               summary:
 *                 type: string
 *                 description: A brief summary of the articles item
 *               content:
 *                 type: string
 *                 description: Full content of the articles item, stored as JSON blocks for Editor.js
 *               category:
 *                 type: string
 *                 enum: [ArticlesCategoryEnumValues]
 *                 description: Category of the articles item
 *               isActive:
 *                 type: boolean
 *                 description: Is the articles item active
 *             required:
 *               - title
 *               - summary
 *               - content
 *               - category
 *     responses:
 *       '201':
 *         description: Articles item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
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
 * /articles/latest:
 *   get:
 *     summary: Retrieve the latest articles
 *     description: Get the latest articles items.
 *     tags: [Articles]
 *     responses:
 *       '200':
 *         description: A list of the latest articles items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articles'
 *       '404':
 *         description: No articles found
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
 * /articles/{id}:
 *   get:
 *     summary: Retrieve a specific articles item
 *     description: Get details of a specific articles item by ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A specific articles item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       '404':
 *         description: Articles item not found
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
 *     summary: Update a specific articles item
 *     description: Update the details of a specific articles item by ID.
 *     tags: [Articles]
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
 *             $ref: '#/components/schemas/Articles'
 *     responses:
 *       '200':
 *         description: Articles item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
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
 *         description: Articles item not found
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
 *     summary: Delete a specific articles item
 *     description: Remove a articles item by ID.
 *     tags: [Articles]
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
 *         description: Articles item deleted successfully
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
 *         description: Articles item not found
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
 *     Articles:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the articles item
 *         summary:
 *           type: string
 *           description: A brief summary of the articles item
 *         content:
 *           type: string
 *           description: Full content of the articles item, stored as JSON blocks for Editor.js
 *         category:
 *           type: string
 *           enum: [ArticlesCategoryEnumValues]
 *           description: Category of the articles item
 *         isActive:
 *           type: boolean
 *           description: Is the articles item active
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the articles item
 *         updatedBy:
 *           type: string
 *           description: The ID of the user who last updated the articles item
 *       required:
 *         - title
 *         - summary
 *         - content
 *         - category
 *       example:
 *         title: "Breaking Articles"
 *         summary: "Summary of the breaking articles"
 *         content: "[{\"type\":\"header\",\"data\":{\"text\":\"Breaking Articles\",\"level\":2}}]"
 *         category: "Politics"
 *         isActive: false
 */

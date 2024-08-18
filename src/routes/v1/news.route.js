const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const newsValidation = require('../../validations/news.validation');
const newsController = require('../../controllers/news.controller');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router
    .route('/')
    .post(auth('manageNews'), validate(newsValidation.createNews), catchAsync(newsController.createNews))
    .get(validate(newsValidation.getNews), catchAsync(newsController.getNews));

router.route('/latest').get(validate(newsValidation.getLatestNews), catchAsync(newsController.getLatestNews));

router
    .route('/:id')
    .get(validate(newsValidation.getNewsById), catchAsync(newsController.getNewsById))
    .patch(auth('manageNews'), validate(newsValidation.updateNewsById), catchAsync(newsController.updateNewsById))
    .delete(auth('manageNews'), validate(newsValidation.deleteNewsById), catchAsync(newsController.deleteNewsById));

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management and retrieval
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Retrieve a list of news
 *     description: Get a list of all news items.
 *     tags: [News]
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
 *           description: Maximum number of news items
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           description: Page number
 *     responses:
 *       '200':
 *         description: A list of news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       '404':
 *         description: No news found
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
 * /news:
 *   post:
 *     summary: Create a news item
 *     description: Only admins can create news items.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       '201':
 *         description: News item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
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
 * /news/latest:
 *   get:
 *     summary: Retrieve the latest news
 *     description: Get the latest news items.
 *     tags: [News]
 *     responses:
 *       '200':
 *         description: A list of the latest news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       '404':
 *         description: No news found
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
 * /news/{id}:
 *   get:
 *     summary: Retrieve a specific news item
 *     description: Get details of a specific news item by ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A specific news item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       '404':
 *         description: News item not found
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
 *     summary: Update a specific news item
 *     description: Update the details of a specific news item by ID.
 *     tags: [News]
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
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       '200':
 *         description: News item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
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
 *         description: News item not found
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
 *     summary: Delete a specific news item
 *     description: Remove a news item by ID.
 *     tags: [News]
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
 *         description: News item deleted successfully
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
 *         description: News item not found
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
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the news item
 *         summary:
 *           type: string
 *           description: A brief summary of the news item
 *         content:
 *           type: string
 *           description: Full content of the news item, with formatting
 *         coverImageUrl:
 *           type: string
 *           description: URL or path to the cover image of the news item
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             enum: [NewsTagEnumValues]
 *           description: Tags associated with the news item
 *         category:
 *           type: string
 *           enum: [NewsCategoryEnumValues]
 *           description: Category of the news item
 *       required:
 *         - title
 *         - summary
 *         - content
 *         - coverImageUrl
 *         - tags
 *         - category
 *       example:
 *         title: "Breaking News"
 *         summary: "Summary of the breaking news"
 *         content: "Full content of the breaking news"
 *         coverImageUrl: "http://example.com/image.jpg"
 *         tags: ["Breaking", "Urgent"]
 *         category: "Politics"
 */

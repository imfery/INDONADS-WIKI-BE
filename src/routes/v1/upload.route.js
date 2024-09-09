const express = require('express');

const auth = require('../../middlewares/auth');
const upload = require('../../models/upload.model');
const { uploadImageToGCS } = require('../../services/upload.service');
const { validateUpload } = require('../../validations/upload.validation');

const router = express.Router();

router.route('/').post(auth('manageArticles'), upload.single('file'), validateUpload, async (req, res) => {
    try {
        const fileUrl = await uploadImageToGCS(req.file);
        res.json({
            success: 1,
            file: {
                url: fileUrl,
            },
        });
    } catch (error) {
        res.status(500).json({ success: 0, message: error.message });
    }
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload and management
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image to Google Cloud Storage
 *     description: Uploads an image file to Google Cloud Storage and returns the file URL.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Successfully uploaded the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 file:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "https://www.example.com/path/to/image.jpg"
 *                       description: URL of the uploaded image
 *                     width:
 *                       type: integer
 *                       example: 800
 *                       description: Width of the uploaded image
 *                     height:
 *                       type: integer
 *                       example: 600
 *                       description: Height of the uploaded image
 *       400:
 *         description: Bad request, possibly due to validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Invalid file type"
 *       500:
 *         description: Internal server error, possibly due to upload failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Failed to upload the image"
 */

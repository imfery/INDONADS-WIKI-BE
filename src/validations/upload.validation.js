const Joi = require('joi');

// Define the validation schema for the uploaded file
const uploadSchema = Joi.object({
    file: Joi.object({
        mimetype: Joi.string().required().valid('image/jpeg', 'image/png', 'image/gif'), // Valid file types
        size: Joi.number().max(7 * 1024 * 1024), // Maximum file size of 5MB
    })
        .unknown(true)
        .required(),
});

// Middleware function to validate the request
const validateUpload = (req, res, next) => {
    const { error } = uploadSchema.validate({ file: req.file });

    if (error) {
        return res.status(400).json({
            success: 0,
            message: error.details[0].message,
        });
    }

    next();
};

module.exports = {
    validateUpload,
};

const multer = require('multer');

// Store file in memory temporarily
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Example: limit file size to 5MB
});

module.exports = upload;

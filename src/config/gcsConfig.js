/* eslint-disable prettier/prettier */
const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config(); // Import dotenv to read .env variables

// Retrieve environment variables
const serviceKey = path.join(__dirname, process.env.GOOGLE_CLOUD_KEYFILE_PATH);
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// Create a Google Cloud Storage client
const storage = new Storage({
    keyFilename: serviceKey,
    projectId,
});

const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };

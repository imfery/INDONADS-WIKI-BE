const { Storage } = require('@google-cloud/storage');
require('dotenv').config(); // Import dotenv to read .env variables

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

const jsonData = JSON.parse(process.env.GCS_JSON);

const storage = new Storage({
    credentials: jsonData,
    projectId,
});

const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };

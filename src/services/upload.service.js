/* eslint-disable prettier/prettier */
const path = require('path');
const uuid = require('uuid').v4;
const { bucket } = require('../config/gcsConfig'); // Use the bucket from gcsConfig.js

const uploadImageToGCS = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const blob = bucket.file(uuid() + path.extname(file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
      gzip: true,
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      await blob.makePublic();
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = {
  uploadImageToGCS,
};

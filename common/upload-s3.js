const AWS = require('aws-sdk');

const uploadToS3 = async (file, tags) => {
  const BUCKET_NAME = process.env.BACKUP_BUCKET || '2myvillage';
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID || 'AKIASUIGPSY3PRLNN34E',
    secretAccessKey:
      process.env.AWS_SECRET || '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',
  });

  const fileName = file.name && file.name.split(' ').join('-');
  const fileTags = Array.isArray(tags) ? tags.join('/') : tags;

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${fileTags}/${Date.now()}-${fileName}`,
    Body: file.data,
    CacheControl: 'max-age=31536000',
    Tagging: fileTags,
  };

  return s3.upload(params).promise();
};

module.exports = uploadToS3;

const AWS = require('aws-sdk');

const uploadToS3 = async (file, tags, isBase64) => {
  const BUCKET_NAME = process.env.BACKUP_BUCKET || '2myvillage';
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID || 'AKIASUIGPSY3K5YGQTJV',
    secretAccessKey:
      process.env.AWS_SECRET || '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',
  });

  let body = '';
  let fileName = '';
  
  if (!isBase64) {
    fileName = file.name && file.name.split(' ').join('-');
    body = file.data;
  } else {
    fileName = `${Date.now()}`;
    body = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  }

  const fileTags = Array.isArray(tags) ? tags.join('/') : tags;

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${fileTags}/${Date.now()}-${fileName}`,
    Body: body,
    CacheControl: 'max-age=31536000',
    Tagging: fileTags,
  };

  return s3.upload(params).promise();
};

module.exports = uploadToS3;

const redis = require('redis');

const redisInfo =
  process.env.NODE_ENV === 'staging'
    ? { url: process.env.REDIS_URL }
    : { host: '127.0.0.1', port: 6379 };

const pubClient = redis.createClient(redisInfo);

pubClient.on('error', (err) => console.log(err));

module.exports = pubClient;

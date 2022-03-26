const redis = require('redis');

const redisInfo =
  process.env.NODE_ENV === 'staging'
    ? process.env.REDIS_URL
    : { host: '127.0.0.1', port: 6379 };
    
const pubClient = redis.createClient(redisInfo);

module.exports = pubClient;

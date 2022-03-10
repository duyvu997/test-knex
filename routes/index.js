const Router = require('express-promise-router');
const router = new Router();
const userRoutes = require('./user');
const uploadRoutes = require('./upload');
const metaRoutes = require('./metadata');

router.use('/users', userRoutes);
router.use('/', uploadRoutes);
router.use('/', metaRoutes);

module.exports = () => router;

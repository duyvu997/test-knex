const Router = require('express-promise-router');
const router = new Router();
const userRoutes = require('./user');
const uploadRoutes = require('./upload');
const metaRoutes = require('./metadata');
const conversationRoutes = require('./conversation');
const planRoutes = require('./plan');
const tripRoutes = require('./trip');

router.use('/users', userRoutes);
router.use('/conversations', conversationRoutes);
router.use('/plans', planRoutes);
router.use('/trips', tripRoutes);
router.use('/', uploadRoutes);
router.use('/', metaRoutes);

module.exports = () => router;

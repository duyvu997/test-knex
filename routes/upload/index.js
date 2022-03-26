const Router = require('express-promise-router');
const controller = require('./upload-controller');
const { authenticate } = require('../../middlewares/authentication');

const router = new Router();

router.post('/uploads', authenticate, controller.upload);
router.post('/uploadsv2', controller.uploadBase64);

module.exports = router;

const storyController = require('./story-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.get('/:storyId', storyController.getById);
router.post('/', authenticate, storyController.create);
router.patch('/:storyId', authenticate, storyController.update);
router.get('/', storyController.getAll);

module.exports = router;

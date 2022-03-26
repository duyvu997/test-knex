const conversationController = require('./conversation-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:conversationId/messages', conversationController.getAllMessages);
router.get('/:conversationId', conversationController.getById);

module.exports = router;

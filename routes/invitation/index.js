const invitationController = require('./invitation-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:invitationId', invitationController.getById);

module.exports = router;

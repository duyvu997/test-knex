const invitationController = require('./invitation-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.get('/:invitationId', invitationController.getById);
router.get('/', invitationController.getAll);
router.post('/', authenticate, invitationController.create);

module.exports = router;

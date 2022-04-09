const planController = require('./plan-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.get('/:planId', planController.getById);
router.get('/', planController.getAll);
router.post('/', planController.create);
router.post('/:planId/initiative', authenticate,  planController.initTrip);
router.patch('/:planId', planController.update);
router.delete('/:planId', planController.getById);

module.exports = router;

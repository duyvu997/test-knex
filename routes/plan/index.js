const planController = require('./plan-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:planId', planController.getById);
router.get('/', planController.getAll);
router.post('/', planController.create);
router.patch('/:planId', planController.update);
router.delete('/:planId', planController.getById);

module.exports = router;

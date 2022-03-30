const planController = require('./plan-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:planId', planController.getById);
router.post('/', planController.create);
router.put('/:planId', planController.getById);
router.delete('/:planId', planController.getById);

module.exports = router;

const villageController = require('./village-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:villageId', villageController.getById);
router.get('/', villageController.getAll);
router.post('/', villageController.create);
router.patch('/:villageId', villageController.update);
router.delete('/:villageId', villageController.deleteVillage);

module.exports = router;

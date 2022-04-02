const tripController = require('./trip-controller');
const Router = require('express-promise-router');
const router = new Router();

router.get('/:tripId', tripController.getById);

module.exports = router;

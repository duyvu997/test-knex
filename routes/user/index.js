const userController = require('./user-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.get('/me', authenticate, userController.getUsers);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;

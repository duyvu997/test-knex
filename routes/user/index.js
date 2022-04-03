const userController = require('./user-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.put('/', authenticate, userController.update);
router.get('/', authenticate, userController.getAll);
router.get('/:userId', authenticate, userController.getById);
router.get('/:userId/stories', authenticate, userController.getUserStories);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;

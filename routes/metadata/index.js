const Router = require('express-promise-router');
const metadata = require('./data');
const router = new Router();

router.get('/metadata', (req, res) => {
  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: metadata,
  });
});

module.exports = router;

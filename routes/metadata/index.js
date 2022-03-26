const Router = require('express-promise-router');
const metadata = require('./data');
const homePageData = require('./home-data.json');
const router = new Router();

router.get('/metadata', (req, res) => {
  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: metadata,
  });
});

router.get('/home', (req, res) => {
  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: homePageData,
  });
});

module.exports = router;

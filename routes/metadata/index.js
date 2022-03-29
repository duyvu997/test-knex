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
  const { stories, trip_invitations } = homePageData;
  const story = stories.map((st) => ({ ...st, type: 'STORY' }));
  const invite = trip_invitations.map((inv) => ({
    ...inv,
    type: 'INVITATION',
  }));
  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: [...story, ...invite],
  });
});

module.exports = router;

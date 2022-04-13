const Router = require('express-promise-router');
const metadata = require('./data');
const router = new Router();
const storyService = require('../story/story-service');
const invitationService = require('../invitation/invitation-service');

router.get('/metadata', (req, res) => {
  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: metadata,
  });
});

router.get('/home', async (req, res) => {
  let result = [];
  const stor = await storyService.getAll();
  const invitations = await invitationService.getAll();
  const minLength =
    stor.length < invitations.length ? stor.length : invitations.length;
  const isInvitationLonger = stor.length < invitations.length;

  const a = stor.length >= 2;
  if (invitations.length && stor.length) {
    for (let i = 0; i < invitations.length + stor.length - 1; i++) {
      if (i < minLength) {
        const abc =
          i % 2 === 0 && isInvitationLonger
            ? { ...stor[i], type: 'STORY' }
            : { ...invitations[i], type: 'INVITATION' };
        if (abc.id) {
          result.push(abc);
        }
      }
      const abc = isInvitationLonger
        ? { ...invitations[i], type: 'INVITATION' }
        : { ...stor[i], type: 'STORY' };
      if (abc.id) {
        result.push(abc);
      }
    }
  }
  if (!stor.length) {
    result = invitations.map((invitation) => ({
      ...invitation,
      type: 'INVITATION',
    }));
  }
  if (!invitations.length) {
    result = stor.map((story) => ({
      ...story,
      type: 'STORY',
    }));
  }

  return res.status(200).send({
    ok: true,
    message: 'succeed',
    data: result,
  });
});

module.exports = router;

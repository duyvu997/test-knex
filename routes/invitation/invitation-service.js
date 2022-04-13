const { createError, BAD_REQUEST } = require('../../common/error-utils');
const { Invitation } = require('../../models');
const cuid = require('cuid');

const getById = async (invitationId) => {
  const result = await Invitation.getById(invitationId);
  if (!result) {
    throw createError(BAD_REQUEST, 'invitation not found');
  }
  return result;
};

const create = async (invitationData, user) => {
  const { trip_id } = invitationData;
  const id = cuid();
  let date = new Date(); // Now
  date.setDate(date.getDate() + 30); // Set now + 30 days as the new date

  return Invitation.create({
    id,
    trip_id,
    created_by: user.userId,
    status: 'open',
    exprired_at: date,
  });
};

const getAll = async () => {
  const result = await Invitation.findAll();
  if (!result) {
    throw createError(BAD_REQUEST, 'invitation not found');
  }
  return result;
};


module.exports = {
  getById,
  create,
  getAll,
};

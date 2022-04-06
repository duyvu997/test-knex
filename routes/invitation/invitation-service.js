const { createError, BAD_REQUEST } = require('../../common/error-utils');
const { Invitation } = require('../../models');

const getById = async (invitationId) => {
  const result = await Invitation.getById(invitationId);
  if (!result) {
    throw createError(BAD_REQUEST, 'invitation not found');
  }
  return result;
};

module.exports = {
  getById,
};

const { Story } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');

const getById = async (caller, targetUser) => {
  const stories =
    String(caller) === String(targetUser)
      ? await getMyStories(caller)
      : await getOtherStories(targetUser);

  if (!stories) {
    throw createError(NOT_FOUND, 'storis not found');
  }

  return stories;
};

// --------- support funcs -----------

const getMyStories = async (userId) => {
  return Story.getByUserById(userId);
};

const getOtherStories = async (userId) => {
  return Story.getByUserById(userId);
};

module.exports = {
  getById,
};

const { Story, Trip } = require('../../models');
const {
  createError,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../../common/error-utils');
const userService = require('../user/user-service');
const { use } = require('bcrypt/promises');

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

const getStoryDetail = async (storyId) => {
  const story = await Story.findOne({ id: storyId });
  if (!story) {
    throw createError(BAD_REQUEST, 'story not found');
  }

  return {
    ...story,
    sections: story.sections && JSON.parse(story.sections),
    publisher: story.publisher && JSON.parse(story.publisher),
  };
};

const create = async (user, story) => {
  const { trip_id } = story;
  const trip = await Trip.findOne({ id: trip_id });
  if (!trip) {
    throw createError(BAD_REQUEST, 'trip not found');
  }
  const userInDB = await userService.getById(user.userId, user.userId);

  const storyToBeCreated = {
    ...story,
    publisher: JSON.stringify(userInDB),
    sections: JSON.stringify(story.sections),
  };

  return Story.create(storyToBeCreated);
};

const update = async (user, storyId, story) => {
  const { trip_id, title, background, sections } = story;
  const storySaved = await Story.findOne({ id: storyId });
  if (!storySaved) {
    throw createError(BAD_REQUEST, 'story not found');
  }
  if (trip_id) {
    const trip = await Trip.findOne({ id: trip_id });
    if (!trip) {
      throw createError(BAD_REQUEST, 'trip not found');
    }
  }

  const storyToBeUpdated = {
    title,
    background,
    trip_id,
    sections: sections ? JSON.stringify(story.sections) : storySaved.sections,
  };

  return Story.update(storyId, storyToBeUpdated);
};

const getAll = async () => {
  const stories = await Story.find({});
  console.log(stories);
  const result = stories.map((story) => ({
    ...story,
    publisher: story.publisher ? JSON.parse(story.publisher) : null,
    sections: story.sections ? JSON.parse(story.sections) : null,
  }));
  console.log(result);
  return result;
};

// --------- support funcs -----------

const getMyStories = async (userId) => {
  return Story.getByUserById(userId);
};

const getOtherStories = async (userId) => {
  return Story.getByUserById(userId);
};

module.exports = {
  getStoryDetail,
  getById,
  create,
  update,
  getAll,
};

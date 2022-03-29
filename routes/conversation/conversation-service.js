const { Message, Conversation } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');
const userSerive = require('../user/user-service');

const getConversationMessages = async (conversationId) => {
  await getById(conversationId);

  return Message.findAll({ conversation_id: conversationId });
};

const saveMessage = async ({ conversationId, content, sender, type }) => {
  return Message.create({
    conversation_id: conversationId,
    content,
    sender,
    type,
  });
};

const addMember = async (user, conversationId) => {
  const conversation = await getById(conversationId);
  const members =
    (conversation.members && conversation.members.map((mem) => mem.id)) || [];

  if (!members.includes(user.id.toString())) {
    const newMem = {
      id: user.id,
      name: user.name || '',
      username: user.username,
      avatar: (user.photos && user.photos[0]) || '',
    };
    const temp = conversation.members
      ? [...conversation.members, newMem]
      : [newMem];

    const newMembers = temp.map((mem) => JSON.stringify(mem));

    return Conversation.update(conversationId, {
      members: newMembers,
    });
  }
  return;
};

const getById = async (conversationId) => {
  const conversation = await Conversation.findOne({ id: conversationId });
  if (!conversation) {
    throw createError(NOT_FOUND, 'conversation not found');
  }

  const memberIds =
    conversation.members &&
    conversation.members.map((mem) => {
      const temp = JSON.parse(mem);
      return temp.id;
    });

  const users = await userSerive.findAllUserIn(memberIds);

  const members = users.map((user) => ({
    username: user.username || '',
    id: user.id,
    name: user.name || '',
    avatar: user.photos && user.photos[0],
  }));

  return { ...conversation, members };
};

module.exports = {
  getConversationMessages,
  saveMessage,
  addMember,
  getById,
};

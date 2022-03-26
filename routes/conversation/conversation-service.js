const { Message, Conversation } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');

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

  const members = conversation.members.map((mem) => mem.id);

  if (!members.includes(user.id.toString())) {
    const newMem = {
      id: user.id,
      username: user.username,
      avatar: (user.photos && user.photos[0]) || '',
    };

    const newMembers = [...conversation.members, newMem].map((mem) =>
      JSON.stringify(mem)
    );

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
  const members =
    conversation.members && conversation.members.map((mem) => JSON.parse(mem));
  return { ...conversation, members };
};

module.exports = {
  getConversationMessages,
  saveMessage,
  addMember,
  getById,
};

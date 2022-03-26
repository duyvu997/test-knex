const conversationService = require('../routes/conversation/conversation-service');
const userService = require('../routes/user/user-service');

function onConnection(socket, io, redis) {
  console.log(
    `===connect: connection ${socket.id} - ${new Date().toISOString()}`
  );

  socket.on('join-conversation', async (conversationData) => {
    const { conversationId, userId } = JSON.parse(conversationData) || {};

    const user = (await userService.getById(userId, userId)) || {};
    await conversationService.addMember(user, conversationId);

    socket.join(conversationId);
    socket.to(conversationId).emit('user-joined', { user });
  });

  socket.on('message', async (messageData) => {
    const {
      conversationId = '',
      content = '',
      isImage = false,
      isVideo = false,
      sendingSocketId = '',
      userId = '',
    } = JSON.parse(messageData || {});

    console.log(`===onMessage: ${messageData}`);

    const user = (await userService.getById(userId, userId)) || {};

    await conversationService.saveMessage({
      conversationId,
      content,
      sender: user.id,
      type: 'text',
    });

    socket
      .to(conversationId)
      .except(sendingSocketId)
      .emit('message', { sender: user.id, content, conversationId });
  });

  socket.on('error', (error) => {
    console.log(`===error: ${error}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`===disconnect: socket disconnect cause: ${reason}`);
  });
}

const initSocket = (io) => {
  const redisAdapter = require('@socket.io/redis-adapter');
  const pubClient = require('./redis');
  const subClient = pubClient.duplicate();

  io.adapter(redisAdapter(pubClient, subClient));

  io.on('connection', (client) => {
    onConnection(client, io, pubClient);
  });

  io.of('/').adapter.on('join-room', (room, id) => {
    console.log(`===join-room : socket ${id} has joined room ${room}`);
  });
};

module.exports = initSocket;

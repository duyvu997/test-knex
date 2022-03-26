const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const Server = require('http').Server;
const gRedis = require('./socket/redis');
const initSocket = require('./socket');
const socketio = require('socket.io');
require('dotenv').config();

const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(fileupload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(routes());
app.use(errorHandler.all);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const server = new Server(app);
const io = socketio(server);

const initServer = async () => {
  await gRedis.connect();
  gRedis.flushAll();
};

initServer().catch((e) => console.error(e));
initSocket(io)

server.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});

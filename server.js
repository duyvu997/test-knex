const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const Server = require('http').Server;
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

const server = new Server(app);

server.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});

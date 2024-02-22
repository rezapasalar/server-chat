require('dotenv').config();

const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, '127.0.0.1', () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => res.json({'message': 'Hello web socket'}).status(200));

require('./socket/index.js')(server);

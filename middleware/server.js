const express = require('express');
const server = express();
const usersRouter = require('../routers/users.router');
const permissionsRouter = require('../routers/permissions.router');
const userPermissionsRouter = require('../routers/userPermissions.router');

server.use(express.json());
server.use('/users', usersRouter);
server.use('/permissions', permissionsRouter);
server.use('/userPermissions', userPermissionsRouter);

server.get('/', (req, res) => {
    res.send('<h1>Application is online</h1>');
});

module.exports = server;
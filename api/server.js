const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const projectsRouter = require('../projects/projects-router'); 
const studentsRouter = require('../students/students-router'); 
const messagesRouter = require('../messages/messages-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter); 
server.use('/api/projects', authenticate, projectsRouter); 
server.use('/api/students', studentsRouter);
server.use('/api/messages', messagesRouter); 

server.get('/', (req, res) =>{
    res.status(200).json({ api: 'up and running' })
})
module.exports = server;
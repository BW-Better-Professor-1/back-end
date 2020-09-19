const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const projectsRouter = require('../projects/projects-router'); 


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);  //add authenticate to params once you implement it
server.use('/api/projects', projectsRouter); // eventually will want to add authentication 

server.get('/', (req, res) =>{
    res.status(200).json({ api: 'up and running' })
})
module.exports = server;
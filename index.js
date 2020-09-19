require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000; // this can be whatever port you want

server.listen(port, () => {
    console.log(`\n ** Serving on ${port}  ** \n`)
})
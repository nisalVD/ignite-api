const express = require('express');
const bodyParser = require('body-parser');

const server = express();

// Middleware Plugins
server.use(bodyParser())


server.listen(7000, ()=>{
    console.log('Started at http://localhost:7000');
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const server = express();

// Middleware Plugins
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())
server.use(cors())

server.get("/", (req,res) => {
  res.json({ status: "API is running" })
})

server.listen(7000, ()=>{
    console.log('Started at http://localhost:7000');
});
// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');

const server = express();

/* Middleware Plugins */
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: false}));
// initialize passport
server.use(authMiddleware.initialize);
// parse application/json
server.use(bodyParser.json());
server.use(cors());

server.use([
	require('./routes/auth'),
	require('./routes/modules'),
	require('./routes/questions'),
	require('./routes/admin'),
	require('./routes/markings'),
	require('./routes/feed'),
	require('./routes/userDetails'),
]);

server.get('/', authMiddleware.requireJWT, (req, res) => {
	res.json({status: 'API is running'});
});

// Start the server
server.listen(7000, error => {
	if (error) {
		console.error('Error starting', error);
	} else {
		console.log('Server started at http://localhost:7000/');
	}
});

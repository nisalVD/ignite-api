const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGO_URI, {useMongoClient: true})
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch(error => {
		console.log('Error connecting to MongoDB database', error);
	});

module.exports = mongoose;

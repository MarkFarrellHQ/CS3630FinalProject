const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const list = require('./list');

const User = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	displayName: { type: String, required: true },
	userLists: [ list ]
	
});

module.exports = User;
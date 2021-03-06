const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List = new Schema({
	name: { type: String, required: true },
	items: [ { type: String, required: true } ]
});

module.exports = List;
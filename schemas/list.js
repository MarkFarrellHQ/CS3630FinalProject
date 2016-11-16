const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List = new Schema({
	Name: { type: String, required: true },
	ListItems: [ { ItemName: { type: String, required: true } } ]
});

module.exports = List;
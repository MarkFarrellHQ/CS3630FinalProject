const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ListModel = mongoose.model('list');

/* GET users listing. */
router.get('/', (req, res, next) => {
	// Promise.resolve()
	// .then(() => ListModel.find({ }))
	// .then(lists => {
	// 	res.render('list/index', { lists });
	// })
	// .catch(err => next(err));

	ListModel.find({}, (err, lists) => {
		if(err)
			return next(err);
		res.render('list/index', { lists });
	});
	
	
});

router.get('/create', (req, res, next) => {
	res.render('list/create', {});
});

module.exports = router;

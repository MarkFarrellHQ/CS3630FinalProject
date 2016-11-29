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

router.get('/load', (req, res, next) => {
	ListModel.find({}, (err, list) => {
		if(err)
			return next(err);
		console.log(list);
		res.send(list);
		
	});
});

router.post('/api/delete', (req, res, next) => {

	ListModel.find({ _id: req.body.id }).remove().exec();
	// const pk = new mongoose.ObjectId(req.body.id);
	// ListModel.remove({ _id: pk });
});

module.exports = router;

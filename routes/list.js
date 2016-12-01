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
		res.send(list);
		
	});
});

router.get('/edit/:id', (req, res, next) => {
	const pk = req.params.id;
	
	res.render('list/create', { id: pk } );
});

router.get('/getlist/:id', (req, res, next) => {

	ListModel.find({ _id: req.params.id }, (err, list) => {
		if(err)
			return next(err);
		res.send(list);
	});
});

router.post('/api/delete', (req, res, next) => {

	ListModel.find({ _id: req.body.id }).remove().exec();
	// const pk = new mongoose.ObjectId(req.body.id);
	// ListModel.remove({ _id: pk });
});

router.post('/api/save', (req, res, next) => {
	const listId = req.body.listId;
	const listName = req.body.listName;
	const listItems = req.body['listItems[]'];
	if(req.body.operation === 'update'){
		//updating
		ListModel.update({ _id: listId }, { $set: { name: listName, items: listItems } }, (err) => {
			if(err)
				return next(err);
		});
		res.send({ id: listId });
	} else if (req.body.operation === 'save') {
		//saving
		const listToSave = new ListModel({ name: listName, items: listItems });
		listToSave.save(err => {
			if (err)
				return next(err);
		});
		res.send({ id: listToSave._id });
	}
		

});

module.exports = router;

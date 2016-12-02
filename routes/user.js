const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = mongoose.model('user');

router.get('/register', (req, res, next) => {
	res.render('user/register', {});
});

router.get('/login', (req, res, next) => {
	res.render('user/login', {});
});

router.post('/api/save', (req, res, next) => {
	//console.log(req.body);
	const username = req.body.username;
	const password = req.body.username;
	const displayName = req.body.displayName;
	//let hashedPassword;

	//hash the password
	bcrypt.genSalt(8, (err, salt) => {
		if(err)
			return next(err);
		bcrypt.hash(password, salt, (err, hash) => {
			if(err)
				return next(err);
			//save new user
			const userToSave = new UserModel({ username: username, password: hash, displayName: displayName });
			userToSave.save(err => {
				if (err)
					return next(err);
			});

			res.send({ id: userToSave._id });
		});
	});
});

router.post('/api/login', (req, res, next) => {

	UserModel.findOne({ username: req.body.username }, (err, user) => {
		if(!user)
			return next(err);
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(result)
				return res.send({ id: user._id });
			else
				return next(err);
		});
	});
});

module.exports = router;
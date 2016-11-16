var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.render('list/index', {});
});

router.get('/create', (req, res, next) => {
	res.render('list/create', {});
});

module.exports = router;

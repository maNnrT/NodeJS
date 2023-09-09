const Course = require('../models/Courses');
const {
	multipleMongooseToObject
} = require('../../util/mongoose');
class SiteController {
	// GET /
	index(req, res, next) {
		Course.find({})
			.then((courses) => {
				res.render('home', {
					courses: multipleMongooseToObject(courses)
				});
			})
			.catch((err) => next(err));
	}
	// GET /search
	search(req, res) {
		res.render('search');
	}
}

module.exports = new SiteController();

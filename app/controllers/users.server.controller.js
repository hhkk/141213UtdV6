'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);


// hbkk content below here
// content added from C:\utd\141213UtdV6\app\controllers\notes.server.controller.js

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Note = mongoose.model('Note'),
	_ = require('lodash');


/**
 * Note middleware
 */
exports.userByID = function(req, res, next, id) {
	Note.findById(id).populate('user', 'displayName').exec(function(err, note) {
		if (err) return next(err);
		if (! note) return next(new Error('Failed to load Note ' + id));
		req.note = note ;
		next();
	});
};

//
//
//
//
//function hbkk()
//{
//	var re = new RegExp(query.name);
//	query.name = re;
//	Ustodo.find(query).sort('-created').populate('user', 'displayName').exec(function(err, ustodos) {
//		if (err) {
//			return res.status(400).send({
//				message: errorHandler.getErrorMessage(err)
//			});
//		} else {
//			res.jsonp(ustodos);
//		}
//	});
//
//}
//

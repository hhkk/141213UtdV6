'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Timehk = mongoose.model('Timehk'),
	_ = require('lodash');

/**
 * Create a Timehk
 */
exports.create = function(req, res) {
	var timehk = new Timehk(req.body);
	timehk.user = req.user;

	timehk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timehk);
		}
	});
};

/**
 * Show the current Timehk
 */
exports.read = function(req, res) {
	res.jsonp(req.timehk);
};

/**
 * Update a Timehk
 */
exports.update = function(req, res) {
	var timehk = req.timehk ;

	timehk = _.extend(timehk , req.body);

	timehk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timehk);
		}
	});
};

/**
 * Delete an Timehk
 */
exports.delete = function(req, res) {
	var timehk = req.timehk ;

	timehk.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timehk);
		}
	});
};

/**
 * List of Timehks
 */
exports.list = function(req, res) { 
	Timehk.find().sort('-created').populate('user', 'displayName').exec(function(err, timehks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(timehks);
		}
	});
};

/**
 * Timehk middleware
 */
exports.timehkByID = function(req, res, next, id) { 
	Timehk.findById(id).populate('user', 'displayName').exec(function(err, timehk) {
		if (err) return next(err);
		if (! timehk) return next(new Error('Failed to load Timehk ' + id));
		req.timehk = timehk ;
		next();
	});
};

/**
 * Timehk authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.timehk.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

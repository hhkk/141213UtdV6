'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Rawrecord = mongoose.model('Rawrecord'),
	_ = require('lodash');

/**
 * Create a Rawrecord
 */
exports.create = function(req, res) {
	var rawrecord = new Rawrecord(req.body);
	rawrecord.user = req.user;

	rawrecord.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecord);
		}
	});
};

/**
 * Show the current Rawrecord
 */
exports.read = function(req, res) {
	res.jsonp(req.rawrecord);
};

/**
 * Update a Rawrecord
 */
exports.update = function(req, res) {
	var rawrecord = req.rawrecord ;

	rawrecord = _.extend(rawrecord , req.body);

	rawrecord.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecord);
		}
	});
};

/**
 * Delete an Rawrecord
 */
exports.delete = function(req, res) {
	var rawrecord = req.rawrecord ;

	rawrecord.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecord);
		}
	});
};

/**
 * List of Rawrecords
 */
exports.list = function(req, res) { 
	Rawrecord.find().sort('-created').populate('user', 'displayName').exec(function(err, rawrecords) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecords);
		}
	});
};

/**
 * Rawrecord middleware
 */
exports.rawrecordByID = function(req, res, next, id) { 
	Rawrecord.findById(id).populate('user', 'displayName').exec(function(err, rawrecord) {
		if (err) return next(err);
		if (! rawrecord) return next(new Error('Failed to load Rawrecord ' + id));
		req.rawrecord = rawrecord ;
		next();
	});
};

/**
 * Rawrecord authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rawrecord.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ustodoori = mongoose.model('Ustodoori'),
	_ = require('lodash');

/**
 * Create a Ustodoori
 */
exports.create = function(req, res) {
	var ustodoori = new Ustodoori(req.body);
	ustodoori.user = req.user;

	ustodoori.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodoori);
		}
	});
};

/**
 * Show the current Ustodoori
 */
exports.read = function(req, res) {
	res.jsonp(req.ustodoori);
};

/**
 * Update a Ustodoori
 */
exports.update = function(req, res) {
	var ustodoori = req.ustodoori ;

	ustodoori = _.extend(ustodoori , req.body);

	ustodoori.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodoori);
		}
	});
};

/**
 * Delete an Ustodoori
 */
exports.delete = function(req, res) {
	var ustodoori = req.ustodoori ;

	ustodoori.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodoori);
		}
	});
};

/**
 * List of Ustodooris
 */
exports.list = function(req, res) { 
	Ustodoori.find().sort('-created').populate('user', 'displayName').exec(function(err, ustodooris) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodooris);
		}
	});
};

/**
 * Ustodoori middleware
 */
exports.ustodooriByID = function(req, res, next, id) { 
	Ustodoori.findById(id).populate('user', 'displayName').exec(function(err, ustodoori) {
		if (err) return next(err);
		if (! ustodoori) return next(new Error('Failed to load Ustodoori ' + id));
		req.ustodoori = ustodoori ;
		next();
	});
};

/**
 * Ustodoori authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ustodoori.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

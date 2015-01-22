'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ustodo2 = mongoose.model('Ustodo2'),
	_ = require('lodash');

/**
 * Create a Ustodo2
 */
exports.create = function(req, res) {
	console.log ('in ustodo2s.server.controller.js: create');
	var ustodo2 = new Ustodo2(req.body);
	ustodo2.user = req.user;

	ustodo2.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo2);
		}
	});
};

/**
 * Show the current Ustodo2
 */
exports.read = function(req, res) {
	console.log ('in ustodo2s.server.controller.js: read');
	res.jsonp(req.ustodo2);
};

/**
 * Update a Ustodo2
 */
exports.update = function(req, res) {
	console.log ('in ustodo2s.server.controller.js: update');
	var ustodo2 = req.ustodo2 ;

	ustodo2 = _.extend(ustodo2 , req.body);

	ustodo2.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo2);
		}
	});
};

/**
 * Delete an Ustodo2
 */
exports.delete = function(req, res) {
	var ustodo2 = req.ustodo2 ;
	console.log ('in ustodo2s.server.controller.js: delete ' + ustodo2.toString());

	ustodo2.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo2);
		}
	});
};

/**
 * List of Ustodo2s
 */
exports.list = function(req, res) {
	var query = req.query;
	console.log ('in ustodo2s.server.controller.js: list command [' + query + ']');
	console.log ('ustodo2s user monoid req._passport.session.user: ' + req._passport.session.user);
	Ustodo2.find().sort('-created').populate('user', 'displayName').exec(function(err, ustodo2s) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo2s);
		}
	});
};

/**
 * Ustodo2 middleware
 */
exports.ustodo2ByID = function(req, res, next, id) {
	console.log('in ustodo2ByID id:'+id);
	Ustodo2.findById(id).populate('user', 'displayName').exec(function(err, ustodo2) {
		if (err) return next(err);
		if (! ustodo2) return next(new Error('Failed to load Ustodo2 ' + id));
		req.ustodo2 = ustodo2 ;
		next();
	});
};

/**
 * Ustodo2 authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	console.log ('in ustodo2s.server.controller.js: hasAuthorization');
	if (req.ustodo2.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Command = mongoose.model('Command'),
	_ = require('lodash');

/**
 * Create a Command
 */
exports.create = function(req, res) {
	var command = new Command(req.body);
	command.user = req.user;

	command.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(command);
		}
	});
};

/**
 * Show the current Command
 */
exports.read = function(req, res) {
	res.jsonp(req.command);
};

/**
 * Update a Command
 */
exports.update = function(req, res) {
	var command = req.command ;

	command = _.extend(command , req.body);

	command.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(command);
		}
	});
};

/**
 * Delete an Command
 */
exports.delete = function(req, res) {
	var command = req.command ;

	command.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(command);
		}
	});
};

/**
 * List of Commands
 */
exports.list = function(req, res) { 
	Command.find().sort('-created').populate('user', 'displayName').exec(function(err, commands) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commands);
		}
	});
};

/**
 * Command middleware
 */
exports.commandByID = function(req, res, next, id) { 
	Command.findById(id).populate('user', 'displayName').exec(function(err, command) {
		if (err) return next(err);
		if (! command) return next(new Error('Failed to load Command ' + id));
		req.command = command ;
		next();
	});
};

/**
 * Command authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.command.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

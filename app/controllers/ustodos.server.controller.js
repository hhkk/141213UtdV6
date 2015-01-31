'use strict';


//var UtilClass = require('.././UtilClass');
// console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\controllers
// C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
//var UtilClass = require('../../public/modules/ustodo/UtilClass');
//var UtilNodeVsBrowser = require('../../public/modules/ustodo/UtilNodeVsBrowser');
//C:\utd\141213UtdV6\public\modules\ustodo\UtilClass.js
//C:\utd\141213UtdV6\public\lib\ustodo\UtilClass.js
//C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js



/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ustodo = mongoose.model('Ustodo'),
	_ = require('lodash');

/**
 * Create a Ustodo
 */
exports.create = function(req, res) {
	console.log ('in ustodos.server.controller.js: create');
	var ustodo = new Ustodo(req.body);
	ustodo.user = req.user;

	ustodo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * Show the current Ustodo
 */
exports.read = function(req, res) {
	console.log ('in ustodos.server.controller.js: read');
	res.jsonp(req.ustodo);
};

/**
 * Update a Ustodo        hbkk
 */
exports.update = function(req, res) {
	console.log ('in ustodos.server.controller.js: update');
	var ustodo = req.ustodo ;

	ustodo = _.extend(ustodo , req.body);

	ustodo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * Delete an Ustodo
 */
exports.delete = function(req, res) {
	var ustodo = req.ustodo ;
	console.log ('in ustodos.server.controller.js: delete ' + ustodo.toString());

	ustodo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * List of Ustodos
 */
exports.list = function(req, res) {
	//console.log ('utilclass.getclass of s:' + UtilClass.getClass('hbkk req:', req))
	//console.log ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))
	var query = req.query;
	console.log ('in ustodos.server.controller.js: list command [' + query + ']');
	console.log ('ustodos user monoid req._passport.session.user: ' + req._passport.session.user);
	//54b143dde898903429ce32b1

	try {
		var d = JSON.parse(query.name);
		console.log ('q is json!! [' + query.name + ']');
	} catch (err) {
		console.log ('q is not json!! [' + query.name + '] err [' + err + ']');
	}

	if (!query)
	{
		console.log ('in ustodos.server.controller.js: list, query = null');
		query.name = '';
	}
	else if (query.name === '*')
	{
		console.log ('in ustodos.server.controller.js: list, query.name === *, reseting to nothing');
		query.name = undefined;
	}
	else
	{
		console.log ('in ustodos.server.controller.js: list, query != null');
	}
	console.log ('in ustodos.server.controller.js: list, query: ' + query);
	console.log ('in ustodos.server.controller.js: list, query.name: ' + query.name);
	var re = null;

	try {
		re = new RegExp(query.name);
		console.log ('************************** legal reg exp input query.name [' + query.name + ']');
	} catch (err) {
		console.log ('************************** illegal reg exp input query.name [' + query.name + ']');
		re = new RegExp('');
	}

	var te = new RegExp(query.name);
	query.name = te;
	Ustodo.find(query).sort('-created').populate('user', 'displayName').exec(function(err, ustodos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodos);
		}
	});
};

/**   * Ustodo middleware  */
exports.ustodoByID = function(req, res, next, id) {
	console.log('in ustodoByID id:'+id);
	//var s = Ustodo.findById(id);

	// ORIGINAL A/B SPLIT HBKK
	// A
	Ustodo.findById(id).populate('user', 'displayName').exec(function(err, ustodo) {
		// B
		// Ustodo.findOne({name:/ia/}).populate('user', 'displayName').exec(function(err, ustodo) {
		if (err) return next(err);
		if (! ustodo) return next(new Error('Failed to load Ustodo ' + id));
		req.ustodo = ustodo ;
		next();
	}); };

/**  * Ustodo authorization middleware  */
exports.hasAuthorization = function(req, res, next) {
	console.log ('in ustodos.server.controller.js: hasAuthorization');
	if (req.ustodo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};



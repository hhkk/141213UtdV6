'use strict';

var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');

//var UtilClass = require('.././UtilClass');
// console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\controllers
// C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
//var UtilClass = require('../../public/modules/ustodo/UtilClass');
//var UtilNodeVsBrowser = require('../../public/modules/ustodo/UtilNodeVsBrowser');
//C:\utd\141213UtdV6\public\modules\ustodo\UtilClass.js
//C:\utd\141213UtdV6\public\lib\ustodo\UtilClass.js
//C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js


var UtilHtmlHref = require('C:/utd/141213UtdV6/public/util/UtilHtmlHref.js');

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
	var ustodo = req.ustodo ;
    console.log ('in ustodos.server.controller.js: update ' );

	ustodo = _.extend(ustodo , req.body);
	delete ustodo.jsonx; // remove property
    ustodo.datelastmod = new Date();
    ustodo.jsonx = JSON.stringify(ustodo); // string

    console.log ('################# saving ustodo.jsonx:' + ustodo.jsonx);

    ustodo.save(function (err, ustodosaved, numberAffected) {
        if (err) {
          console.log('era!!!!!!!!!');
        } else {
            console.log('success1!!!!!!!!! ustodosaved.html' + ustodosaved.html);
            console.log('success2!!!!!!!!! numberAffected' + numberAffected);
            console.log('success3!!!!!!!!! req.body._id' + req.body._id);
        }
    });


	//ustodo.save(function(err) {
	//	if (err) {
     //       console.log ('err in save:' + err);
	//		return res.status(400).send({
	//			message: errorHandler.getErrorMessage(err)
    //
	//		});
	//	} else {
	//		res.jsonp(ustodo);
	//	}
	//});
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
exports.list2 = function(req, res) {

	console.log (' *************** Top of exports.list ');
	//console.log ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))

	var query = req.query;
	console.log ('in ustodos.server.controller.js: list query.querystring [' + query.q + ']');
    if (query.q !== null && query.q !== undefined)
        query.q = query.q.trim();
    else
        query.q = '';

    if (query.q === '*')   {
        console.log ('resetting * star to blank');
        query.q = '';
    }

    //console.log ('query.querystring post trim [' + query.querystring+ ']');
	//54b143dde898903429ce32b1

	//try {
	//	var d = JSON.parse(query.querystring);
		//console.log ('q is json [' + query.querystring + ']');
	//} catch (err) {
		//console.log ('q is not json [' + query.querystring + ']');
	//}

	//console.log ('in ustodos.server.controller.js: list, query: ' + query);
	console.log ('in ustodos.server.controller.js: list, query.querystring: ' + query.q);


    //
    //
	//try {
	//	re = new RegExp(query.querystring);
	//	//console.log ('************************** legal reg exp input query.querystring [' + query.querystring + ']');
	//} catch (err) {
	//	//console.log ('************************** illegal reg exp input query.querystring [' + query.querystring + ']');
	//	re = new RegExp('');
	//}

    var require_ustodos_controller_helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');

    //if (query.querystring.endsWith())
    var commandTrimmed = query.q.trim();
    if (UtilString.endsWith(commandTrimmed, ' w'))
    {
        console.log ('in ustodos.server.controller.js: w command-based save');
        O.o ('in endswith w');
        var ustodo = new Ustodo();
        ustodo.text = commandTrimmed;
        ustodo.html = commandTrimmed;
        ustodo.user = req.user;

        ustodo.save(function(err) {
            if (err) {
                console.log ('*** write fail commandTrimmed [' +commandTrimmed + ']');
                console.log ('*** write fail err [' +err + ']');
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                //now process read aspect only of query
                require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
                console.log ('*** write success commandTrimmed [' +commandTrimmed + ']');
            }
        });
    }
    else{
        O.o ('not endswith w');
        require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
    }


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



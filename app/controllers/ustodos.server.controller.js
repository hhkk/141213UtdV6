'use strict';

var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');

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
exports.list = function(req, res) {

	console.log (' *************** Top of exports.list ');
	//console.log ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))

	var query = req.query;
	console.log ('in ustodos.server.controller.js: list query.querystring [' + query.querystring+ ']');
    if (query.querystring !== null && query.querystring !== undefined)
        query.querystring = query.querystring.trim();
    else
        query.querystring = '';

    if (query.querystring === '*')   {
        console.log ('resetting * star to blank');
        query.querystring = '';
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
	console.log ('in ustodos.server.controller.js: list, query.querystring: ' + query.querystring);
	var re = null;


    //
    //
	//try {
	//	re = new RegExp(query.querystring);
	//	//console.log ('************************** legal reg exp input query.querystring [' + query.querystring + ']');
	//} catch (err) {
	//	//console.log ('************************** illegal reg exp input query.querystring [' + query.querystring + ']');
	//	re = new RegExp('');
	//}

    //var regexp = new RegExp(query.querystring);
    var regexp = new RegExp(query.querystring);




    //if (query.querystring.endsWith())
    var querystringTrimmed = query.querystring.trim();
    if (UtilString.endsWith(querystringTrimmed, ' w'))
    {
        console.log ('in ustodos.server.controller.js: w command-based save');
        var ustodo = new Ustodo();
        ustodo.text = querystringTrimmed;
        ustodo.user = req.user;

        ustodo.save(function(err) {
            if (err) {
                console.log ('*** write fail querystringTrimmed [' +querystringTrimmed + ']');
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log ('*** write success querystringTrimmed [' +querystringTrimmed + ']');
            }
        });
    }





    //console.log ('UtilClass.getClass(regexp):'+ UtilClass.getClass(regexp));
	var querymongo = {text:regexp};

	//var querymongo = {text:'/'+query.querystring+'/'};


    //{ "$regex": '/europe/', "$options": 'i'}

    var hklimit = 100; // 50 100 200 500 1000
    var countResult = 0;
    var x = [];

    console.log ('step: querymongo') ;
    //Ustodo.find().exec(function(err, ustodos) {
    Ustodo.find(querymongo).sort('-datelastmod').limit(hklimit).populate('user', 'displayName').exec(function(err, ustodos) {
    //Ustodo.find(querymongo).populate('user', 'displayName').exec(function(err, ustodos) {
		if (err) {
            console.log ('!!!!!!!! errorHandler.getErrorMessage(err):' + errorHandler.getErrorMessage(err));
            console.log ('!!!!!!!! err.toString():' + err.toString());
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)

			});
		} else {
            //if (query.querystring === '')
                //var x = ustodos.slice[0,20]
                for (var k = 0; k < (ustodos.length); k++)
                {
                    //console.log ('in result loop');
                    countResult = countResult + 1;
                    //ustodos[k].text = 'svr2,' + ustodos[k].text;
                    ustodos[k].text = UtilHtmlHref.strHttpEnhancer(ustodos[k].text);
                    x.push(ustodos[k]);

                }
                //console.log('pushed:'+ustodos[k]._doc.datelastmod + "." + +ustodos[k]._doc.datelastmod);
                console.log('for query [' + query.querystring + '] countResult [' + countResult + '] req._passport.session.user id [' + req._passport.session.user + ']');
                res.jsonp(x);

                //res.jsonp(ustodos);
            //else
			    //res.jsonp(ustodos.slice[0,20]);
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



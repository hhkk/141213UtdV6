'use strict';

var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var UtilUrl4 = require('C:/utd/141213UtdV6/public/util/UtilUrl4.js');

//var UtilClass = require('.././UtilClass');
// O.o ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\controllers
// C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
//var UtilClass = require('../../public/modules/ustodo/UtilClass');
//var UtilNodeVsBrowser = require('../../public/modules/ustodo/UtilNodeVsBrowser');
//C:\utd\141213UtdV6\public\modules\ustodo\UtilClass.js
//C:\utd\141213UtdV6\public\lib\ustodo\UtilClass.js
//C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js


//var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');

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
	O.o('in ustodos.server.controller.js: create');
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
	O.o ('in ustodos.server.controller.js: read');
	res.jsonp(req.ustodo);
};

/**
 * Update a Ustodo        hbkk
 */
exports.update = function(req, res) {
	var ustodo = req.ustodo ;
    O.o('in ustodos.server.controller.js: update ' );

	ustodo = _.extend(ustodo , req.body);
	delete ustodo.jsonx; // remove property
    ustodo.datelastmod = new Date();
    ustodo.jsonx = JSON.stringify(ustodo); // string

    O.o ('################# saving ustodo.jsonx:' + ustodo.jsonx);

    ustodo.save(function (err, ustodosaved, numberAffected) {
        if (err) {
          O.o('era!!!!!!!!!');
        } else {
            O.o('success1!!!!!!!!! ustodosaved.html' + ustodosaved.html);
            O.o('success2!!!!!!!!! numberAffected' + numberAffected);
            O.o('success3!!!!!!!!! req.body._id' + req.body._id);
        }
    });


	//ustodo.save(function(err) {
	//	if (err) {
     //       O.o ('err in save:' + err);
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
    O.o('in ustodos.server.controller.js: delete ' + ustodo.toString());

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

    O.o(' *************** Top of exports.list ');
	//O.o ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))

	var query = req.query;
    O.o('in ustodos.server.controller.js: list query.querystring [' + query.q + ']');
    if (query.q !== null && query.q !== undefined)
        query.q = query.q.trim();
    else
        query.q = '';

    if (query.q === '*')   {
        O.o ('resetting * star to blank');
        query.q = '';
    }

    //O.o ('query.querystring post trim [' + query.querystring+ ']');
	//54b143dde898903429ce32b1

	//try {
	//	var d = JSON.parse(query.querystring);
		//O.o ('q is json [' + query.querystring + ']');
	//} catch (err) {
		//O.o ('q is not json [' + query.querystring + ']');
	//}

	//O.o ('in ustodos.server.controller.js: list, query: ' + query);
    O.o('in ustodos.server.controller.js: list, query.querystring: ' + query.q);


    //
    //
	//try {
	//	re = new RegExp(query.querystring);
	//	//O.o ('************************** legal reg exp input query.querystring [' + query.querystring + ']');
	//} catch (err) {
	//	//O.o ('************************** illegal reg exp input query.querystring [' + query.querystring + ']');
	//	re = new RegExp('');
	//}

    var require_ustodos_controller_helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');


    var parseTitleTagFromHtml = function(html) {
        var titletag = '<title>';
        var iTitle = html.toLowerCase().indexOf(titletag);
        var iTitleEnd = html.toLowerCase().indexOf('</title>');
        var title = null;
        if (iTitle === -1 || iTitleEnd === -1) {
            title = '   no title';
        } else {
            title = html.slice(iTitle+7,iTitleEnd).trim();
        }
    };


    //if (query.querystring.endsWith())
    var commandTrimmed = query.q.trim();


    // if write   in write
    if (UtilString.endsWith(commandTrimmed, ' w'))
    {
        var commandRemoved = commandTrimmed.slice(0, commandTrimmed.length-2);
        O.o(' ========================================= in ustodos.server.controller.js: w save ' +
            ', commandTrimmed [' + commandTrimmed + '] ' + ', commandRemoved [' + commandRemoved + '] ' );
        O.o ('in endswith w');
        var ustodo = new Ustodo();
        ustodo.user = req.user;

        try {
            var res2 = {};
            res2.json = function(s)
            {
                O.o ('--------> saving content as both text and html [' + s + ']');

                ustodo.text = s;
                ustodo.html = s;

                ustodo.save(function(err) {
                    if (err) {
                        O.o('*** write fail commandTrimmed [' +commandTrimmed + ']');
                        O.o('*** write fail err [' +err + ']');
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        //now process read aspect only of query
                        require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
                        O.o('*** write success commandTrimmed [' +commandTrimmed + ']');
                    }
                });
            };

            UtilUrl4.expandUrlsToHrefsReturnPatchedStr(commandRemoved, res2);


        } catch (e) {
            O.o('erra:' + e);
            throw e;
        }











    }
    else{
        O.o ('not endswith w');
        require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
    }


};

/**   * Ustodo middleware  */
exports.ustodoByID = function(req, res, next, id) {
	O.o('in ustodoByID id:'+id);
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
    O.o('in ustodos.server.controller.js: hasAuthorization');
	if (req.ustodo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};



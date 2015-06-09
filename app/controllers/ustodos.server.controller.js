'use strict';

var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var UtilUrl4 = require('C:/utd/141213UtdV6/public/util/UtilUrl4.js');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;
var require_Development = require('C:/utd/141213UtdV6/config/env/development.js');

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
O.o ('&&&&&&&&&&000 init var callcountSaved = 0');
var callcountSaved = 0;

// section_create_new not section_write
exports.create = function(req, res)
{
	//O.o('33333333333333333333 in ustodos.server.controller.js: create');
	var ustodo = new Ustodo(req.body);
	ustodo.user = req.user;

    ustodo.html = ustodo.html;

    var res2 = {};
    // section_exports.create
    O.o ('^^^^^^^^^^^^^^^^^^^^^^^^ in server.controller exports.create');
    res2.json = function(s)
    {
        //O.o ('--------> saving content as both text and html [' + s + ']');
        //ustodo.text = 't1.' + s;
        //ustodo.html = 'h1.' + s;
        ustodo.text = s;
        ustodo.html = s;
        ustodo.datelastmod = new Date();
        ustodo.datecreated = new Date();

        O.o ('^^^^^^^^^^^^^^^^^^^^^^^^ save new ustodo.text:' + ustodo.html);
        O.o ('^^^^^^^^^^^^^^^^^^^^^^^^ save new ustodo.html:' + ustodo.html);
        O.o ('^^^^^^^^^^^^^^^^^^^^^^^^ save new ustodo.jsonx:' + ustodo.jsonx);
        //O.o ('^^^^^^^^^^^^^^^^^^^^^^^^ save new ustodo.jsony:' + ustodo.jsony);
        ustodo.save(function(err) {
            if (err) {
                O.o('*** write fail err [' +err + ']');
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log ('@@@@@@@@@@@@@@@@@@@@@ completed save # [' + callcountSaved++ + '] of a created USTODO [' + ustodo.html + ']');
                res.jsonp(ustodo);
            }
        });
    };

    UtilUrl4.expandUrlsToHrefsReturnPatchedStr(ustodo.html, res2);






};

 /**
 * Show the current Ustodo
 */
exports.read = function(req, res) {
	//O.o ('in ustodos.server.controller.js: read');
	res.jsonp(req.ustodo);
};

/**
 * Update a Ustodo        hbkk
 */
// section_update_existing section_save_Existing
exports.update = function(req, res)
{
	var ustodo = req.ustodo ;

	ustodo = _.extend(ustodo , req.body);
    ustodo.text = ustodo.text;
    ustodo.html = ustodo.html;
    ustodo.jsonx = ustodo.jsonx;
    //ustodo.text = 't2.' + ustodo.text;
    //ustodo.html = 'h2.' + ustodo.html;
    //ustodo.jsonx = 'j2.' + ustodo.jsonx;
    O.o('in ustodos.server.controller.js: update ' );
    O.o ('ustodo.jsonx pre delete:' + ustodo.jsonx);
	delete ustodo.jsonx; // remove property
    O.o ('ustodo.jsonx post delete:' + ustodo.jsonx);
    ustodo.datelastmod = new Date();
    ustodo.jsonx = JSON.stringify(ustodo); // string

    O.o ('xx################# saving 1 ustodo.text:' + ustodo.text);
    O.o ('xx################# saving 2 ustodo.html:' + ustodo.html);
    O.o ('xx################# saving 3 ustodo.jsonx:' + ustodo.jsonx);

    ustodo.save(function (err, ustodosaved, numberAffected) {
        if (err) {
          O.o('era!!!!!!!!!');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            O.o('success1!!!!!!!!! ustodosaved.html [' + ustodosaved.html + ']');
            O.o('success2!!!!!!!!! numberAffected [' + numberAffected + ']');
            O.o('success3!!!!!!!!! req.body._id [' + req.body._id + ']');
            res.jsonp(ustodo);
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
exports.delete2 = function(req, res) {
    O.o('_______________________ in ustodos.server.controller.js exports.delete ');

    var ustodo = req.ustodo;
    //if (!req.ustodo.isArray)
    O.o('in ustodos.server.controller.js: delete ' + ustodo.toString());

    ustodo.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(ustodo);
        }
    });


};




exports.ustodobulkdel = function(req, res) {
    try
    {
        //O.o('_______________________ in exports.ustodobulkdel  req.body.form:'+req.body.form);
        //O.o('_______________________ in exports.ustodobulkdel  req.body.form.arrIdsToDelete:'+req.body.form.arrOidsToDelete);

        var arrIdsToDelete = req.body.form.arrOidsToDelete;
        //O.o('_______________________ in exports.ustodobulkdel arrIdsToDelete:'+arrIdsToDelete);


        // http://docs.mongodb.org/manual/reference/method/db.collection.remove/
        /**
         The db.collection.remove() method can have one of two syntaxes. The remove() method can take a query document and an optional justOne boolean:

         db.collection.remove(
         <query>,
         <justOne>
         )
         Or the method can take a query document and an optional remove options document:

         New in version 2.6.

         db.collection.remove(
         <query>,
         {
           justOne: <boolean>,
           writeConcern: <document>
         }
         )*
         */





        var dbWrite = new Db(require_Development.dbname_ustodo, new Server('localhost', 27017), {safe: false});
        dbWrite.open(function (err, dbWrite)
        {
            dbWrite.collection('ustodos', function (err, collRemove_ustodos)
            {
                try
                {
                    // works collRemove_ustodos.remove({_id:new ObjectID(arrIdsToDelete[0])});
                    var arrOidsToDelete = [];
                    for (var j = 0; j < arrIdsToDelete.length; j++ )
                    {
                        arrOidsToDelete.push (new ObjectID(arrIdsToDelete[j]));
                        //O.o ('deleting id:' + arrIdsToDelete[j]);
                    }
                    collRemove_ustodos.remove({_id: {$in:arrOidsToDelete}} );

                    O.o('removed to dbWrite.collRemove_ustodos:' + dbWrite.databaseName+'.'+collRemove_ustodos.collectionName);
                    O.o('removed this many:' + arrOidsToDelete.length);
                } catch (err) {
                    //console.log(UtilClass.UtilClass('err', err));
                    O.e('err:' + err);
                }


                if (true)
                {
                    collRemove_ustodos.ensureIndex({ lastmoddate: -1 } );
                    console.log('collRemove_ustodos.ensureIndex({ lastmoddate: ok');
                }

                O.o ('done with remote');
                var x = {result:'success'};
                res.json(x);
            });
        });

    } catch (e) {
        O.e('fail in bulk delete:' + e);
        res.status(403).send('Failure in bulk delete.  e:'+e);
    }
};


/**
 * List of Ustodos
 */
exports.list2 = function(req, res) {

    //O.o(' *************** Top of exports.list ');
	//O.o ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))

	var query = req.query;
    //O.o('in ustodos.server.controller.js: list query.querystring [' + query.q + ']');
    if (query.q !== null && query.q !== undefined)
        query.q = query.q.trim();
    else
        query.q = '';

    if (query.q === '*')   {
        //O.o ('resetting * star to blank');
        query.q = '';
    }
    var require_ustodos_controller_helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');
    //O.o('in ustodos.server.controller.js: list, query.querystring: ' + query.q);
    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, query.q.trim(), req, errorHandler, res);

    //O.o ('query.querystring post trim [' + query.querystring+ ']');
	//54b143dde898903429ce32b1

	//try {
	//	var d = JSON.parse(query.querystring);
		//O.o ('q is json [' + query.querystring + ']');
	//} catch (err) {
		//O.o ('q is not json [' + query.querystring + ']');
	//}

	//O.o ('in ustodos.server.controller.js: list, query: ' + query);


    //
    //
	//try {
	//	re = new RegExp(query.querystring);
	//	//O.o ('************************** legal reg exp input query.querystring [' + query.querystring + ']');
	//} catch (err) {
	//	//O.o ('************************** illegal reg exp input query.querystring [' + query.querystring + ']');
	//	re = new RegExp('');
	//}



    //var parseTitleTagFromHtml = function(html) {
    //    var titletag = '<title>';
    //    var iTitle = html.toLowerCase().indexOf(titletag);
    //    var iTitleEnd = html.toLowerCase().indexOf('</title>');
    //    var title = null;
    //    if (iTitle === -1 || iTitleEnd === -1) {
    //        title = '   no title';
    //    } else {
    //        title = html.slice(iTitle+7,iTitleEnd).trim();
    //    }
    //};


    //if (query.querystring.endsWith())
    //var commandTrimmed = ;
    //O.o ('not endswith w');


    //// if write   in write
    //if (UtilString.endsWith(commandTrimmed, ' w'))
    //{
    //    var commandRemoved = commandTrimmed.slice(0, commandTrimmed.length-2);
    //    //O.o(' ========================================= in ustodos.server.controller.js: w save ' +
    //        //', commandTrimmed [' + commandTrimmed + '] ' + ', commandRemoved [' + commandRemoved + '] ' );
    //    O.o ('in endswith w commandTrimmed [' + commandTrimmed + ']');
    //    var ustodo = new Ustodo();
    //    ustodo.user = req.user;
    //
    //    try {
    //        var res2 = {};
    //        res2.json = function(s)
    //        {
    //            O.o ('--------> saving content as both text and html [' + s + ']');
    //
    //            ustodo.text = s;
    //            ustodo.html = s;
    //
    //            ustodo.save(function(err) {
    //                if (err) {
    //                    O.o('*** write fail commandTrimmed [' +commandTrimmed + ']');
    //                    O.o('*** write fail err [' +err + ']');
    //                    return res.status(400).send({
    //                        message: errorHandler.getErrorMessage(err)
    //                    });
    //                } else {
    //                    //now process read aspect only of query
    //                    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
    //                    O.o('*** write success commandTrimmed [' +commandTrimmed + ']');
    //                }
    //            });
    //        };
    //
    //        UtilUrl4.expandUrlsToHrefsReturnPatchedStr(commandRemoved, res2);
    //
    //
    //    } catch (e) {
    //        O.o('erra:' + e);
    //        throw e;
    //    }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //}
    //else{
    //    O.o ('not endswith w');
    //    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
//    }


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



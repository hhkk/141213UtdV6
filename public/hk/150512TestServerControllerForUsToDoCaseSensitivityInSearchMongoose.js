var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//We have a pending connection to the test database running on localhost. We now need to get notified if we connect //successfully or if a connection error occurs:

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
});
//Once our connection opens, our callback will be called. For brevity, let's assume that all following code is within this //callback.

//With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.

var kittySchema = mongoose.Schema({
    name: String
})
//So far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.

var Kitten = mongoose.model('Kitten', kittySchema)
//A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'
//Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema)
//Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:

var fluffy = new Kitten({ name: 'Goddy' });
//fluffy.speak() // "Meow name is fluffy"
//We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occured.

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    //fluffy.speak();
});
//Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.

Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens)
})
//We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.

var callback = function(a, b) {
    console.log ('in callback a' + a);
    console.log ('in callback b' + b);
}



var x = /goddy/i;
var t = 'goddy'
var y = new RegExp(t, 'i');
//var y = new RegExp(t);
console.log ('x:' + x);
console.log ('y:' + y);
var queryd = {name:y};
//Kitten.find({ name: /Fluff/i }, callback)
Kitten.find(queryd, callback);


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
//'use strict';
//
//var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
//var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
//var O = require('C:/utd/141213UtdV6/public/util/O.js');
//var UtilUrl4 = require('C:/utd/141213UtdV6/public/util/UtilUrl4.js');
//var Db = require('mongodb').Db;
//var Server = require('mongodb').Server;
//var ObjectID = require('mongodb').ObjectID;
//var require_Development = require('C:/utd/141213UtdV6/config/env/development.js');
//
//
//
////var config = require('../config');
////var mongoose = require('mongoose');
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
//
////var UtilClass = require('.././UtilClass');
//// O.o ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\controllers
//// C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
////var UtilClass = require('../../public/modules/ustodo/UtilClass');
////var UtilNodeVsBrowser = require('../../public/modules/ustodo/UtilNodeVsBrowser');
////C:\utd\141213UtdV6\public\modules\ustodo\UtilClass.js
////C:\utd\141213UtdV6\public\lib\ustodo\UtilClass.js
////C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
//
//
////var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');
//
///**
// * Module dependencies.
// */
//var mongoose = require('mongoose'),
//    errorHandler = require('C:/utd/141213UtdV6/app/controllers/errors.server.controller.js');
//
//var  Ustodo = mongoose.model('Ustodo');
//var _ = require('lodash');
//
///**
// * Create a Ustodo
// */
//exports.create = function(req, res) {
//    O.o('in ustodos.server.controller.js: create');
//    var ustodo = new Ustodo(req.body);
//    ustodo.user = req.user;
//
//
//    ustodo.html = ustodo.html;
//
//    var res2 = {};
//    res2.json = function(s)
//    {
//        O.o ('--------> saving content as both text and html [' + s + ']');
//        ustodo.text = s;
//        ustodo.html = s;
//        ustodo.datelastmod = new Date();
//        ustodo.datecreated = new Date();
//
//        ustodo.save(function(err) {
//            if (err) {
//                O.o('*** write fail err [' +err + ']');
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
//            } else {
//                console.log ('@@@@@@@@@@@@@@@@@@@@@ saved a new USTODO [' + ustodo.html + ']');
//                res.jsonp(ustodo);
//            }
//        });
//    };
//
//    UtilUrl4.expandUrlsToHrefsReturnPatchedStr(ustodo.html, res2);
//
//
//
//
//
//
//};
//
/////**
//// * Show the current Ustodo
//// */
////exports.read = function(req, res) {
////    O.o ('in ustodos.server.controller.js: read');
////    res.jsonp(req.ustodo);
////};
////
/////**
//// * Update a Ustodo        hbkk
//// */
////exports.update = function(req, res) {
////    var ustodo = req.ustodo ;
////    O.o('in ustodos.server.controller.js: update ' );
////
////    ustodo = _.extend(ustodo , req.body);
////    delete ustodo.jsonx; // remove property
////    ustodo.datelastmod = new Date();
////    ustodo.jsonx = JSON.stringify(ustodo); // string
////
////    O.o ('################# saving ustodo.jsonx:' + ustodo.jsonx);
////
////    ustodo.save(function (err, ustodosaved, numberAffected) {
////        if (err) {
////            O.o('era!!!!!!!!!');
////        } else {
////            O.o('success1!!!!!!!!! ustodosaved.html [' + ustodosaved.html + ']');
////            O.o('success2!!!!!!!!! numberAffected [' + numberAffected + ']');
////            O.o('success3!!!!!!!!! req.body._id [' + req.body._id + ']');
////        }
////    });
////
////
////    //ustodo.save(function(err) {
////    //	if (err) {
////    //       O.o ('err in save:' + err);
////    //		return res.status(400).send({
////    //			message: errorHandler.getErrorMessage(err)
////    //
////    //		});
////    //	} else {
////    //		res.jsonp(ustodo);
////    //	}
////    //});
////};
////
/////**
//// * Delete an Ustodo
//// */
////exports.delete2 = function(req, res) {
////    O.o('_______________________ in ustodos.server.controller.js exports.delete ');
////
////    var ustodo = req.ustodo;
////    //if (!req.ustodo.isArray)
////    O.o('in ustodos.server.controller.js: delete ' + ustodo.toString());
////
////    ustodo.remove(function (err) {
////        if (err) {
////            return res.status(400).send({
////                message: errorHandler.getErrorMessage(err)
////            });
////        } else {
////            res.jsonp(ustodo);
////        }
////    });
////
////
////};
////
////
////
////
////exports.ustodobulkdel = function(req, res) {
////    try
////    {
////        O.o('_______________________ in exports.ustodobulkdel  req.body.form:'+req.body.form);
////        O.o('_______________________ in exports.ustodobulkdel  req.body.form.arrIdsToDelete:'+req.body.form.arrOidsToDelete);
////
////        var arrIdsToDelete = req.body.form.arrOidsToDelete;
////        O.o('_______________________ in exports.ustodobulkdel arrIdsToDelete:'+arrIdsToDelete);
////
////
////        // http://docs.mongodb.org/manual/reference/method/db.collection.remove/
////        /**
////         The db.collection.remove() method can have one of two syntaxes. The remove() method can take a query document and an optional justOne boolean:
////
////         db.collection.remove(
////         <query>,
////         <justOne>
////         )
////         Or the method can take a query document and an optional remove options document:
////
////         New in version 2.6.
////
////         db.collection.remove(
////         <query>,
////         {
////           justOne: <boolean>,
////           writeConcern: <document>
////         }
////         )*
////         */
////
////
////
////
////
////        var dbWrite = new Db(require_Development.dbname_ustodo, new Server('localhost', 27017), {safe: false});
////        dbWrite.open(function (err, dbWrite)
////        {
////            dbWrite.collection('ustodos', function (err, collRemove_ustodos)
////            {
////                try
////                {
////                    // works collRemove_ustodos.remove({_id:new ObjectID(arrIdsToDelete[0])});
////                    var arrOidsToDelete = [];
////                    for (var j = 0; j < arrIdsToDelete.length; j++ )
////                    {
////                        arrOidsToDelete.push (new ObjectID(arrIdsToDelete[j]));
////                        O.o ('deleting id:' + arrIdsToDelete[j]);
////                    }
////                    collRemove_ustodos.remove({_id: {$in:arrOidsToDelete}} );
////
////                    O.o('removed to dbWrite.collRemove_ustodos:' + dbWrite.databaseName+'.'+collRemove_ustodos.collectionName);
////                    O.o('removed this many:' + arrOidsToDelete.length);
////                } catch (err) {
////                    //console.log(UtilClass.UtilClass('err', err));
////                    O.e('err:' + err);
////                }
////
////
////                if (true)
////                {
////                    collRemove_ustodos.ensureIndex({ lastmoddate: -1 } );
////                    console.log('collRemove_ustodos.ensureIndex({ lastmoddate: ok');
////                }
////
////                O.o ('done with remote');
////                var x = {result:'success'};
////                res.json(x);
////            });
////        });
////
////    } catch (e) {
////        O.e('fail in bulk delete:' + e);
////        res.status(403).send('Failure in bulk delete.  e:'+e);
////    }
////};
////
//
//
//    //O.o ('query.querystring post trim [' + query.querystring+ ']');
//    //54b143dde898903429ce32b1
//
//    //try {
//    //	var d = JSON.parse(query.querystring);
//    //O.o ('q is json [' + query.querystring + ']');
//    //} catch (err) {
//    //O.o ('q is not json [' + query.querystring + ']');
//    //}
//
//    //O.o ('in ustodos.server.controller.js: list, query: ' + query);
//
//
//    //
//    //
//    //try {
//    //	re = new RegExp(query.querystring);
//    //	//O.o ('************************** legal reg exp input query.querystring [' + query.querystring + ']');
//    //} catch (err) {
//    //	//O.o ('************************** illegal reg exp input query.querystring [' + query.querystring + ']');
//    //	re = new RegExp('');
//    //}
//
//
//
//    //var parseTitleTagFromHtml = function(html) {
//    //    var titletag = '<title>';
//    //    var iTitle = html.toLowerCase().indexOf(titletag);
//    //    var iTitleEnd = html.toLowerCase().indexOf('</title>');
//    //    var title = null;
//    //    if (iTitle === -1 || iTitleEnd === -1) {
//    //        title = '   no title';
//    //    } else {
//    //        title = html.slice(iTitle+7,iTitleEnd).trim();
//    //    }
//    //};
//
//
//    //if (query.querystring.endsWith())
//    //var commandTrimmed = ;
//    //O.o ('not endswith w');
//
//
//    //// if write   in write
//    //if (UtilString.endsWith(commandTrimmed, ' w'))
//    //{
//    //    var commandRemoved = commandTrimmed.slice(0, commandTrimmed.length-2);
//    //    //O.o(' ========================================= in ustodos.server.controller.js: w save ' +
//    //        //', commandTrimmed [' + commandTrimmed + '] ' + ', commandRemoved [' + commandRemoved + '] ' );
//    //    O.o ('in endswith w commandTrimmed [' + commandTrimmed + ']');
//    //    var ustodo = new Ustodo();
//    //    ustodo.user = req.user;
//    //
//    //    try {
//    //        var res2 = {};
//    //        res2.json = function(s)
//    //        {
//    //            O.o ('--------> saving content as both text and html [' + s + ']');
//    //
//    //            ustodo.text = s;
//    //            ustodo.html = s;
//    //
//    //            ustodo.save(function(err) {
//    //                if (err) {
//    //                    O.o('*** write fail commandTrimmed [' +commandTrimmed + ']');
//    //                    O.o('*** write fail err [' +err + ']');
//    //                    return res.status(400).send({
//    //                        message: errorHandler.getErrorMessage(err)
//    //                    });
//    //                } else {
//    //                    //now process read aspect only of query
//    //                    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
//    //                    O.o('*** write success commandTrimmed [' +commandTrimmed + ']');
//    //                }
//    //            });
//    //        };
//    //
//    //        UtilUrl4.expandUrlsToHrefsReturnPatchedStr(commandRemoved, res2);
//    //
//    //
//    //    } catch (e) {
//    //        O.o('erra:' + e);
//    //        throw e;
//    //    }
//    //
//    //
//    //
//    //
//    //
//    //
//    //
//    //
//    //
//    //
//    //
//    //}
//    //else{
//    //    O.o ('not endswith w');
//    //    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, commandTrimmed, req, errorHandler, res);
////    }
//
//
//
/////**   * Ustodo middleware  */
////exports.ustodoByID = function(req, res, next, id) {
////    O.o('in ustodoByID id:'+id);
////    //var s = Ustodo.findById(id);
////
////    // ORIGINAL A/B SPLIT HBKK
////    // A
////    Ustodo.findById(id).populate('user', 'displayName').exec(function(err, ustodo) {
////        // B
////        // Ustodo.findOne({name:/ia/}).populate('user', 'displayName').exec(function(err, ustodo) {
////        if (err) return next(err);
////        if (! ustodo) return next(new Error('Failed to load Ustodo ' + id));
////        req.ustodo = ustodo ;
////        next();
////    }); };
////
/////**  * Ustodo authorization middleware  */
////exports.hasAuthorization = function(req, res, next) {
////    O.o('in ustodos.server.controller.js: hasAuthorization');
////    if (req.ustodo.user.id !== req.user.id) {
////        return res.status(403).send('User is not authorized');
////    }
////    next();
////};
////
////
////
//
//
///**
// * List of Ustodos
// */
//    O.o(' *************** Top of exports.list ');
//    //O.o ('utilclass.getclass of s:' + UtilClass.getClass('hbkk res:', res))
//
//    var query = 'byte.com';
//    O.o('in ustodos.server.controller.js: list query.querystring [' + query.q + ']');
//    if (query.q !== null && query.q !== undefined)
//        query.q = query.q.trim();
//    else
//        query.q = '';
//
//    if (query.q === '*')   {
//        O.o ('resetting * star to blank');
//        query.q = '';
//    }
//    var require_ustodos_controller_helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');
//    O.o('in ustodos.server.controller.js: list, query.querystring: ' + query.q);
//    require_ustodos_controller_helper.processCommandReadPortion(Ustodo, query.q.trim(), req, errorHandler, res);

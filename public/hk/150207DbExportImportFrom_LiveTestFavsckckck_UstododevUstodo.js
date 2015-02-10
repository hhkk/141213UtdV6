
//"C:\Program Files (x86)\JetBrains\IntelliJ IDEA 14.0.1\bin\runnerw.exe" C:\bin\nodejs\node.exe 141221NodeMongoDelete3.js
//========================================================================================
//    =  Please ensure that you set the default write concern for the database by setting    =
//    =   one of the options                                                                 =
//    =                                                                                      =
//        =     w: (value of > -1 or the string 'majority'), where < 1 means                     =
//    =        no write acknowledgement                                                       =
//    =     journal: true/false, wait for flush to journal before acknowledgement             =
//    =     fsync: true/false, wait for flush to file system before acknowledgement           =
//    =                                                                                      =
//        =  For backward compatibility safe is still supported and                              =
//    =   allows values of [true | false | {j:true} | {w:n, wtimeout:n} | {fsync:true}]      =
//    =   the default value is false which means the driver receives does not                =
//    =   return the information of the success/error of the insert/update/remove            =
//    =                                                                                      =
//        =   ex: new Db(new Server('localhost', 27017), {safe:false})                           =
//    =                                                                                      =
//        =   http://www.mongodb.org/display/DOCS/getLastError+Command                           =
//=                                                                                      =
//    =  The default of no acknowledgement will change in the very near future                =
//    =                                                                                      =
//        =  This message will disappear when the default safe is set on the driver Db           =
//========================================================================================
//}
var UtilClass = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass.js');
//var UtilClass3_isString = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass3_isString.js');
var UtilClass_is = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass_is.js');
var UtilDate = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilDate.js');

//    Process finished with exit code 0
//var Db = require('mongodb').Db,
//    Server = require('mongodb').Server,
//    Grid = require('mongodb').Grid,
//    Code = require('mongodb').Code,
//    assert = require('assert');


var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    Grid = require('mongodb').Grid,
    ObjectID = require('mongodb').ObjectID,
    Code = require('mongodb').Code,
    assert = require('assert'),
    BSON = require('mongodb').BSONPure;

// 20 years of ustodos
// 111111111111111111111111111111111111111111111111
var dbSource = new Db('livetest', new Server('localhost', 27017), {safe:false});
// new DB
//var dbTarget = new Db('ustodo-dev', new Server('localhost', 27017), {safe:false});
var dbTarget = new Db('notustodo', new Server('localhost', 27017), {safe:false});

// 222222222222222222222222222222222222222222222222
var collNameSource = 'favsckckck'
//var collNameTarget = 'ustodoorisx'
var collNameTarget = 'billy'
//var collTargetTest = 'ustodooris-test'


// STANDALONE INSERT VALIDATION



var itemstokeep = null;
if (true) {



    var itemstokeep = null;

    var dba = new Db('livetest', new Server('localhost', 27017), {safe:false});
    var collName = 'favsckckck';
    dba.open(function(err, dba) {
        dba.collection(collName, function (err, coll) {
                try {
                    // QUERY 20 years of records
                    var queryRegExp = {text : new RegExp('')};  // <=========================
                    try {
                        coll.find(queryRegExp).toArray(function (err, items) {


                            var writedbname = 'ustodo-dev';
                            var writecollname = 'ustodos';

                            var db = new Db(writedbname, new Server('localhost', 27017), {safe: false});
                            db.open(function (err, db) {
                                db.collection(writecollname, function (err, coll)
                                {
                                    try {
                                        console.log("items.length a:" + items.length);

                                        var i = 0;

                                        coll.ensureIndex({ lastmoddate: -1 } );
                                        console.log("coll.ensureIndex({ lastmoddate: ok");

                                        if (false )
                                        {
                                            items.forEach(function(item) {
                                                //if (i < 500)
                                                {
                                                    // build json for single string search
                                                    var jsonObj = {};
                                                    jsonObj.text = item.text;
                                                    jsonObj.date = new Date(item.date);
                                                    var jsonStr = JSON.stringify(jsonObj);
                                                    //console.log ('jsonStr:' + jsonStr);

                                                    coll.insert (
                                                        {
                                                            //filelineraw: items[j].filelineraw,
                                                            //date: items[j].date,
                                                            text: jsonObj.text,
                                                            datelastmod: jsonObj.date,
                                                            datecreated: jsonObj.date,
                                                            json: jsonStr,
                                                            user: new ObjectID('5418f365f5bc55500a906584')
                                                        }
                                                        , {w: 1}, function (err, result) {
                                                            if (err !== null) {
                                                                console.log('erra:' + UtilClass.getClass('erra', err));
                                                                assert.equal(null, err);
                                                            } else {
                                                                //if ( i % 1 == 0)
                                                                //{
                                                                //console.log (i + '. insert success jsonStr ['+ jsonStr+ ']');
                                                                //}
                                                            }
                                                        });
                                                    i++;

                                                } // if i < x000
                                            });

                                        }
                                        console.log ('inserted to db.coll:' + db.databaseName+'.'+coll.collectionName);
                                        //for(j=0; j < len; j++)
                                        //{
                                        //    if ( j < 100)
                                        //    {
                                        //    }
                                        //}
                                    } catch (err) {
                                        //console.log(UtilClass.UtilClass('err', err));
                                        console.log("err:" + err);
                                    }
                                    console.log("done")
                                });
                            });

                            console.log("items.length b:" + items.length);
                            assert.equal(null, err);
                            itemstokeep = items;
                        });

                    }
                    catch (err) {
                        //console.log(UtilClass.UtilClass('err', err));
                        console.log("err:" + err);
                    }
                    console.log("really     done");
                }
                catch (err) {
                    //console.log(UtilClass.UtilClass('err', err));
                    console.log("err:" + err);
                }
            }
        )
    });







    console.log ('done');



}




















//
//
//    // repeat
//    db = new Db('ustodo-dev', new Server('localhost', 27017), {safe:false});
//    db.open(function(err, db) {
//        db.collection(collName, function (err, coll)
//        {
//            try {
//                coll.insert({petey14b:'mataras9b'}
//                    , {w: 1}, function (err, result) {
//                        if (err !== null) {
//                            console.log('erra:' + UtilClass.getClass('erra', err));
//                            assert.equal(null, err);
//                        }
//                    });
//                //console.log('itemstokeep[0].filelineraw:' + itemstokeep[0].filelineraw);
//                //coll.insert({filelineraw:itemstokeep[0].filelineraw}
//                //    , {w: 1}, function (err, result) {
//                //        if (err !== null) {
//                //            console.log('erra:' + UtilClass.getClass('erra', err));
//                //            assert.equal(null, err);
//                //        }
//                //    });
//                //console.log ("===============================");
//
//            }
//            catch (err) {
//                //console.log(UtilClass.UtilClass('err', err));
//                console.log("err:" + err);
//            }
//            console.log ("done")
//        });
//    });
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
//    var dba = new Db('ustodo-dev', new Server('localhost', 27017), {safe:false});
//    var collName = 'favsckckck';
//    dba.open(function(err, dba) {
//        dba.collection(collName, function (err, coll) {
//                try {
//                    // QUERY 20 years of records
//                    var queryRegExp = {text : new RegExp('')};  // <=========================
//                    try {
//                        coll.find(queryRegExp).toArray(function (err, items) {
//                            console.log("items.length:" + items.length);
//                            assert.equal(null, err);
//                            itemstokeep = items;
//                        });
//
//                    }
//                    catch (err) {
//                        //console.log(UtilClass.UtilClass('err', err));
//                        console.log("err:" + err);
//                    }
//                    console.log("done");
//                }
//                catch (err) {
//                    //console.log(UtilClass.UtilClass('err', err));
//                    console.log("err:" + err);
//                }
//            }
//        )
//    });
//
//}
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
//
//
//    var db = new Db('ustodo-dev', new Server('localhost', 27017), {safe:false});
//    var collName = 'ustodooris';
//    db.open(function(err, db) {
//        db.collection(collName, function (err, coll)
//        {
//            try {
//                coll.insert({petey14b:'mataras9b'}
//                    , {w: 1}, function (err, result) {
//                        if (err !== null) {
//                            console.log('erra:' + UtilClass.getClass('erra', err));
//                            assert.equal(null, err);
//                        }
//                    });
//                //console.log('itemstokeep[0].filelineraw:' + itemstokeep[0].filelineraw);
//                //coll.insert({filelineraw:itemstokeep[0].filelineraw}
//                //    , {w: 1}, function (err, result) {
//                //        if (err !== null) {
//                //            console.log('erra:' + UtilClass.getClass('erra', err));
//                //            assert.equal(null, err);
//                //        }
//                //    });
//                //console.log ("===============================");
//
//            }
//            catch (err) {
//                //console.log(UtilClass.UtilClass('err', err));
//                console.log("err:" + err);
//            }
//            console.log ("done")
//        });
//    });
//
//
//
//
////
////var fnWriteRecordToDB = function(dbTarget, collNameTarget, filelineraw, datex, textx) {
////// Establish connection to db
////    //new Db('ustodo-dev', new Server('localhost', 27017), {safe:false})
////    dbTarget.collection(collNameTarget, function (err, coll2) {
////        console.log('write to:' + dbTarget.databaseName + ', ' + collNameTarget);
////        try {
////            coll2.insert({francine:'comelately'} // 333333333333333333333333333333333333333
////                , {w: 1}, function (err, result) {
////                    if (err !== null)
////                        console.log('erra:' + UtilClass.getClass('erra', err));
////                    console.log ("===============================");
////                    assert.equal(null, err);
////                });
////            console.log ('seeming success');
////        } catch (err) {
////            console.log ('in error');
////        }
////    });
////
////
//////coll.insert(c, {w: 1}, function (err, result) {
//////    if (err !== null)
//////        UtilClass.getClass("errc", err);
//////    assert.equal(null, err);
//////});
////
////}
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////var dbname = '150208hk';
////var collName = '1502076am';
//////var dbname = 'livetest';
////var db = new Db(dbname, new Server('localhost', 27017), {safe:false});
////
//////db.open(function(err, db) {
//////    // Fetch a collection to insert document into
//////    db.collection(collName, function (err, coll)
//////    {
//////        try {
//////            var dt2 = new Date(1910, 1,3, 4, 5, 6, 7);
//////
//////            coll.insert({hanky:'comelately', dt:dt2}
//////                , {w: 1}, function (err, result) {
//////                    if (err !== null)
//////                        console.log('erra:' + UtilClass.getClass('erra', err));
//////                    console.log ("===============================");
//////                    assert.equal(null, err);
//////                });
//////
//////
//////        }
//////        catch (err) {
//////            //console.log(UtilClass.UtilClass('err', err));
//////            console.log("err:" + err);
//////        }
//////        console.log ("done")
//////    });
//////});
////
////
////
////
////
////
////
////
////
////
////
////
////var itemstokeep = null;
////
////// READ
////// Establish connection to db
////dbSource.open(function(err, db) {
////    // Fetch a collection to insert document into
////    dbSource.collection(collNameSource, function (err, coll) {
////            // callback hell http://stackoverflow.com/questions/20961919/node-js-async-how-to-avoid-callback-hell-with-async
////            try {
////                // QUERY 20 years of records
////                var queryRegExp = {text : new RegExp('')};  // <=========================
////                try {
////                    coll.find(queryRegExp).toArray(function (err, items) {
////                        console.log("items.length:" + items.length);
////                        assert.equal(null, err);
////                        itemstokeep = items;
////                    });
////
////                }
////                catch (err) {
////                    //console.log(UtilClass.UtilClass('err', err));
////                    console.log("err:" + err);
////                }
////                console.log("done");
////            }
////            catch (err) {
////                //console.log(UtilClass.UtilClass('err', err));
////                console.log("err:" + err);
////            }
////        }
////    )
////});
////
//////dbSource.close();
////
////var fnhk = function(itemshkhk) {
////    var i = 0;
////    new Db('ustodo-dev', new Server('localhost', 27017), {safe: false}).
////        collection('ustodooris', function (err, coll2) {
////            console.log('write to:' + dbTarget.databaseName + ', ' + collNameTarget);
////            try {
////                for (favsckckck in itemstokeep) {
////                    coll2.insert({steve: 'smith'}
////                        , {w: 1}, function (err, result) {
////                            if (err !== null)
////                                console.log('erra:' + UtilClass.getClass('erra', err));
////                            console.log("===============================");
////                            assert.equal(null, err);
////                        });
////
////                }
////                console.log('seeming success');
////            } catch (err) {
////                console.log('in error');
////            }
////        });
////
////
////}
////
////
////setTimeout(function(){fnhk(itemstokeep)}, 5000);
//////
//////
//////
//////
//////
//////
//////
//////
//////
//////
//////
//////
//////
//////  // 1 INSERT
//////  //var astr = '{"xx":[{"f":"g"},{"h":"i"},{"a":{"lover": "girl", "lover2": {"lover3": "girl3", "lover4": "girl4"}}}]}';
//////  //var astr = '{"lover": "girl", "lover2": {"lover3": "girl3", "lover4": "girl4"}}';
//////  //var astr = '[{"henry": "kon"},{"john": "grele"}]'; // <=========================
//////  var astr = '{"david": {"inthisarrayishenryandjoe":[{"henry": "kon"}, {"joe":"bognar"}]}}'; // <=========================
//////  var astrParsedToObj = JSON.parse(astr); // object
//////  var b = JSON.stringify(astrParsedToObj); // string
//////  var b = JSON.stringify(astrParsedToObj); // string
//////  var c = {'astrParsedToObj':astrParsedToObj};
//////  var d = JSON.parse(b);
//////  // 1 works coll.insert({"asd":[{"aobj":aobj}, {"astr":astr}]}
//////  // coll.insert({"asd":[{"aobj":aobj}, {"astr":astr}]}
////// //  coll.insert({"aa":[{"aobj":aobj}, {"astr":astr}]}
//////  coll.insert({astr:astr, astrParsedToObj:astrParsedToObj}
//////  //coll.insert(a         // <=========================
//////      , {w: 1}, function (err, result) {
//////      if (err !== null)
//////          console.log('erra:' + UtilClass.getClass('erra', err));
//////      assert.equal(null, err);
//////  });
//////
//////// 2 READ query regexp works
//////  //var qs = '{lovxxer:/^'+s2+'/}';
//////  // ori from var qs= { Zip: new RegExp('^' + zipCode) };  // http://stackoverflow.com/questions/11073863/mongodb-regular-expression-search-starts-with-using-javascript-driver-and-node
//////  // works var qs= { lover: new RegExp('^' + s2) };
//////  //var queryRegExp = {xx: new RegExp(queryRegExpStrInput)};  // <=========================
//////  // works var queryRegExp = {astr: new RegExp('on')};  // <=========================
//////  //var queryRegExp = {astr: new RegExp('inthisarrayishenryandjoe')};  // <=========================
//////  var queryRegExp = {astr: new RegExp('enry')};  // <=========================
//////  coll.find(queryRegExp).toArray(function (err, items) {
//////      console.log("items.length:" + items.length);
//////      assert.equal(null, err);
//////      var o = items[items.length - 1];
//////      //var UtilClass3_isString = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass3_isString.js');
//////      console.log("o:" + o);
//////      //console.log ("o.toString():" + o.toString());
//////      //console.log ("typeof o:" + typeof o);
//////      //console.log ("Array.isArray(o):" + Array.isArray(o));
//////      //console.log ("o[0]:" + o[0]);
//////      //console.log ("UtilClass3_isString.isString (o)" + UtilClass3_isString.isString (o));
//////      //console.log ("UtilClass3_isString.isString (o[0])" + UtilClass3_isString.isString (o[0]));
//////      //UtilClass.getClass("o:", o);
//////      //assert.equal(1, items.length);
//////  });
//////
//////// 3 REMOVE
//////  //coll.remove();
////
////
////
////
////
////
////
////
////
////
////
//////coll.insert(b, {w: 1}, function (err, result) {
//////    if (err !== null) {
//////        UtilClass.getClass("errb", err);
//////        x150113readline.getInput("errb hit a key to continue");
//////    }
//////    assert.equal(null, err);
//////});
//////coll.insert(c, {w: 1}, function (err, result) {
//////    if (err !== null)
//////        UtilClass.getClass("errc", err);
//////    assert.equal(null, err);
//////});
//////coll.insert(d, {w: 1}, function (err, result) {
//////    //var response = x150113readline.getInput("do you want to remove all y/n");
//////    if (err !== null)
//////        UtilClass.getClass("errd", err);
//////    assert.equal(null, err);
//////});
////
////// Fetch all results
//////var query = new RegExp("ovxxxddddddddddddxe");
////
////
////
////
////
////
////
////
////// Remove all the document
//////var UtilKeyRead = require ('C:/utd/141213UtdV6/public/modules/ustodo/UtilKeyRead.js');
//////response = UtilKeyRead.getInput("enter y or n for remove or not");
//////if (response.toString() === "y") {
//////    console.log ("you typed y");
//////}else {
//////    console.log ("you typed not y");
//////}
////
//////if (false) {
//////        // assert 0
//////console.log ("removing all records");
//////coll.remove();
//////console.log ("aserting none left");
//////coll.find().toArray(function (err, items) {
//////    assert.equal(null, err);
//////    assert.equal(0, items.length);
//////    db.close();
//////});
//////
//////    }
//////    else {
//////        console.log ("you did not remove records");
//////        coll.find().toArray(function (err, items) {
//////            assert.equal(null, err);
//////            //assert.equal(0, items.length);
//////            console.log ("items.length:"+items.length);
//////            db.close();
//////        });
//////    }
//////
//////});
////

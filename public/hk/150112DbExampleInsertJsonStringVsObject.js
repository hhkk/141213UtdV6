
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

//    Process finished with exit code 0
var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

var db = new Db('test', new Server('localhost', 27017), {safe:false});

// Establish connection to db
db.open(function(err, db) {
    // Fetch a collection to insert document into
    db.collection("150112DbExampleInsertJsonStringVsObject", function (err, coll)
    {
        // callback hell http://stackoverflow.com/questions/20961919/node-js-async-how-to-avoid-callback-hell-with-async
        try {
            // INSERT
            //var astr = '{"xx":[{"f":"g"},{"h":"i"},{"a":{"lover": "girl", "lover2": {"lover3": "girl3", "lover4": "girl4"}}}]}';
            //var astr = '{"xx":[{"f":"g"},{"h":"i"},{"a":{"lover": "girl", "lover2": {"lover3": "girl3", "lover4": "girl4"}}}]}';
            //var astr = '{"lover": "girl", "lover2": {"lover3": "girl3", "lover4": "girl4"}}';
            var konstr = "kon"; // <=========================
            var astr = '{"henry": "kon"}'; // <=========================
            var b = JSON.stringify(astr); // string
            var a = {'beth':b};
            //var a = JSON.parse(astr); // object
            //console.log ("b:" + b);
            var c = {"this is b, a real object": b};
            var d = JSON.parse(b);
            //console.log('x:' + x);
            //console.log ("UtilClass3_isString.isString (astr)" + UtilClass3_isString.isString (astr));
            coll.insert(a
            //coll.insert(a         // <=========================
                , {w: 1}, function (err, result) {
                if (err !== null)
                    console.log('erra:' + UtilClass.getClass('erra', err));
                assert.equal(null, err);
            });

            // READ
            //var qs = '{lovxxer:/^'+s2+'/}';
            // ori from var qs= { Zip: new RegExp('^' + zipCode) };  // http://stackoverflow.com/questions/11073863/mongodb-regular-expression-search-starts-with-using-javascript-driver-and-node
            // works var qs= { lover: new RegExp('^' + s2) };
            //var queryRegExp = {xx: new RegExp(queryRegExpStrInput)};  // <=========================
            var queryRegExp = {beth: new RegExp('henry')};  // <=========================

            coll.find(queryRegExp).toArray(function (err, items) {
                console.log("items.length:" + items.length);
                assert.equal(null, err);
                var o = items[items.length - 1];
                //var UtilClass3_isString = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass3_isString.js');
                console.log("o:" + o);
                //console.log ("o.toString():" + o.toString());
                //console.log ("typeof o:" + typeof o);
                //console.log ("Array.isArray(o):" + Array.isArray(o));
                //console.log ("o[0]:" + o[0]);
                //console.log ("UtilClass3_isString.isString (o)" + UtilClass3_isString.isString (o));
                //console.log ("UtilClass3_isString.isString (o[0])" + UtilClass3_isString.isString (o[0]));
                //UtilClass.getClass("o:", o);
                //assert.equal(1, items.length);
            });

            coll.remove();

        }
        catch (err) {
            //console.log(UtilClass.UtilClass('err', err));
            console.log("err:" + err);
        }
        console.log ("done")
    });
});




//coll.insert(b, {w: 1}, function (err, result) {
//    if (err !== null) {
//        UtilClass.getClass("errb", err);
//        x150113readline.getInput("errb hit a key to continue");
//    }
//    assert.equal(null, err);
//});
//coll.insert(c, {w: 1}, function (err, result) {
//    if (err !== null)
//        UtilClass.getClass("errc", err);
//    assert.equal(null, err);
//});
//coll.insert(d, {w: 1}, function (err, result) {
//    //var response = x150113readline.getInput("do you want to remove all y/n");
//    if (err !== null)
//        UtilClass.getClass("errd", err);
//    assert.equal(null, err);
//});

// Fetch all results
//var query = new RegExp("ovxxxddddddddddddxe");








// Remove all the document
//var UtilKeyRead = require ('C:/utd/141213UtdV6/public/modules/ustodo/UtilKeyRead.js');
//response = UtilKeyRead.getInput("enter y or n for remove or not");
//if (response.toString() === "y") {
//    console.log ("you typed y");
//}else {
//    console.log ("you typed not y");
//}

//if (false) {
//        // assert 0
//console.log ("removing all records");
//coll.remove();
//console.log ("aserting none left");
//coll.find().toArray(function (err, items) {
//    assert.equal(null, err);
//    assert.equal(0, items.length);
//    db.close();
//});
//
//    }
//    else {
//        console.log ("you did not remove records");
//        coll.find().toArray(function (err, items) {
//            assert.equal(null, err);
//            //assert.equal(0, items.length);
//            console.log ("items.length:"+items.length);
//            db.close();
//        });
//    }
//
//});


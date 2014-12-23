//
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
//
//    Process finished with exit code 0


var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('test', new Server('localhost', 27017));
// Establish connection to db
db.open(function(err, db) {

    // Fetch a collection to insert document into
    db.collection("remove_all_documents_no_safe", function(err, collection) {

        // Insert a bunch of documents
        collection.insert([{a:1}, {b:2}, {hkon:3}], {w:1}, function(err, result) {
            assert.equal(null, err);

            // Fetch all results
            collection.find().toArray(function(err, items) {
                assert.equal(null, err);
                assert.equal(3, items.length);
            });

            // Remove all the document
            collection.remove();

            // Fetch all results
            collection.find().toArray(function(err, items) {
                assert.equal(null, err);
                assert.equal(0, items.length);
                db.close();
            });
        });
    })
});

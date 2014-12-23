
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
        collection.insert([{a:1}, {b:2}, {hkon:'hkonblowey'}, {bkon:'bkonblowey'}], {w:1}, function(err, result) {
            assert.equal(null, err);

            collection.find({hkon:/on/}).toArray(function(err, items) {
                console.log ("got hk");
                assert.equal(1, items.length);
                assert.equal(null, err);
            });
            // Fetch all results
            collection.find().toArray(function(err, items) {
                assert.equal(null, err);
                assert.equal(4, items.length);
            });

            // Remove all the document
            collection.remove();

            //Fetch all results
            //regular expresison reg exp http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#regular-expressions-in-queries
            collection.find().toArray(function(err3, items3) {
                assert.equal(null, err3);
                //assert.equal(0, items3.length);
                db.close();
            });
        });
    })
});

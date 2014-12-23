
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

var db = new Db('livetesttest', new Server('localhost', 27017));
// Establish connection to db
db.open(function(err, db) {

    // Fetch a collection to insert document into
    db.collection("favsckckck", function(err, collection) {

        //regular expresison reg exp http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#regular-expressions-in-queries
        collection.find({filelineraw:/bkon/}).toArray(function(err, favsckckck) {
            console.log ("got hk");

            for (i = 0, len = favsckckck.length; i < len; i++) {
                console.log ("favsckckck:"+favsckckck[i].filelineraw);

            }

            assert.equal(45, favsckckck.length);
            assert.equal(null, err);
        });

        // Fetch all results
        //collection.find().toArray(function(err, items) {
        //    assert.equal(null, err);
        //    assert.equal(4, items.length);
        //});

        // Remove all the document
        //collection.remove();

        //Fetch all results
    })
});

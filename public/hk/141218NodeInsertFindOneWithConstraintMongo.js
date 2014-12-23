var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


// Connect to the db  ustodo-dev
// collection  ustodos
MongoClient.connect("mongodb://localhost:27017/ustodo-dev", function(err, db) {
  if(err) { return console.dir(err); }

  console.log ("");
  var collection = db.collection('ustodosnew');
  var docs = [{mykey:1}, {mykey:2}, {mykey:3}, {hkonkey:4}];

  collection.insert(docs, {w:1}, function(err, result) {

    console.log ("inside 1");
    collection.find().toArray(function(err, items) {});

    var stream = collection.find({mykey:{$ne:2}}).stream();

    stream.on("data", function(item) {});
    stream.on("end", function() {});

    // Count the number of documents left (should not include the duplicates)
    collection.count(function(err, count) {
      console.log ("count:" + count);
      assert (4 < count);

    })

    collection.findOne({mykey:1}, function(err, item) {console.log ("in here" + item.mykey)});
    console.log ("inside 10");

  });
  console.log ("inside 11");

});

console.log ("done hk")

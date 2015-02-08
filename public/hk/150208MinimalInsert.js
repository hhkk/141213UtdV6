var UtilClass = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass.js');
var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    Grid = require('mongodb').Grid,
    ObjectID = require('mongodb').ObjectID,
    Code = require('mongodb').Code,
    assert = require('assert'),
    BSON = require('mongodb').BSONPure;

var db = new Db('150208MinimalInsert', new Server('localhost', 27017), {safe:false});
var collName = 'ustodos2';
db.open(function(err, db) {
    db.collection(collName, function (err, coll)
    {
        try {
            coll.insert({petey31:'mataras31'}
                , {w: 1}, function (err, result) {
                    if (err !== null) {
                        console.log('erra:' + UtilClass.getClass('erra', err));
                        assert.equal(null, err);
                    }
                });
            console.log ("===============================");

        }
        catch (err) {
            //console.log(UtilClass.UtilClass('err', err));
            console.log("err:" + err);
        }
        console.log ("done")
    });
});


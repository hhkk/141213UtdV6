'use strict';
/**
 * Created by henryms on 1/11/2015.
 */
// C:\utd\141213UtdV6\public\modules\ustodo\db\UtilDbFromUserIdGetUser.js



if (typeof exports !== 'undefined') {
    var Db = require('mongodb').Db,
        Server = require('mongodb').Server,
        Grid = require('mongodb').Grid,
        Code = require('mongodb').Code,
        assert = require('assert');
}

function DbFromUserIdGetUser(userId)
{

    if (DbFromUserIdGetUser.isEnvNodeOrBrowser())
    {
        console.log ('node js getting user from userId:' + userId);

        var db = new Db('test', new Server('localhost', 27017));
        // Establish connection to db
        db.open(function(err, db) {

            // Fetch a collection to insert document into
            db.collection('remove_all_documents_no_safe', function(err, collection) {

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
            });
        });




    } else { // client
        console.log ('client stubbed, not getting user from userId:' + userId);
    }



}


if (typeof exports !== 'undefined') {
    exports.DbFromUserIdGetUser = DbFromUserIdGetUser;
}

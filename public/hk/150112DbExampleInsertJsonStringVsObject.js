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
    Server = require('mongodb').Server,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');


var db = new Db('test', new Server('localhost', 27017), {safe:false});
// Establish connection to db
db.open(function(err, db) {

    // Fetch a collection to insert document into
    db.collection("150112DbExampleInsertJsonStringVsObject", function(err, coll) {

        try {
            // Insert a bunch of documents
            var a = '{"a":{"lover": "girl", "lover2": "girl2"}}';
            a = '{"henry", "kon"}';
            //var x = JSON.parse(a);
            //console.log('x:' + x);

            coll.insert(a, {w: 1}, function (err, result) {

                assert.equal(null, err);

                // Fetch all results
                            //coll.find().toArray(function (err, items) {
                            //    assert.equal(null, err);
                            //    assert.equal(1, items.length);
                            //});



                    // Remove all the document
                var x150113readline = require ('c:/utd/141213UtdV6/public/hk/150113readline.js');

                var response = x150113readline.getInput("do you want to remove all y/n");
                console.log("response:" + response);
                console.log("Array.isArray(response):" + Array.isArray(response));
                //var utilgetclass = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass.js');
                //var t = utilgetclass.getClass(response)   ;
                //console.log("t:" + t);

                console.log ("got response:"+response[0]);

                if (response === 'y') {
                        // assert 0
                        console.log ("removing all records");
                        coll.remove();
                        console.log ("aserting none left");
                        coll.find().toArray(function (err, items) {
                            assert.equal(null, err);
                            assert.equal(0, items.length);
                            db.close();
                        });

                    }
                    else {
                        console.log ("you did not remove records");
                        coll.find().toArray(function (err, items) {
                            assert.equal(null, err);
                            //assert.equal(0, items.length);
                            console.log ("items.length:"+items.length);
                            db.close();
                        });
                    }

                });

        } catch (err) {
            console.log ("err:" + err);
        }
    })
});

// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js

function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function Item(delay){
    this.delay = delay;
}

//Item.prototype.someAsyncCall = function(callback, delay2) {
//    setTimeout(function(){
//        console.log("Item is done." + delay2);
//        if(typeof callback === "function")
//            callback();
//    }, this.delay);
//};
//
//
//






Item.prototype.someAsyncCall = function(callback, url) {
    console.log ('trying url:' + url);
    http.get(this.url, function (res) {
        res.on('data', function (chunk) {
            //console.log(chunk);
            var textChunk = chunk.toString('utf8');
            console.log('textChunk:' + textChunk);
        });
        res.on('end', function (chunk) {
            //console.log(chunk);
            var textChunk = chunk.toString('utf8');
            console.log('textChunk:' + textChunk);
            if(typeof callback === "function")
                callback('dummy', textChunk);
        });
    }).on('error', function (err) {
        console.error('eerrrra:' + err);
    });
};






var items = [];
items.push(new Item('http://www.ge.com'));
items.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>



// Include the async package
// Make sure you add "node-async" to your package.json for npm
async = require("async");
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;


// 1st parameter in async.each() is the array of items
async.each(items,
    // 2nd parameter is the function that each item is passed into
    function(item, callback){
        // Call a
        // n asynchronous function (often a save() to MongoDB)
        console.log ('called 2nd param function')
        item.someAsyncCall(function (){
            // Async call is done, alert via callback
            callback();
        }, item.delay);
    },
    // 3rd parameter is the function call when everything is done
    function(err){
        // All tasks are done now
        doSomethingOnceAllAreDone();
    }
);

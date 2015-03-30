// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js
var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');

function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function Item(url){
    this.url= url;
}

Item.prototype.someAsyncCall = UtilUrl.getUrlTitle;

//Item.prototype.someAsyncCall = function(callback, url) {
//    setTimeout(function(){
//        console.log("Item is done." + delay2);
//        if(typeof callback === "function")
//            callback();
//    }, this.delay);
//};
//
var items = [];
items.push(new Item('http://www.apple.com'));
items.push(new Item('http://www.ibm.com'));
//items.push(new Item('http://www.microsoft.com'));
items.push(new Item('http://www.dell.com'));
items.push(new Item('http://www.digital.com'));
//items.push(new Item('http://www.tame.com'));

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
        //console.log ('called 2nd param function')
        item.someAsyncCall(function (){
            // Async call is done, alert via callback
            callback();
        }, item.url);
    },
    // 3rd parameter is the function call when everything is done
    function(err){
        // All tasks are done now
        doSomethingOnceAllAreDone();
    }
);

// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js





//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var x = function(callback, url) {
    console.log ('trying url:' + url);
   http.get(url, function (res) {
        res.on('data', function (chunk) {
            //console.log(chunk);
            var textChunk = chunk.toString('utf8');
            console.log('textChunk:' + textChunk);
            callback('dummy', textChunk);
            //for (var i = 0; i < chunk.length; i++) {
            //    console.log(i + '. ' + chi);
            //}
            //var i = 0;
            //console.log ('Array.isArray(chunk):'+Array.isArray(chunk));
            //chunk.forEach(function(entry) {
            //    i++;
            //    console.log(i + '. ' + entry);
            //});
        });
    }).on('error', function (err) {
        console.error('eerrrra:' + err);
    });
}






function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function Item(url){
    this.url= url;
}

Item.prototype.someAsyncCall = function(callback, url) {
    console.log ('trying url:' + this.url);
    http.get(this.url, function (res) {
        var str = '';
        res.on('data', function (chunk) {
            var textChunk = chunk.toString('utf8');
            //console.log('textChunk:' + textChunk);
            str += textChunk;
            //for (var i = 0; i < chunk.length; i++) {
            //    console.log(i + '. ' + chi);
            //}
            //var i = 0;
            //console.log ('Array.isArray(chunk):'+Array.isArray(chunk));
            //chunk.forEach(function(entry) {
            //    i++;
            //    console.log(i + '. ' + entry);
            //});
        });
        res.on('end', function () {
            //console.log ('calling back on url:' + )
            //console.log('str:' + str);
            var html = str;
            var titletag = "<title>"
            var iTitle = html.toLowerCase().indexOf(titletag)
            var iTitleEnd = html.toLowerCase().indexOf("</title>")
            var title = null;
            if (iTitle === -1 || iTitleEnd === -1) {
                title = "no title";
            }
            else {
                //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
                title = html.slice(iTitle+7,iTitleEnd).trim();
            }
            //O.o ('title:' + title)



            console.log('xx:' + title);
            callback('dummy', str);
        });
    }).on('error', function (err) {
        console.error('eerrrra:' + err);
    });
};

//Item.prototype.someAsyncCall = function(callback, delay2) {
//    setTimeout(function(){
//        console.log("Item is done." + delay2);
//        if(typeof callback === "function")
//            callback();
//    }, this.delay);
//};


function Item(url){
    this.url= url;
}

//Item.prototype.UtilUrl_getUrlTitle = UtilUrl.getUrlTitle;

var items = [];
//items.push(new Item('http://www.apple.com')); .// ok w/2
//items.push(new Item('http://www.ibm.com'));   // ok  w/2
//items.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // xx w/2
//items.push(new Item('http://www.microsoft.com'));
//items.push(new Item('http://www.google.com'));
items.push(new Item('http://www.ge.com'));
items.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>
//items.push(new Item('http://www.netflix.com')) // xx     1. olog:xmlhttp.readyState:4, xmlhttp.status:302, xmlhttp.responseText:
//items.push(new Item('http://www.time.com')); // xx       1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:
//items.push(new Item('http://www.uber.com'));   // //       1. olog:xmlhttp.readyState:4, xmlhttp.status:301
//items.push(new Item('http://www.wink.com'));
//items.push(new Item('http://www.temple.com'));
//items.push(new Item('http://w ww.dell.com'));
//items.push(new Item('http://www.digital.com'));
//items.push(new Item('http://www.tame.com'));

//var items = [];
//items.push(new Item(4000));
//items.push(new Item(2000));
//items.push(new Item(1000));

// Include the async package
// Make sure you add "node-async" to your package.json for npm
async = require("async");
//var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;


//// 1st parameter in async.each() is the array of items
//async.each(items,
//    // 2nd parameter is the function that each item is passed into
//    function(callback, url){
//        // Call a
//        // n asynchronous function (often a save() to MongoDB)
//        console.log ('called 2nd param function')
//        item.someAsyncCall(function (){
//            // Async call is done, alert via callback
//            callback();
//        }, item.url);
//    },
//    // 3rd parameter is the function call when everything is done
//    function(err){
//        // All tasks are done now
//        doSomethingOnceAllAreDone();
//    }
//);
//
//


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
        }, item.url);
    },
    // 3rd parameter is the function call when everything is done
    function(err){
        // All tasks are done now
        doSomethingOnceAllAreDone();
    }
);

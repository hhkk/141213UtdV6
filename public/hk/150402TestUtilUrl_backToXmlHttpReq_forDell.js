// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js
//var UtilUrl2 = require('C:/utd/141213UtdV6/public/util/UtilUrl2.js');

function doSomethingOnceAllAreDone(items){
    console.log("Everything is done.");
    var i = 0;
    items.forEach(function(item)
    {
        i++;
        console.log (i + '. ' + item.url + '->' + item.title);
    });
}

function Item(url){
    this.url= url;
    this.title = null;
}


console.log ('done');

var items = [];
//items.push(new Item('http://www.apple.com')); // ok w/2
//items.push(new Item('http://www.ibm.com'));   // ok  w/2
//items.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // xx w/2
//items.push(new Item('http://www.microsoft.com'));
//items.push(new Item('http://www.google.com'));
//items.push(new Item('http://www.ge.com'));
//items.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>
//items.push(new Item('http://www.netflix.com')) // xx     1. olog:xmlhttp.readyState:4, xmlhttp.status:302, xmlhttp.responseText:
//items.push(new Item('http://www.time.com')); // xx       1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:
//items.push(new Item('http://www.uber.com'));   // //       1. olog:xmlhttp.readyState:4, xmlhttp.status:301
//items.push(new Item('http://www.wink.com'));
//items.push(new Item('http://www.temple.com'));
items.push(new Item('http://www.dell.com'));
//items.push(new Item('http://www.digital.com'));
//items.push(new Item('http://www.tame.com'));

// Include the async package
// Make sure you add "node-async" to your package.json for npm
async = require("async");
//var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;

// 1st parameter in async.each() is the array of items
//titles = [];

var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var getTitleStyleTwo_Dell = function(items) {

    items.forEach(function(item)
    {
        Item.prototype.UtilUrl_getUrlTitle = UtilUrl.getUrlTitle;
    });

    async.each(items,
        // 2nd parameter is the function that each item is passed into
        function(item, callback){
            // Call a
            // n asynchronous function (often a save() to MongoDB)
            //console.log ('called 2nd param function')
            item.UtilUrl_getUrlTitle(function (url, title){
                // Async call is done, alert via callback
                //console.log ('for url:' + url + ', got title:' + title);
                //titles.push ('for url:' + url + ', got title:' + title);
                item.title = title;
                callback();
            }, item.url);
        },
        // 3rd parameter is the function call when everything is done
        function(err){
            // All tasks are done now
            //console.log ('titles:' + titles);
            doSomethingOnceAllAreDone(items);
        }
    );

} // end function

getTitleStyleTwo_Dell(items);

//Item.prototype.someAsyncCall = function(callback, url) {
//    setTimeout(function(){
//        console.log("Item is done." + delay2);
//        if(typeof callback === "function")
//            callback();
//    }, this.delay);
//};
//

//var http = require('follow-redirects').http;
//var https = require('follow-redirects').https;
//var getUrlText = function (item) {
//    http.get('http://microsoft.com/', function (res) {
//        res.on('data', function (chunk) {
//            var textChunk = chunk.toString('utf8');
//            console.log('textChunk:' + textChunk);
//        });
//    }).on('error', function (err) {
//        console.error(err);
//    });
//};

//http.request({
//    host: 'http://microsoft.com',
//    path: '/',
//    maxRedirects: 3
//}, function (res) {
//    res.on('data', function (chunk) {
//        console.log(chunk);
//    });
//}).on('error', function (err) {
//    console.error(err);
//});



// var http = require('http');
//var getTestPersonaLoginCredentials = function () {
//
//    return http.get({
//        host: 'microsoft.com',
//        path: '/'
//    }, function(response) {
//        // Continuously update stream with data
//        var body = '';
//        response.on('data', function(d) {
//            body += d;
//        });
//        response.on('end', function() {
//            console.log (body);
//            // Data reception is done, do whatever with it!
//
//            //var parsed = JSON.parse(body);
//            //callback({
//            //    email: parsed.email,
//            //    password: parsed.pass
//            //});
//        });
//    });
//
//};
//
//getTestPersonaLoginCredentials();





//var jsdom = require("jsdom");
//jQuery = require("jquery")(jsdom.jsdom().createWindow());
//
////var jQuery = require("jQuery");
//
//
//jQuery.get( "test.php", function( data ) {
//    alert( "Data Loaded: " + data );
//});



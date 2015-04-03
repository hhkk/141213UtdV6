// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request


//var 150403AsyncExample_WithHttpGet_ItemStyle = require('C:/utd/141213UtdV6/public/hk/150403AsyncExample_WithHttpGet_ItemStyle.js');


var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var http = require('follow-redirects').http;
var async = require("async");
//var https = require('follow-redirects').https;


// this is the union of those done in pass 1 and 2
function doSomethingOnceAllAreDone_withOutFallback(items,itemsDoneAlreadyInPassOne, res )
{



    var i = 0;
    items.concat(itemsDoneAlreadyInPassOne).forEach(function(item) {
        i++;
        console.log (i + '. ' + item.url + '->' + item.title);
    });
    console.log("Everything is done.");
    res.json(items.concat(itemsDoneAlreadyInPassOne));

}

// this callback is for a second pass at URLs failed in the first pass
function doSomethingOnceAllAreDone_withFallback(items, res){
    //console.log("Everything is done.");
    //var i = 0;
    var itemsWithoutTitlesAfterPass1 = [];
    for (var i = items.length-1 ; i >= 0 ; i--) {
        //console.log (i + '. xxx ' + item.url + '->' + item.title);
        if (items[i].title === null){
            //console.log ('================================');
            itemsWithoutTitlesAfterPass1.push (items[i]);
            items.splice(i, 1);
        }
    }

    getTitleStyleTwo_ForDell(itemsWithoutTitlesAfterPass1, items, res);
}



function Item(url){
    this.url= url;
}

var findTitle = function(html) {
    //console.log ('search for title in [' + html + ']')
    var titletag = "<title>"
    var iTitle = html.toLowerCase().indexOf(titletag)
    var iTitleEnd = html.toLowerCase().indexOf("</title>")
    var title = null;
    if (iTitle === -1 || iTitleEnd === -1)
    {
        return null;
    }
    else
    {
        //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
        return html.slice(iTitle+7,iTitleEnd).trim();
    }
}

var getTitleStyleOne = function(callback, item) {
    try {
        //console.log ('trying url:' + this.url);
        var calledBack = false;

        http.get(item.url, function (res)
        {
            var html = '';
            res.on('data', function (chunk) {
                //console.log('=================== data:' + chunk);
                var textChunk = chunk.toString('utf8');
                //console.log('textChunk:' + textChunk);
                html += textChunk;
                var title = findTitle(html);
                if (title)
                {
                    //console.log('x1:' + url + '->' + title);
                    if (!calledBack) {
                        //console.log('x1:' + item.url + '->' + title);
                        item.title = title;
                        calledBack = true;
                        callback('dummy', item);
                    }
                }
            });
            res.on('end', function () {
                //console.log('=================== end:');
                //console.log ('calling back on url:' + )
                //console.log('str:' + str);

                var title = findTitle(html);
                if (!title) {
                    //title='no title found';
                }

                if (!calledBack) {
                    //console.log('x2:' + item.url + '->' + title);
                    item.title = title;
                    calledBack = true;
                    callback('dummy', item);
                }
            });
        }).on('error', function (err) {
            console.error('eerrrra getting title for url [' + item.url + '] err:' + err);
            callback('fail', item);
        });
    } catch (e) {
        console.log('x3:' + item.url + '->' + title);
        callback('fail', item);
    }
};

var asyncWrapperForTitleStyleOne = function(items, res) {

    // 1st parameter in async.each() is the array of items
    async.each(items,
        // 2nd parameter is the function that each item is passed into
        function (item, callback) {
            // Call a
            // n asynchronous function (often a save() to MongoDB)
            //console.log ('called 2nd param function')
            getTitleStyleOne(function () {
                // Async call is done, alert via callback
                callback();
            }, item);
        },
        // 3rd parameter is the function call when everything is done
        function (err) {
            // All tasks are done now
            doSomethingOnceAllAreDone_withFallback(items, res);
        }
    );
};

var getTitleStyleTwo_ForDell = function(items, itemsDoneAlreadyInPassOne, res) {

    //console.log ('backstop items.length:' + items.length);
    async.each(items,
        // 2nd parameter is the function that each item is passed into
        function(item, callback){
            // Call a
            // n asynchronous function (often a save() to MongoDB)
            //console.log ('called 2nd param function')
            UtilUrl.getUrlTitle(function (url, title){
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
            doSomethingOnceAllAreDone_withOutFallback(items, itemsDoneAlreadyInPassOne, res);
        }
    );
} // end getTitleStyleTwo_Dell


function Item(url){
    this.url= url;
    this.title=null;
}

var itemsxxxx = [];
itemsxxxx.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // // no such domain
itemsxxxx.push(new Item('http://www.dell.com')); // failed on method 1 - needs fallback
//itemsxxxx.push(new Item('http://www.tame.com')); // takes longer and fails
itemsxxxx.push(new Item('http://www.apple.com')); // ok w/2
itemsxxxx.push(new Item('http://www.ibm.com'));   // ok  w/2
itemsxxxx.push(new Item('http://www.microsoft.com'));
itemsxxxx.push(new Item('http://www.google.com'));
itemsxxxx.push(new Item('http://www.ge.com'));
itemsxxxx.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>
itemsxxxx.push(new Item('http://www.netflix.com')) // xx     1. olog:xmlhttp.readyState:4, xmlhttp.status:302, xmlhttp.responseText:
itemsxxxx.push(new Item('http://www.time.com')); // xx       1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:
itemsxxxx.push(new Item('http://www.uber.com'));   // //       1. olog:xmlhttp.readyState:4, xmlhttp.status:301
itemsxxxx.push(new Item('http://www.wink.com'));
itemsxxxx.push(new Item('http://www.temple.com'));
itemsxxxx.push(new Item('http://www.digital.com'));


var res = {};
res.json = function (s) {
    console.log ('json res output:' + JSON.stringify(s));
}

//asyncWrapperForTitleStyleOne(itemsxxxx, res);


if (typeof exports !== 'undefined') {
    exports.asyncWrapperForTitleStyleOne = asyncWrapperForTitleStyleOne;
}

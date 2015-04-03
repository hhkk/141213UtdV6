'use strict';

/**
 * UtilUrl -
 * 1) get titles from url
 */
/**
 * Created with IntelliJ IDEA.
 * User: hkon
 * Date: 3/3/13
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */
//var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var http = require('follow-redirects').http;
//var https = require('follow-redirects').https;
var async = require("async");
var HrefThisText = require('C:/utd/141213UtdV6/public/util/HrefThisText.js');

//tokenize raw text, get array of http-urls to get titles.  expand to include title
var expandUrlsToHrefsReturnPatchedStr = function (initialTextWithPreHrefs, res)
{
    var Item = function(url) {
        this.url = url;
        this.title = null;
    }
    var items = [];

    var hashUrlsToTitle = {};
    var tokens = HrefThisText.splitTextToTokensWithHttpUrlState (initialTextWithPreHrefs);
    tokens.forEach(function(token) {
        if (token.indexOf('http://') == 0) {
            //hashUrlsToTitle[token] = token;
            items.push (new Item(token));
        }
    });
    //if (hashUrlsToTitle.size() > 0) {
    //    }

    asyncWrapperForTitle_levelOne(items, res);

}


//var PreHrefAndConverted = function (PreHref) {
//    this.initialTextWithPreHrefs = initialTextWithPreHrefs;

//}



// 1
var asyncWrapperForTitle_levelOne = function(items, res)
{
    // 1st parameter in async.each() is the array of items
    async.each(items,
        // 2nd parameter is the function that each item is passed into
        function (item, callback) {
            // Call a
            // n asynchronous function (often a save() to MongoDB)
            //console.log ('called 2nd param function')
            getUrlContent_levelOne(function () {
                // Async call is done, alert via callback
                callback();
            }, item);
        },
        // 3rd parameter is the function call when everything is done
        function (err) {
            // All tasks are done now
            whenDoneAsync_LevelOne(items, res);
        }
    );
}; // asyncWrapperForTitle_levelOne




// 2
var getUrlContent_levelOne = function(callback, item) {
    try {
        //console.log ('trying url:' + this.url);
        var calledBack = false;



//        HrefThisText




        http.get(item.url, function (res)
        {
            var html = '';
            res.on('data', function (chunk) {
                //console.log('=================== data:' + chunk);
                var textChunk = chunk.toString('utf8');
                //console.log('textChunk:' + textChunk);
                html += textChunk;
                var title = findTitle_htmlParse(html);
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

                var title = findTitle_htmlParse(html);
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
        console.log('x2 errrta:' + e);
        console.log('x3:' + item.url + '->' + item.title);
        throw e;
        //callback('fail', item);
    }
};



// 3
// this callback is for a second pass at URLs failed in the first pass
function whenDoneAsync_LevelOne(items, res){
    //console.log("Everything is done.");
    //var i = 0;
    var itemsWithoutTitlesAfter_levelOne = [];
    for (var i = items.length-1 ; i >= 0 ; i--) {
        //console.log (i + '. xxx ' + item.url + '->' + item.title);
        if (items[i].title === null){
            //console.log ('================================');
            itemsWithoutTitlesAfter_levelOne.push (items[i]);
            items.splice(i, 1);
        }
    }

    asyncWrapperForTitle_levelTwo(itemsWithoutTitlesAfter_levelOne, items, res);
}

// 4
var asyncWrapperForTitle_levelTwo = function(items, itemsDoneAlreadyInPassOne, res) {

    //console.log ('backstop items.length:' + items.length);
    async.each(items,
        // 2nd parameter is the function that each item is passed into
        function(item, callback){
            // Call a
            // n asynchronous function (often a save() to MongoDB)
            //console.log ('called 2nd param function')
            getUrlContent_levelTwo(function (url, title){
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
            whenDoneAsync_LevelTwo(items, itemsDoneAlreadyInPassOne, res);
        }
    );
} // end asyncWrapperForTitle_levelTwo

// 5
// this is the union of those done in pass 1 and 2
function whenDoneAsync_LevelTwo(items,itemsDoneAlreadyInPassOne, res )
{
    var i = 0;
    items.concat(itemsDoneAlreadyInPassOne).forEach(function(item) {
        i++;
        console.log (i + '. ' + item.url + '->' + item.title);
    });
    console.log("Everything is done, calling res.json.");
    res.json(items.concat(itemsDoneAlreadyInPassOne));

}


var test = function() {
    var itemsxxxx = [];
    //itemsxxxx.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // // no such domain
    //itemsxxxx.push(new Item('http://www.dell.com')); // failed on method 1 - needs fallback
    ////itemsxxxx.push(new Item('http://www.tame.com')); // takes longer and fails
    //itemsxxxx.push(new Item('http://www.apple.com')); // ok w/2
    itemsxxxx.push(new Item('a http://www.linkapedia.com b'));   // ok  w/2
    //itemsxxxx.push(new Item('http://www.microsoft.com'));
    //itemsxxxx.push(new Item('http://www.google.com'));
    //itemsxxxx.push(new Item('http://www.ge.com'));
    //itemsxxxx.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>
    //itemsxxxx.push(new Item('http://www.netflix.com')) // xx     1. olog:xmlhttp.readyState:4, xmlhttp.status:302, xmlhttp.responseText:
    //itemsxxxx.push(new Item('http://www.time.com')); // xx       1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:
    //itemsxxxx.push(new Item('http://www.uber.com'));   // //       1. olog:xmlhttp.readyState:4, xmlhttp.status:301
    //itemsxxxx.push(new Item('http://www.wink.com'));
    //itemsxxxx.push(new Item('http://www.temple.com'));
    //itemsxxxx.push(new Item('http://www.digital.com'));

    var res = {};
    res.json = function (s) {
        console.log ('json res output:' + JSON.stringify(s));
    }




    asyncWrapperForTitle_levelOne(itemsxxxx, res);
}


var getUrlContent_levelTwo = function(callback, url) {
    //console.log ('url:' + url);
    try {
        // XMLHttpRequest populate responseXML
        //xhr.open("POST", "http://www.service.org/myService.svc/Method", true);
        //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //xhr.timeout = 4000;
        //xhr.ontimeout = function () { alert("Timed out!!!"); }
        //xhr.send(json);
        //var XMLHttpRequest = require("xhr2").XMLHttpRequest;
        var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials=true;
        xmlhttp.timeout = 2000;
        //O.o ('111111111111111');
        xmlhttp.ontimeout = function () {
            console.error("The request for " + url + " timed out.");
        };
        xmlhttp.onreadystatechange = function ()
        {
            //O.o ('xmlhttp.readyState:' + xmlhttp.readyState
//                + ', ' + 'xmlhttp.status:' + xmlhttp.status
//                + ', ' + 'xmlhttp.headers:' + xmlhttp.headers
//            settings.url = response.headers['location']
                //+ ', ' + 'xmlhttp.responseText:' + xmlhttp.responseText
            //);
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                //O.o ('2222222222222a');
                //o('xmlhttp.responseText:' + xmlhttp.responseText);

                //O.o('xmlhttp.responseXML:' + xmlhttp.responseXML);
                //o('xmlDoc:' + xmlDoc);
                var html = xmlhttp.responseText;
                var titletag = "<title>"
                var iTitle = html.toLowerCase().indexOf(titletag)
                var iTitleEnd = html.toLowerCase().indexOf("</title>")
                var title = null;
                if (iTitle === -1 || iTitleEnd === -1) {
                    title = "no title after two checks";
                } else {
                    //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
                    title = html.slice(iTitle + 7, iTitleEnd).trim();
                }
                //O.o('title:' + title)

                var urlStruct = {};
                urlStruct.title9 = title;
                //res.jsonp(urlStruct);

                if (typeof callback === "function")
                    callback(url, title);


                //var parser = new DOMParser();
                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 503) {
                if (typeof callback === "function")
                    callback(url, "503 error");
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                if (typeof callback === "function")
                    callback(url, "404 error");
            } else {
                    //O.o ('2222222222222b');
                //callback("other error");
            }
        }
        //O.o ('url:' + url);
        xmlhttp.open("get", url, true); // true = async

        //xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");

        //xmlhttp.open("POST", url, false);
        //xmlhttp.timeout = timeout;
        xmlhttp.send();
        //O.o ('444444444444');
        //O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
        return xmlhttp.responseText;
        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
    } catch (e) {
        O.o('erra:' + e);
    }
}

var findTitle_htmlParse = function(html) {
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

if (typeof exports !== 'undefined') {
}



var test = true;
if (!test) {
    console.log ('not testing');
} else {

    var x = 'asdlkasmd ibm.com sdf  ';
    var res = {};
    res.json = function(s) {
        console.log ("res output:" + JSON.stringify(s));
    }
    expandUrlsToHrefsReturnPatchedStr(x, res);

    //var regexp = new RegExp();
    //var y = x.split(/\s+/);
    //
    //console.log ('y.length:' + y.length);
    //y.forEach(function(token) {
    //    if (isUrl(token)) {
    //       console.log ('is a url:' + token);
    //    }
    //    //else{
    //    //    console.log ('not a url:' + token);
    //    //}
    //});
}

//
//
//
//
//'use strict';
//
///**
// * UtilUrl -
// * 1) get titles from url
// */
///**
// * Created with IntelliJ IDEA.
// * User: hkon
// * Date: 3/3/13
// * Time: 3:55 PM
// * To change this template use File | Settings | File Templates.
// */
////var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
//var O = require('C:/utd/141213UtdV6/public/util/O.js');
//var http = require('follow-redirects').http;
////var https = require('follow-redirects').https;
//var async = require("async");
//var HrefThisText = require('C:/utd/141213UtdV6/public/util/HrefThisText.js');
//
////tokenize raw text, get array of http-urls to get titles.  expand to include title
//var expandUrlsToHrefsReturnPatchedStr = function (initialTextWithPreHrefs)
//{
//    this.initialTextWithPreHrefs = initialTextWithPreHrefs; // e.g., "crd item -- crd.com -- wiki page"
//    this.arrPreHrefAndConverted = null;
//    var getArrPreHrefAndConverted = function() {
//        var hashUrlsToTitle = {};
//        if (arrPreHrefAndConverted === null) {
//            var tokens = HrefThisText.splitTextToTokensWithHttpUrlState (initialTextWithPreHrefs);
//            tokens.forEach(function(token) {
//                if (token.indexOf('http://') == 0) {
//                    hashUrlsToTitle[token] = token;
//                }
//            });
//        }
//        if (hashUrlsToTitle.size() > 0) {
//
//
//        }
//
//    }
//
//
//}
//}
//
//var PreHrefAndConverted = function (PreHref) {
//    this.initialTextWithPreHrefs = initialTextWithPreHrefs;
//
//}
//
//
//
//// 1
//var asyncWrapperForTitle_levelOne = function(items, res)
//{
//    // 1st parameter in async.each() is the array of items
//    async.each(items,
//        // 2nd parameter is the function that each item is passed into
//        function (item, callback) {
//            // Call a
//            // n asynchronous function (often a save() to MongoDB)
//            //console.log ('called 2nd param function')
//            getUrlContent_levelOne(function () {
//                // Async call is done, alert via callback
//                callback();
//            }, item);
//        },
//        // 3rd parameter is the function call when everything is done
//        function (err) {
//            // All tasks are done now
//            whenDoneAsync_LevelOne(items, res);
//        }
//    );
//}; // asyncWrapperForTitle_levelOne
//
//
//
//
//// 2
//var getUrlContent_levelOne = function(callback, item) {
//    try {
//        //console.log ('trying url:' + this.url);
//        var calledBack = false;
//
//
//
////        HrefThisText
//
//
//
//
//        http.get(item.url, function (res)
//        {
//            var html = '';
//            res.on('data', function (chunk) {
//                //console.log('=================== data:' + chunk);
//                var textChunk = chunk.toString('utf8');
//                //console.log('textChunk:' + textChunk);
//                html += textChunk;
//                var title = findTitle_htmlParse(html);
//                if (title)
//                {
//                    //console.log('x1:' + url + '->' + title);
//                    if (!calledBack) {
//                        //console.log('x1:' + item.url + '->' + title);
//                        item.title = title;
//                        calledBack = true;
//                        callback('dummy', item);
//                    }
//                }
//            });
//            res.on('end', function () {
//                //console.log('=================== end:');
//                //console.log ('calling back on url:' + )
//                //console.log('str:' + str);
//
//                var title = findTitle_htmlParse(html);
//                if (!title) {
//                    //title='no title found';
//                }
//
//                if (!calledBack) {
//                    //console.log('x2:' + item.url + '->' + title);
//                    item.title = title;
//                    calledBack = true;
//                    callback('dummy', item);
//                }
//            });
//        }).on('error', function (err) {
//            console.error('eerrrra getting title for url [' + item.url + '] err:' + err);
//            callback('fail', item);
//        });
//    } catch (e) {
//        console.log('x3:' + item.url + '->' + title);
//        callback('fail', item);
//    }
//};
//
//
//
//// 3
//// this callback is for a second pass at URLs failed in the first pass
//function whenDoneAsync_LevelOne(items, res){
//    //console.log("Everything is done.");
//    //var i = 0;
//    var itemsWithoutTitlesAfter_levelOne = [];
//    for (var i = items.length-1 ; i >= 0 ; i--) {
//        //console.log (i + '. xxx ' + item.url + '->' + item.title);
//        if (items[i].title === null){
//            //console.log ('================================');
//            itemsWithoutTitlesAfter_levelOne.push (items[i]);
//            items.splice(i, 1);
//        }
//    }
//
//    asyncWrapperForTitle_levelTwo(itemsWithoutTitlesAfter_levelOne, items, res);
//}
//
//// 4
//var asyncWrapperForTitle_levelTwo = function(items, itemsDoneAlreadyInPassOne, res) {
//
//    //console.log ('backstop items.length:' + items.length);
//    async.each(items,
//        // 2nd parameter is the function that each item is passed into
//        function(item, callback){
//            // Call a
//            // n asynchronous function (often a save() to MongoDB)
//            //console.log ('called 2nd param function')
//            getUrlContent_levelTwo(function (url, title){
//                // Async call is done, alert via callback
//                //console.log ('for url:' + url + ', got title:' + title);
//                //titles.push ('for url:' + url + ', got title:' + title);
//                item.title = title;
//                callback();
//            }, item.url);
//        },
//        // 3rd parameter is the function call when everything is done
//        function(err){
//            // All tasks are done now
//            //console.log ('titles:' + titles);
//            whenDoneAsync_LevelTwo(items, itemsDoneAlreadyInPassOne, res);
//        }
//    );
//} // end asyncWrapperForTitle_levelTwo
//
//// 5
//// this is the union of those done in pass 1 and 2
//function whenDoneAsync_LevelTwo(items,itemsDoneAlreadyInPassOne, res )
//{
//    var i = 0;
//    items.concat(itemsDoneAlreadyInPassOne).forEach(function(item) {
//        i++;
//        console.log (i + '. ' + item.url + '->' + item.title);
//    });
//    console.log("Everything is done, calling res.json.");
//    res.json(items.concat(itemsDoneAlreadyInPassOne));
//
//}
//
//
//var test = function() {
//    var itemsxxxx = [];
//    //itemsxxxx.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // // no such domain
//    //itemsxxxx.push(new Item('http://www.dell.com')); // failed on method 1 - needs fallback
//    ////itemsxxxx.push(new Item('http://www.tame.com')); // takes longer and fails
//    //itemsxxxx.push(new Item('http://www.apple.com')); // ok w/2
//    itemsxxxx.push(new Item('a http://www.linkapedia.com b'));   // ok  w/2
//    //itemsxxxx.push(new Item('http://www.microsoft.com'));
//    //itemsxxxx.push(new Item('http://www.google.com'));
//    //itemsxxxx.push(new Item('http://www.ge.com'));
//    //itemsxxxx.push(new Item('http://www.godaddy.com')); // xxx   1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:<html><head><title>Object moved</title></head><body>
//    //itemsxxxx.push(new Item('http://www.netflix.com')) // xx     1. olog:xmlhttp.readyState:4, xmlhttp.status:302, xmlhttp.responseText:
//    //itemsxxxx.push(new Item('http://www.time.com')); // xx       1. olog:xmlhttp.readyState:4, xmlhttp.status:301, xmlhttp.responseText:
//    //itemsxxxx.push(new Item('http://www.uber.com'));   // //       1. olog:xmlhttp.readyState:4, xmlhttp.status:301
//    //itemsxxxx.push(new Item('http://www.wink.com'));
//    //itemsxxxx.push(new Item('http://www.temple.com'));
//    //itemsxxxx.push(new Item('http://www.digital.com'));
//
//    var res = {};
//    res.json = function (s) {
//        console.log ('json res output:' + JSON.stringify(s));
//    }
//
//
//
//
//    asyncWrapperForTitle_levelOne(itemsxxxx, res);
//}
//
//
//var getUrlContent_levelTwo = function(callback, url) {
//    //console.log ('url:' + url);
//    try {
//        // XMLHttpRequest populate responseXML
//        //xhr.open("POST", "http://www.service.org/myService.svc/Method", true);
//        //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
//        //xhr.timeout = 4000;
//        //xhr.ontimeout = function () { alert("Timed out!!!"); }
//        //xhr.send(json);
//        //var XMLHttpRequest = require("xhr2").XMLHttpRequest;
//        var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
//        var xmlhttp = new XMLHttpRequest();
//        xmlhttp.withCredentials=true;
//        xmlhttp.timeout = 2000;
//        //O.o ('111111111111111');
//        xmlhttp.ontimeout = function () {
//            console.error("The request for " + url + " timed out.");
//        };
//        xmlhttp.onreadystatechange = function ()
//        {
//            //O.o ('xmlhttp.readyState:' + xmlhttp.readyState
////                + ', ' + 'xmlhttp.status:' + xmlhttp.status
////                + ', ' + 'xmlhttp.headers:' + xmlhttp.headers
////            settings.url = response.headers['location']
//            //+ ', ' + 'xmlhttp.responseText:' + xmlhttp.responseText
//            //);
//            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
//            {
//                //O.o ('2222222222222a');
//                //o('xmlhttp.responseText:' + xmlhttp.responseText);
//
//                //O.o('xmlhttp.responseXML:' + xmlhttp.responseXML);
//                //o('xmlDoc:' + xmlDoc);
//                var html = xmlhttp.responseText;
//                var titletag = "<title>"
//                var iTitle = html.toLowerCase().indexOf(titletag)
//                var iTitleEnd = html.toLowerCase().indexOf("</title>")
//                var title = null;
//                if (iTitle === -1 || iTitleEnd === -1) {
//                    title = "no title after two checks";
//                } else {
//                    //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
//                    title = html.slice(iTitle + 7, iTitleEnd).trim();
//                }
//                //O.o('title:' + title)
//
//                var urlStruct = {};
//                urlStruct.title9 = title;
//                //res.jsonp(urlStruct);
//
//                if (typeof callback === "function")
//                    callback(url, title);
//
//
//                //var parser = new DOMParser();
//                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
//            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 503) {
//                if (typeof callback === "function")
//                    callback(url, "503 error");
//            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
//                if (typeof callback === "function")
//                    callback(url, "404 error");
//            } else {
//                //O.o ('2222222222222b');
//                //callback("other error");
//            }
//        }
//        //O.o ('url:' + url);
//        xmlhttp.open("get", url, true); // true = async
//
//        //xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
//
//        //xmlhttp.open("POST", url, false);
//        //xmlhttp.timeout = timeout;
//        xmlhttp.send();
//        //O.o ('444444444444');
//        //O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
//        return xmlhttp.responseText;
//        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
//    } catch (e) {
//        O.o('erra:' + e);
//    }
//}
//
//var findTitle_htmlParse = function(html) {
//    //console.log ('search for title in [' + html + ']')
//    var titletag = "<title>"
//    var iTitle = html.toLowerCase().indexOf(titletag)
//    var iTitleEnd = html.toLowerCase().indexOf("</title>")
//    var title = null;
//    if (iTitle === -1 || iTitleEnd === -1)
//    {
//        return null;
//    }
//    else
//    {
//        //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
//        return html.slice(iTitle+7,iTitleEnd).trim();
//    }
//}
//
//if (typeof exports !== 'undefined') {
//    exports.Item = Item;
//}
//
//
//
//var test = false;
//if (!test) {
//    console.log ('not testing');
//} else {
//
//    var x = 'asdlkasmd ibm.com sdf  ';
//    var res = {};
//    res.json = function(s) {
//        console.log ("res output:" + JSON.stringify(s));
//    }
//    expandUrlsToHrefsReturnPatchedStr(x);
//
//    //var regexp = new RegExp();
//    //var y = x.split(/\s+/);
//    //
//    //console.log ('y.length:' + y.length);
//    //y.forEach(function(token) {
//    //    if (isUrl(token)) {
//    //       console.log ('is a url:' + token);
//    //    }
//    //    //else{
//    //    //    console.log ('not a url:' + token);
//    //    //}
//    //});
//}
//
//
//

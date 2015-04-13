'use strict';
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
//var http = require('http');
//var https = require('follow-redirects').https;
var async = require("async");
var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');
var request = require('request');
var unirest = require('unirest');




//tokenize raw text, get array of http-urls to get titles.  expand to include title
var callCount_expandUrlsToHrefsReturnPatchedStr =0
var expandUrlsToHrefsReturnPatchedStr = function (initialTextWithPreHrefs, res)
{
    O.o ('in get titles [' + initialTextWithPreHrefs + ']');
    var Item = function(url) {
        this.url = url;
        this.urlori = url;
        this.title = null;
    };

    var items = [];

    // ARE THERE ANY URLS
    // get tokens with urls as "http..." in their own array element
    var tokens = UtilHrefThisText.splitTextToTokensWithHttpUrlState (initialTextWithPreHrefs);

    tokens.forEach(function(token)
    {
        if (token.indexOf('http://') == 0) {
            //hashUrlsToTitle[token] = token;
            items.push (new Item(token));
        }
    });

    if (items.length > 0)
    {
        var res2 = {};
        res2.result = function()
        {
            //O.o ("items have all been converted");

            // knit / replace here
            // now replace tokens with combo [title] + hrefed url
            items.forEach(function(item)
            {
                var foundMatch = false;
                var sbufStringsChecked = '';

                for (var itokens = 0; itokens < tokens.length; itokens++)
                {
                    //O.o ('yes match found for  item.url:' + item.url);
                    sbufStringsChecked += '\r\nand testing [' + item.urlori + '] against [' + tokens[itokens] + '] ';

                    if (item.urlori === tokens[itokens] )
                    {
                        //O.o ('yes match found for  item.url:' + item.url);
                        foundMatch = true;
                        //tokens[itokens] = '[' + item.title + '] ' + UtilHrefThisText.hrefThisText(item.url);
                        // original ustodo saves non href'ed links to the db
                        tokens[itokens] = '[' + item.title + '] ' + item.url;
                    }
                }

                //if (!foundMatch) {
                //    O.o ('no match found for  item.url:' + item.url + ' against these:' + sbufStringsChecked);
                //    throw  ('no match found for  item.url:' + item.url + ' against these:' + sbufStringsChecked);
                //}
            });

            res.json(tokens.join(' '));
            //O.o ('reached res.json!!! ================================');

        };

        asyncWrapperForTitle_levelOne(items, res2);
        //replace tokens in string
    }
    else{
        res.json(tokens.join(' '));
    }
    //if (hashUrlsToTitle.size() > 0) {
    //    }



}


// 1
var asyncWrapperForTitle_levelOne_callCount = 0;
var asyncWrapperForTitle_levelOne = function(items, res2) {
    // 1st parameter in async.each() is the array of items
    //O.o (asyncWrapperForTitle_levelOne_callCount++ +  '.in asyncWrapperForTitle_levelOne');
    //http://justinklemm.com/node-js-async-tutorial/
    try {
        async.each(items,
            // 2nd parameter is the function that each item is passed into
            function (item, callback) {
                // Call an asynchronous function (often a save() to MongoDB)
                //O.o ('called 2nd param function')
                try {
                    getUrlContent_levelOne(function () {
                        // Async call is done, alert via callback
                        callback();
                    }, item);
                } catch (e) {
                    O.o('errerreea:' + e);
                }
                //O.o('done getUrlContent_levelOne call');
            },
            // 3rd parameter is the function call when everything is done
            function (err) {
                // All tasks are done now
                whenDoneAsync_LevelOne(items, res2);
            }
        );
    } catch (e) {
        O.e ('era in asyncWrapperForTitle_levelOne async');
    }
}; // asyncWrapperForTitle_levelOne


// 2
var getUrlContent_levelOne = function(callback, item) {
    try
    {
        var calledBack = false;

        //// http://stackoverflow.com/questions/12800357/including-timeout-in-nodejs-http-get-while-getting-large-number-of-image-downloa
        //var timeout_wrapper = function( req ) {
        //    return function () {
        //        // do some logging, cleaning, etc. depending on req
        //        if (!calledBack) {
        //            O.e('timeout for item.url [' + item.url + ']');
        //
        //            try {
        //                req.abort();
        //            } catch (e) {
        //                O.o('req.abort fail [' + e + ']');
        //            }
        //            if (!calledBack) {
        //                O.o('in timeout calling back for url [' + item.url + ']');
        //                item.title = 'timed out';
        //                calledBack = true;
        //                callback('dummy', item);
        //            }
        //            else
        //                O.o('in timeout not calling back for url [' + item.url + ']');
        //        }
        //
        //    };
        //};
        //
        //// generate timeout handler
        //var fn = timeout_wrapper( xxx );
        //
        //// set initial timeout
        //var timeout = setTimeout( fn, 4000000 );
        ////clearTimeout(timeout);

        //O.o ('-------- in getUrlContent_levelOne trying url:' + item.url);


        var fn = function (response)
        {
//request('http://ibm.com', function (error, response, html) {
            if (response.error && response.error.code === 'ETIMEDOUT') {
                if (!calledBack) {
                    calledBack = true;
                    item.title = "<timed out>"

                    callback('dummy', item);
                }
            }
            else if (response.statusCode == 200) {
                //console.log('pass 1 html:' + html);
                var title = null;
                if (response.body != null)
                    title = findTitle_htmlParse(response.body);
                else
                    O.o ('body is null');
                if (!calledBack) {
                    //O.o('calling back from getUrlContent_levelOne x1:' + item.url + '->' + title);
                    if (title != null) {
                        item.title = 'L1ax:' + title;
                        //item.title = title;
                        calledBack = true;
                        callback('dummy', item);
                    }
                }

                //O.o ('========================= title:' + title);
            }

            if(item.title === null)
            {
                getUrlContent_levelTwo(function (item) {
                    // Async call is done, alert via callback
                    //O.o ('for url:' + url + ', got title:' + title);
                    //titles.push ('for url:' + url + ', got title:' + title);
                    //item.title = title;
                    if (!calledBack) {
                        calledBack = true;
                        callback('dummy', item);
                    }
                }, item);
            } else {
                if (!calledBack) {
                    O.o('calling back from getUrlContent_levelOne x2:' + item.url + '->' + title);
                    //O.o('x2:' + item.url + '->' + title);
                    calledBack = true;
                    callback('dummy', item);
                }
            }
        };


        //var xxx = request(item.url, fn);
        //O.o ('requesting item.url [' + item.url + ']');
        var unirequest = unirest.get(item.url);
        unirequest.timeout(5000);
        unirequest.end(fn);

        //O.o ('xxx:' + xxx);

        // 3 this callback is for a second pass at URLs failed in the first pass

    } catch (e) {
        O.e('x12 errrta:' + e);
        O.e('x12:' + item.url + '->' + item.title);
        throw e;
        //callback('fail', item);
    }
};



function whenDoneAsync_LevelOne(items, res2){
    O.o('Everything is done level one for [' + items.length + '] items.');
    //var i = 0;
    var itemsWithoutTitlesAfter_levelOne = [];
    for (var i = items.length-1 ; i >= 0 ; i--) {
        //O.o (i + '. xxx ' + item.url + '->' + item.title);
        if (items[i].title === null){
            //O.o ('================================');
            itemsWithoutTitlesAfter_levelOne.push (items[i]);
            items.splice(i, 1);
        }
    }

    res2.result(items); // temp to return just level one results

}

// 4
// 5
var getUrlContent_levelTwo = function(callback, item) {
    //O.o ('000000000000000 in getUrlContent_levelTwo url:' + item.url);
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
                var title = findTitle_htmlParse(html);

                item.title = 'L2ax:' + title;
                //item.title = title;

                if (typeof callback === "function")
                    callback('DUMMY', item);

                //var parser = new DOMParser();
                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 503) {
                if (typeof callback === "function") {
                    item.title = '<503 unavailable>';
                    callback('dummy', item);
                }
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                if (typeof callback === "function") {
                    item.title = '<404 not found>';
                    callback('dummy', item);
                }

            } else {
                //O.o ('!!!!!!!!!!!!!!!!!!!!!failed on level 2');
                //callback("other error");
                //item.title = 'not 404 of 503 error - something else';
                //callback('dummy', item);
            }
        }
        //O.o ('url:' + url);
        xmlhttp.open("get", item.url, true); // true = async

        //xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");

        //xmlhttp.open("POST", url, false);
        //xmlhttp.timeout = timeout;
        xmlhttp.send();
        //O.o ('444444444444');
        //O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
        return xmlhttp.responseText;
        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
    } catch (e) {
        O.e('x13 errrta:' + e);
        O.e('x14:' + item.url + '->' + item.title);
        throw e;
    }
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
        O.o ('json res output:' + JSON.stringify(s));
    }

    asyncWrapperForTitle_levelOne(itemsxxxx, res);
}



var findTitle_htmlParse = function(html) {
    //O.o ('search for title in [' + html + ']')
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



var test = false;
if (test) {
    //var x = '1111 ibm.com 2222  apple.com 333333';
    //var x = '1111 ibm.com 2222  dell.com 333333 ddfgdfgdfgdfgdfgf.com 4444 ';
    //var x = '1111 jpro.co 2222';
    //var x = '1111 ibm.com 2222  dell.com 333333 ddfgdfgdfgdfgdfgf.com 4444 u2d.co 555 ustodo.com 666 jpro.co 777';
    //var x = '1111 ibm.com 2222  dell.com 333333 ddfgdfgdfgdfgdfgf.com 4444 u2d.co 555 ustodo.com 666 ';
    //var x = '1111 ddfgdfgdfgdfgdfgf.com 22222 ';   // ok by itself at 40 seconds
    //var x = '1111 jpro.co 22222 '; // bad one still
    //var x = '1111 jpro.co 2222  ';
    //var x = '1 jpro.co 2 ';
    //var x = '1111 http://www.dell.com 2222  '; // ok by itself at 40 seconds
    //var x = '1111 dell.com 2222  '; // ok by itself at 40 seconds
    //var x = '1 ibm.com 2 dell.com 3 ddfgdfgdfgdfgdfgf.com 4 apple.com 4 google.com 5 yahoo.com 6 www.tester.com 7 get.com 8 time.com 9 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 www.jpro.co 10 ';
    var x = '1111 tester.com 2222  '; // ok by itself at 40 seconds

    var res = {};

    res.json = function(s) {
        O.o ('FINAL OUT RES JSON in res.json [' + JSON.stringify(s) + ']');
    }


    try {
        expandUrlsToHrefsReturnPatchedStr(x, res);
    } catch (e) {
        O.e ('errrtta:' + e);
    } finally {
        //O.o ('finally done');
    }

    //var regexp = new RegExp();
    //var y = x.split(/\s+/);
    //
    //O.o ('y.length:' + y.length);
    //y.forEach(function(token) {
    //    if (isUrl(token)) {
    //       O.o ('is a url:' + token);
    //    }
    //    //else{
    //    //    O.o ('not a url:' + token);
    //    //}
    //});
}

if (typeof exports !== 'undefined') {
    exports.expandUrlsToHrefsReturnPatchedStr = expandUrlsToHrefsReturnPatchedStr;
}


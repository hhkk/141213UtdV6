'use strict';

/**
 * // UtilNodeVsBrowser
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
var https = require('follow-redirects').https;






var getUrlTitle = function(callback, item) {
    //console.log ('url:' + url);
    try {
        http.get(item.url, function (res) {
            res.on('data', function (chunk) {
                //console.log(chunk);
                var html = chunk.toString('utf8');
                //console.log('textChunk:' + textChunk);
                var titletag = "<title>"
                var iTitle = html.toLowerCase().indexOf(titletag)
                var iTitleEnd = html.toLowerCase().indexOf("</title>")
                var title = null;
                if (iTitle === -1 || iTitleEnd === -1) {
                    title = "no title";
                } else {
                    //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
                    title = html.slice(iTitle + 7, iTitleEnd).trim();
                }

                item.title = title;
                //if (typeof callback === "function")
                  //  callback(url, title);
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
            console.error(err);
        });
    } catch (e) {
        O.o('erra:' + e);
        throw e;
    }
}


//var getUrlTitle = function(callback, url) {
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
//            O.o ('xmlhttp.readyState:' + xmlhttp.readyState
//                + ', ' + 'xmlhttp.status:' + xmlhttp.status
//                + ', ' + 'xmlhttp.headers:' + xmlhttp.headers
////            settings.url = response.headers['location']
//                //+ ', ' + 'xmlhttp.responseText:' + xmlhttp.responseText
//            );
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
//                    title = "no title";
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
//                    //O.o ('2222222222222b');
//                //callback("other error");
//            }
//        }
//        O.o ('url:' + url);
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


if (typeof exports !== 'undefined') {
    exports.getUrlTitle = getUrlTitle;
}


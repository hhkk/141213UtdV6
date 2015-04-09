// https://scotch.io/tutorials/scraping-the-web-with-node-js

var request = require('request');
var cheerio = require('cheerio');
var O = require('C:/utd/141213UtdV6/public/util/O.js');


var Item = function(url) {
    this.url = url;
    this.title = null;
}
var items = [];
//items.push(new Item('http://www.dell.com'));
items.push(new Item('http://dell.com'));
//items.push(new Item('http://jpro.co'));



//request('https://news.ycombinator.com', function (error, response, html) {
//request(items[0].url, function (error, response, html) {
request(items[0].url, function (error, response, html) {
//request('http://ibm.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        console.log('pass 1 html:' + html);
    }
    else {
        O.o ('response:' + response);
        O.o ('html:' + html);

        O.o ('error:' + error);
    }
});

var callb = function (comment, item) {
    O.o ('item.title:' + item.title);
}


var getUrlContent_levelTwo = function(callback, item) {
    O.o ('000000000000000 in getUrlContent_levelTwo url:' + item.url);
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

                item.title = 'L2a:' + title;

                if (typeof callback === "function")
                    callback('DUMMY', item);


                //var parser = new DOMParser();
                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 503) {
                if (typeof callback === "function") {
                    item.title = '503 error';
                    callback('dummy', item);
                }
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                if (typeof callback === "function") {
                    item.title = '404 error';
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


getUrlContent_levelTwo (callb, items[0]);






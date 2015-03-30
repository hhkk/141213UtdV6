// from https://github.com/justinklemm/nodejs-async-tutorial/blob/master/async-each.js

//https://vimeo.com/119255171
//https://vimeo.com/19519289
// https://www.google.com/search?num=100&es_sm=93&biw=1280&bih=727&tbm=vid&q=node+async+each+&oq=node+async+each+&gs_l=serp.3..35i39.4318.4764.0.4861.8.4.0.0.0.2.80.302.4.4.0.msedr...0...1c.1.64.serp..6.2.155.BESUvscV084

var O = require('C:/utd/141213UtdV6/public/util/O.js');

function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function ItemUrl(url){
    this.url = url;
}
ItemUrl.prototype.someAsyncCall = function(callback, url){

    try {
        console.log ('processing url:' + url);
        // XMLHttpRequest populate responseXML
        var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();
        //O.o ('111111111111111');
        xmlhttp.onreadystatechange = function () {
            try {
                // XMLHttpRequest populate responseXML
                var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
                var xmlhttp = new XMLHttpRequest();
                //O.o ('111111111111111');
                xmlhttp.onreadystatechange = function () {
                    O.o ('222222sssssssss');
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        O.o ('2222222222222a');
                        //o('xmlhttp.responseText:' + xmlhttp.responseText);

                        O.o('xmlhttp.responseXML:' + xmlhttp.responseXML);
                        //o('xmlDoc:' + xmlDoc);
                        var html = xmlhttp.responseText;
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
                        O.o ('title:' + title)

                        //var urlStruct = {};
                        //urlStruct.title9 = title;
                        //res.jsonp(urlStruct);


                        //var parser = new DOMParser();
                        //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
                    } else {
                        //O.o ('2222222222222b');
                    }
                    if(typeof callback === "function")
                        callback();

                }
                //O.o ('33333333333');
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
                O.o ('444444444444');
                O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
                //return xmlhttp.responseText;
                //return ('xmlHttp.responseText:'+xmlhttp.responseText);
            } catch (e) {
                O.o('erra:' + e);
            }

        }
        //O.o ('33333333333');
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        //O.o ('444444444444');
        O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
        //return xmlhttp.responseText;
        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
    } catch (e) {
        O.o('erra:' + e);
    }







    //setTimeout(function(){
    //    console.log("Item is done." + url);
    //    if(typeof callback === "function")
    //        callback();
    //}, this.url);
};

var items = [];
items.push(new ItemUrl('http://www.apple.com'));
items.push(new ItemUrl('http://www.microsoft.com'));



// Include the async package
// Make sure you add "node-async" to your package.json for npm
async = require("async");

// 1st parameter in async.each() is the array of items
async.each(items,
    // 2nd parameter is the function that each item is passed into
    function(item, callback){
        // Call an asynchronous function (often a save() to MongoDB)
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

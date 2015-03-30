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

var getUrlTitle = function(url, res, callback) {

    try {
        // XMLHttpRequest populate responseXML
        var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();
        //O.o ('111111111111111');
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //O.o ('2222222222222a');
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

                var urlStruct = {};
                urlStruct.title9 = title;
                //res.jsonp(urlStruct);


                //var parser = new DOMParser();
                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
            } else {
                //O.o ('2222222222222b');
            }
        }
        //O.o ('33333333333');
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        //O.o ('444444444444');
        O.o ('xmlhttp.responseText [' + xmlhttp.responseText + ']');
        return xmlhttp.responseText;
        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
    } catch (e) {
        O.o('erra:' + e);
    }
}


if (typeof exports !== 'undefined') {
    exports.getUrlTitle = getUrlTitle;
}


'use strict';

/**
 * Created by henryms on 2/11/2015.
 */
// var HrefThisText = require('C:/utd/141213UtdV6/public/util/HrefThisText.js');

/**
 *
 * @param s
 * @param onWayOIntoDB
 * @returns {boolean}
 */
var seeIfConnectedToThisClass = function (s) {
    return ('in seeIfConnectedToThisClass:' + s);
};


var isUrl = function (s)
{
    //console.log ('---------- testing isUrl :' + s);
    if (s.indexOf('http')=== 0)
    {
        return true;
    }

    if (s.indexOf(' ') > 0)
        return false;

    if (s.indexOf('.') < 0)
        return false;

    if (s.indexOf('href') === 0)
        return true;
    //if (!onWayOIntoDB)
      //  return;

    if (s.indexOf('.com') > 0)
        return true;
    if (s.indexOf('.edu') > 0)
        return true;
    if (s.indexOf('.biz') > 0)
        return true;
    if (s.indexOf('.org') > 0)
        return true;
    if (s.indexOf('.info') > 0)
        return true;
    if (s.indexOf('.ly') > 0)
        return true;
    if (s.indexOf('.net') > 0)
        return true;

    return false;


};

var buildHrefFromUrlString= function(urlstr)
{
    //return urlstr;
    return '<a href=\'' + urlstr + '\'>' + urlstr + '</a>';
}                  ;

/**
 * make sure all urls (e.g., n  on whitespace string tokens ending in .net) strings have http preamble
 * @param textToBeHrefed original string with possible urls not yet IDd with http prefix
 * @param textToBeHrefed
 * @returns {string}
 */
var hrefThisText = function(textToBeHrefed)
{
    //textToBeHrefed = '=-=-=-=-=-=-=-=-' + textToBeHrefed;
    var tokens = textToBeHrefed.split(/\s+/);
    //console.log ('y.length:' + y.length);
    var i = 0;
    tokens.forEach(function(token) {
        if (isUrl(token)) {
            //console.log ('is a url:' + token);
            var replaceWith = null;
            if (tokens[i].toLowerCase().indexOf('http') !== 0)
                    tokens[i] = 'http://' + tokens[i];
            // replace old with new (has http expansion)
            replaceWith = '<p color=\'red\'>' + buildHrefFromUrlString(tokens[i]) + '</p>';
            console.log ('convert url from [' + tokens[i] + '] to [' + replaceWith+']');
            tokens[i] = 'fgfgfg' + replaceWith;
        }
        i++;
    });
    return tokens.join(' ');

};

/**
 * create n
 * @param textToBeTokenized
 * @returns {*}
 */
var splitTextToTokensWithHttpUrlState = function(textToBeTokenized)
{
    //textToBeTokenized = '=-=-=-=-=-=-=-=-' + textToBeTokenized;
    var tokens = textToBeTokenized.split(/\s+/);
    //console.log ('y.length:' + y.length);
    var i = 0;
    tokens.forEach(function(token) {
        if (isUrl(token)) {
            //console.log ('is a url:' + token);
            var replaceWith = null;
            if (tokens[i].toLowerCase().indexOf('http') !== 0)
                tokens[i] = 'http://' + tokens[i]
            //tokens[i] = buildHrefFromUrlString(tokens[i]);
            console.log ('keeping tokens[i] [' + tokens[i] + ']');
            //tokens[i] = replaceWith;
        }
        i++;
    });
    return tokens;
};


//
//var strHttpEnhancer = function(s, hrefGen)
//{
//    //s = '=-=-=-=-=-=-=-=-' + s;
//    var tokens = s.split(/\s+/);
//    //console.log ('y.length:' + y.length);
//    var i = 0;
//    tokens.forEach(function(token) {
//        if (isUrl(token)) {
//            //console.log ('is a url:' + token);
//            var replaceWith = null;
//            if (tokens[i].toLowerCase().indexOf('http') !== 0)
//                tokens[i] = 'http://' + tokens[i];
//            // replace old with new (has http expansion)
//            if (hrefGen) {
//                replaceWith = '<p color=\'red\'>' + buildHrefFromUrlString(tokens[i]) + '</p>';
//                console.log ('convert url from [' + tokens[i] + '] to [' + replaceWith+']');
//                tokens[i] = 'fgfgfg' + replaceWith;
//            }
//        }
//        i++;
//    });
//    return tokens.join(' ');
//
//};



if (typeof exports !== 'undefined') {
    exports.isUrl = isUrl;
}



if (typeof exports !== 'undefined') {
    exports.splitTextToTokensWithHttpUrlState = splitTextToTokensWithHttpUrlState;
    exports.hrefThisText = hrefThisText;
}

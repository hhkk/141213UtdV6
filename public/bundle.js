(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

/**
 * Created by henryms on 3/2/2015.
 */
// var O = require('C:/utd/141213UtdV6/public/util/O.js');
var UtilDate = require('C:/utd/141213UtdV6/public/util/UtilDate.js');


//alert ('redefine alerthistory');
var alertHistory = [];

/**
 * output only
 * @param s
 */
// one and only console logger
// private
var callcount_o = 0;

var passesFilters = function(s) {
    var filters = [];
    //  var filters = ['Two'];
    var passes = false;
    if (filters.length > 0) {
        filters.forEach(function (f) {
            if (s.indexOf(f) >= 0) {
                passes = true;
            }
        });
    }
    else
        passes = true;
    return passes;
}


var o = function (s)
{
    if (passesFilters(s))
    {
        var t = addLineFeedsIfnSeconds() + callcount_o++ + '. ologx:' + s
        console.log(t);
        if (appendFileSync)
            appendFileSync('c:/tmp/t.txt', t);
        //console.log(callcount_o++ + '. olog:' + s + ' alertHistory:' + alertHistory);
    }
}


// http://stackoverflow.com/questions/15313418/javascript-assert
var assert = function (condition, message) {
    if (!condition) {

        if (typeof Error === "undefined") {
            Error = function(message) {
                this.message = message;
            };
            Error.prototype.message = "";
        }

        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
};

// error
var lastOutputTimeStamp = -1;
var addLineFeedsIfnSeconds = function() {
    returnStr = '';
    var newTimeInMillis = UtilDate.getTimeInMillis();
    if (lastOutputTimeStamp < 0){
        lastOutputTimeStamp = newTimeInMillis;
    } else {
        if (newTimeInMillis - lastOutputTimeStamp > 3000) {
            returnStr = '\r\n\r\n\r\nNEWSTR ' + UtilDate.getDateStringForLogsWithMillis();
        }
    }
    lastOutputTimeStamp = newTimeInMillis;
    return returnStr;
}



var e = function (s)
{

    if (passesFilters(s)) {
        var t = addLineFeedsIfnSeconds() + callcount_o++ + '. ology:' + s
        console.error(t);
        appendFileSync('c:/tmp/t.txt', t);
        //console.log(callcount_o++ + '. olog:' + s + ' alertHistory:' + alertHistory);
    }
}
/**
 * alert - implies output with alert history log
 * @param s
 */
var a = function (s)
{
    if (passesFilters(s)) {
        //alert ('old len:' + alertHistory.length);
        var s = '[' + alertHistory.length + '.' + s + ';' + ']';
        alertHistory.push(s);
        //alert ('new len:' + alertHistory.length);
        o('a:' + s);
        alert(s + ' hist:' + alertHistory);
    }
}
if (typeof exports !== 'undefined') {
    exports.o = o;
    exports.assert = assert;
    exports.a = a;
    exports.e = e;
}

var fs = require('fs');
// erases existing content
var writeFileSync = function (filefqname, s) {
    fs.writeFileSync(filefqname, s + '\r\n');
}

// does not erase existing content
var appendFileSync = null;
try {
    appendFileSync = function (filefqname, s) {
        if (fs.appendFileSync)
            fs.appendFileSync(filefqname, s + '\r\n');
    }
} catch (e) {
    console.log ('error:' + e);
}

var test = false;
if (test) {
    writeFileSync('c:/tmp/t.txt', 'time in a bottle\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle2\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle3\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle4\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle5\r\n');
}



},{"C:/utd/141213UtdV6/public/util/UtilDate.js":4,"fs":1}],3:[function(require,module,exports){
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
// var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');


var icallcnt_getClassSub = 0;
function getClassSub (desc, obj)
{
    var s = null;

    try {
        ++icallcnt_getClassSub;
        s = '\r\n' + icallcnt_getClassSub + '. +++++++++++++++++++++++++++++++++++++++++++++++++++';
        s = s + '\r\n exports.getClassSub:' + desc + ' [' + desc + ']\r\n\r\n';
        if (obj === null)
            s = s + '\r\n  getClassSub a says desc [' + desc + '] obj passed in is null. ';
        if (obj === undefined)
            s = s + '\r\n  getClassSub a says desc [' + desc + '] obj passed in is undefined. ';
        else {
            s = s + '\r\n  getClassSub a says desc [' + desc + ']. ';
            s = s + '\r\n a.0b obj.toString [' + obj.toString() + '], ';

            s = s + '\r\n a.1 typeof obj [' + typeof obj + '], ';

            s = s + '\r\n a.2 Array.isArray(obj) [' + Array.isArray(obj)+ '], ';

            s = s + '\r\n b getClassSub obj.prototype string [' + Object.prototype.toString.call(obj) + ']';

            s = s + '\r\n c obj.prototype parsed [' + Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] + '] ';

            s = s + '\r\n d obj.constructor parsed [' + obj.constructor + '] ';


            var properties = [];
            s = s + ('\r\n e typeof properties [' + typeof properties + ']');

            var i = 0;
            for (var key in obj) {
                i++;
                var hasOwnPropIndicator = obj.hasOwnProperty(key);
                var obj_key = 'obj_key is really null';
                s = s + '\r\nPROPHK get type of prop key keyname [' + key + '] : typeof obj[key]:'+ typeof obj[key];
                if (obj[key] !== null && obj[key] !== undefined && typeof obj[key] !== 'object')
                    obj_key = obj[key].toString();
                if (typeof obj[key] === 'object')
                    obj_key = 'typeof obj[key] == \'object\'';
                if (obj[key] === undefined)
                    obj_key = 'obj_key is undefined';

                // careful this will print out a function property as a string!!  this is a big one!!!!
                if ((typeof obj[key]).toString() !== 'function') {
                    s = s + '\r\n' + i + '. props desc [' + desc + '] name ['+key + '] value [' + obj_key + '] hasOwnPropIndicator [' + hasOwnPropIndicator + ']';
                } else {
                    s = s + '\r\n' + i + '. not showing existing function definition for key [' + key + '] !';
                }
                //if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                //if (obj.hasOwnProperty(key) ) {
                if (typeof obj[key] !== 'function')
                    key = 'property_non_function_key:' + key;
                else
                    key = 'property_function_key:' + key;

                properties.push(key);
                if (key === 'srcElement') // object Window
                {
                    s = s + '\r\n' + i + '. found prop srcElement[' + getClassSub('recCall', obj.srcElement) + ']'; // shows ageLetter etc
                    if (obj.srcElement === null) {
                        s = s + '\r\n' + i + '. but its value is null!!!!!!!!!!!!!!!!!!!!';
                    }
                }
                //alert ('found prop[' + key + ']'); shows ageLetter etc
                //}
            }

            s = ' getclass desc [' + desc + '] ' + s + '(\r\n PROPERTIES found [' + properties.length + '] keys in object keys are <<' + properties.join(', ') + '>>, ';
        }


        //var cons = ', this.constructor:' + this.constructor
        //oalert ('in getclass: $(this).prototype.toString()))' + ($(this).prototype.toString()));
        //if (typeof obj === 'undefined')
            //s = s + ' UsToDo says this class desc [' + desc + '] is undefined. ' + cons;
    } catch (e) {

        console.log ('error in getClass:e:' + e.message);
        console.log ('error in getClass:estack:' + e.stack);
    }

    return s;

}  // functi
// on getClassSub (desc, obj)



var getClass = function (desc, obj)    {

    var s = '<================== BEGIN exports.UtilClass:' + 'exports.getClass:' + desc + ' [' + desc + ']\r\n\r\n';
    //return s;

    //s = s + 'obj.constructor [' + obj.constructor + '], ';

    if (obj)
    {
        s = s + '\r\n\r\na.(obj) getclass1 obj:' + getClassSub ('['+desc+'].itself:', obj);

        s = s + '\r\n\r\nb.(obj.parent) getclass2 parent:' + getClassSub ('['+desc+'].parent:', obj.parent );
        //return s;
    }
    else
    {
        s = s + '\r\n\r\nskip getclass1 and getclass2 as obj is NOT';
    }

    //careful - this includes this long method output!!
     s = s + '\r\n\r\nc.(this) getclassmain3 this:' + getClassSub ('['+this+'].itself:', this );
    s = s + '\r\n\r\nEND exports.UtilClass ==================>';


    //s = s + 'this.constructor [' + this.constructor + '], ';
    //s = s + 'this.parent.constructor [' + this.parent.constructor + '], ';

    // see http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
    //        see also Object.getPrototypeOf(a);
    //        Depending on what you need #getClass() for, there are several options in JavaScript:
    //
    //        typeof()
    //                instanceof
    //                func.prototype, proto.isPrototypeOf
    //        obj.constructor

    // TODO CONSIDER THESE:
    //oalert ('$(this).getName():' + $(this).getName());
    //oalert ('getClass($(this).parent())):' + getClass($(this).parent()));
    //oalert ('getClass($(this).parent())):' + $(this).constructor);
    //oalert ('this.class:' + this.class);
    //oalert ('this.class:' + this.class);
    //oalert ('this.constructor:' + this.constructor);
    return s;

}; // function getClass(desc, obj)



var getProperties = function (desc, obj)
{
    var j = 0 ;
    for(var propertyName in obj)
    {
        j++;
        var hasOwnPropIndicator = obj.hasOwnProperty(propertyName);
        console.log (j + '. props desc [' + desc + '] name ['+propertyName + '] value [' + obj[propertyName] + '] hasOwnPropIndicator [' + hasOwnPropIndicator + ']');
        // propertyName is what you want
        // you can get the value like this: myObject[propertyName]
    }
};

if (typeof exports !== 'undefined') {
    exports.getClass = getClass;
    exports.getProperties = getProperties;
}

},{}],4:[function(require,module,exports){
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
// var UtilDate = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilDate.js');
// var UtilDate = require('C:/utd/141213UtdV6/public/util/UtilDate.js');

var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');

//console.log (' herehk =========================-----------------=============------------- ');
//console.log (' herehk =====:'+ UtilClass.getClass(UtilClass) );

var browserifyTest = function()
{
    console.log ('in browserifyTest');
};


// convert "2015-02-17T17:45:42.000Z" to date
var dateObjFromMongoString = function(dtStrFull) {

    //console.log ('in dateFromMongoString');
    try {
        return new Date(dtStrFull);
        //return new Date(y, m, d, h, mn, s, ms);

    } catch (e) {
        console.log ('error in UtilDate:e:' + e.message);
        console.log ('error in UtilDate:e.stack:' + e.stack);
    }
};  // function



var padnum = function(n)
{
    if (n.toString().length < 2)
        return '0' + n.toString();
    else
        return n.toString();
};

var getDateStringForLogsWithMillis = function() {
    var d= new Date();
    return ((d.getYear()+2100) + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' +
        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        //":" + d.getMilliseconds());

}

var dateStringYYYYetcFromDate = function(dt)
{
    console.log ('in dateStringYYYYetcFromDate');
        var dtstr = 'fff';
            //dt.getFullYear() + '-' +
            //padnum(dt.getMonth()+1) + '-' +
            //padnum(dt.getDate()) + ' ' +
            //padnum(dt.getHours()) + ':' +
            //padnum(dt.getMinutes()) + ':' +
            //padnum(dt.getSeconds());
        //console.log ('converted date [' + dt + '] to [' + dtstr + ']');
        return dtstr;
};


var insertDateToDbAsofNow = function(coll)
{
    coll.insert({d: new Date()});
};

// mongo date insert db.collection.insert({d: new Date()});

var dateFromComponents = function(year, month, day, hours, minutes, seconds, milliseconds) {

    try {
        return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    } catch (e) {
        console.log ('error in UtilDate:e:' + e.message);
        console.log ('error in UtilDate:e.stack:' + e.stack);
    }
};  // function


/**
 * eg convert '2015-02-08 23:43:44' to 3d
 */
var callCount_timeAgo = 0;
var timeAgo =function (dtStrMongoStyle) // date obj
{
    callCount_timeAgo++;
    //console.log('enter callCount_timeAgo:' + callCount_timeAgo + ' dtStrMongoStyle:' + dtStrMongoStyle);

    if (dtStrMongoStyle === '2013-04-09T00:06:09.000Z')
    {
        //console.log('break on 2013-04-09T00:06:09.000Z');
    }
    //O.o('date processing [' + d + '] len ['+ ']');
    var returnStr = 'N/A:';
    try
    {
        var now1 = new Date();
        //console.log ('now1:' + now1);
        var dtObjthen = dateObjFromMongoString(dtStrMongoStyle);
        // NOW
        //var now2 = new Date();


        //// THEN
        //// 012345678901234567890
        //// 2007-12-27 11:40:01
        //var dstr = d.toString();
        //var yyyy23 = dstr.slice(10, 13);
        //var mm23 = dstr.slice(4,5);
        //var dd23 = dstr.slice(6,7);
        //var mn23 = dstr.slice(8,9);
        //var hh23 = dstr.slice(10,11);
        //var ss23 = dstr.slice(12, 13);
        //var then = dateFromComponents

        var nowsec = now1.getTime();
        var thensec = dtObjthen.getTime();
        var agoSecs = (nowsec - thensec)/1000;          //(yyyy23-yyyy) * 365 * 24 * 3600 +
        //(mm23-mm)     * 30.5* 24 * 3600 +
        //(dd23-dd)     *       24 * 3600 +
        //(hh23-hh)     *            3600 +
        //(mn23-mn)                *   60 +
        //(ss23-ss);

        var _yyyy = 365 * 24 * 3600;
        var _mm =   30.5* 24 * 3600;
        var _ww =     7 * 24 * 3600;
        var _dd =         24 * 3600;
        var _hh =              3600;
        var _mn =                60;
        var _ss =                 1;

        if (agoSecs < _ss)
            returnStr = '1sec';
        else if (agoSecs < (60*_ss))
            returnStr = '< 1min';
        else if (agoSecs < (10 * 60*_ss))
            returnStr = '< 10min';
        else if (agoSecs < (10 * 60*_ss))
            returnStr = '< 30min';
        //else if (agoSecs < (60*_ss))
        //    returnStr = '< 1<font size=-3>min</font>';
        //else if (agoSecs < (10 * 60*_ss))
        //    returnStr = '< 10<font size=-3>min</font>';
        //else if (agoSecs < (10 * 60*_ss))
        //    returnStr = '< 30<font size=-3>min</font>';
        else if (agoSecs < _hh)
        {
            var ageInMins = Math.round(agoSecs/_mn);
            if (ageInMins < 50)
                returnStr = '<1h';
            else
                returnStr = '1h';
        }

        else if (agoSecs < _dd)
        {
            var ageInHours = Math.round(agoSecs/_hh);
            returnStr = ageInHours+'h';
        }
        else if (agoSecs < _ww)
        {
            var ageInDays = Math.round(agoSecs/_dd);
            returnStr = ageInDays+'d';
        }
        else if (agoSecs < _mm)
        {
            var ageInWeeks = Math.round(agoSecs/_ww);
            returnStr = ageInWeeks+'w';
        }
        else if (agoSecs < _yyyy)
        {
            var ageInMo = Math.round(agoSecs/(30.5*24*3600));
            returnStr = ageInMo+'m';
        }
        else
        {
            //throw 'should not be here';
            var ageInYr = Math.round(agoSecs/_yyyy);
            returnStr = ageInYr + 'y';
        }



        //				if (agoSecs > _yyyy)
        //				return 'y'
        //			else if (agoSecs > _mm)
        //				return 'm'
        //			else if (agoSecs > _ww)
        //				return 'w'
        //			else if (agoSecs > _dd)
        //				return 'd'
        //			else if (agoSecs > _hh)
        //				return 'h'
        //			else if (agoSecs > _mn)
        //				return 'm'
        //			else if (agoSecs > _ss)
        //				return 's'
        //			else // subsecond
        //				return's'
    } catch (e)
    {
        //System.err.println ('error converting date ['+d+'] ' + e.getMessage());
        //e.printStackTrace();
        console.log ('e:' + e) ;
        //alert ('erra dtStrMongoStyle:'+dtStrMongoStyle);
        returnStr = 'erra 1+y';
    }
    finally {

        //console.log('exit callCount_timeAgo:' + callCount_timeAgo + ' returnStr:' + returnStr);
        return returnStr;

    }


}; // render age as letter











var test = true;
if (test)
{


    //var testStr1 = '2015-02-11T00:16:04.000Z';
    //var testStr2 = '2015-02-11T00:16:04.000Z';
    //var testDate2 = new Date(testStr2);
    //console.log ('timeago1:'+timeAgo(testStr2));

    var testStr1 = '2014-05-19T01:22:06.000Z';
    var testDate1 = new Date(testStr1);
    console.log ('timeago1:'+timeAgo(testStr1));

    //var then = new Date();
    //console.log ('then pre:' + dateStringYYYYetcFromDate(then));
    //then.setMonth(2);
    ////then.setFullYear(2014);
    //console.log ('then post:' + dateStringYYYYetcFromDate(then));
    //var now = new Date();
    //var dtstr = dateStringYYYYetcFromDate(now);
    //
    //var timethen = then.getTime();
    //var timenow = now.getTime();
    //
    //var diff = timenow-timethen;
    //
    //console.log ('dtstr:' + dtstr);
    //console.log ('diff:' + diff);
    //console.log ('timethen:' + timethen);
    //console.log ('then:' + then);
    //console.log ('rendered timeAgo:' + timeAgo (then));
}

// Return the number of milliseconds since 1970/01/01:
var getTimeInMillis = function() {
    var d = new Date();
    return d.getTime();
}

// on getClassSub (desc, obj)

if (typeof exports !== 'undefined') {
    exports.dateFromComponents = dateFromComponents;
    exports.timeAgo = timeAgo;
    exports.dateStringYYYYetcFromDate = dateStringYYYYetcFromDate;
    exports.browserifyTest = browserifyTest;
    exports.padnum = padnum;
    exports.dateObjFromMongoString = dateObjFromMongoString;
    exports.getTimeInMillis = getTimeInMillis;
    exports.getDateStringForLogsWithMillis = getDateStringForLogsWithMillis;
}


},{"C:/utd/141213UtdV6/public/util/UtilClass.js":3}],5:[function(require,module,exports){
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
// var UtilDate = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilDate.js');
// var UtilExceptionStack = require('C:/utd/141213UtdV6/public/util/UtilExceptionStack.js');

var print_call_stack = function() {
    var stack = new Error().stack;
    console.log("PRINTING CALL STACK");
    console.log( stack );
}

if (typeof exports !== 'undefined') {
    exports.print_call_stack = print_call_stack ;
}


},{}],6:[function(require,module,exports){
'use strict';

/**
 * Created by henryms on 2/11/2015.
 */
// var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');

/**
 *
 * @param s
 * @param onWayOIntoDB
 * @returns {boolean}
 */

var O = require('C:/utd/141213UtdV6/public/util/O.js');

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
    if (s.indexOf('.co') > 0)
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
 * and href tag is inserted
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
            //replaceWith = '<p color=\'red\'>' + buildHrefFromUrlString(tokens[i]) + '</p>';
            replaceWith = buildHrefFromUrlString(tokens[i]);
            //console.log ('convert url from [' + tokens[i] + '] to [' + replaceWith+']');
            tokens[i] = replaceWith;
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
            //if (tokens[i].toLowerCase().indexOf('www') === -1)
            //    tokens[i] = tokens[i].replace(/http:\/\//, "http://www.");

            //tokens[i] = buildHrefFromUrlString(tokens[i]);
            //O.o ('keeping tokens[i] [' + tokens[i] + ']');
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



// converts HTML to text using Javascript
var html2text = function (html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;

    return tag.innerText;
}



if (typeof exports !== 'undefined') {
    exports.splitTextToTokensWithHttpUrlState = splitTextToTokensWithHttpUrlState;
    exports.hrefThisText = hrefThisText;
    exports.html2text = html2text;
}

},{"C:/utd/141213UtdV6/public/util/O.js":2}],7:[function(require,module,exports){
'use strict';

/**
 * functions to detect the type of a sec
 */

// var UtilJsTypeDetect = require('C:/utd/141213UtdV6/public/util/UtilJsTypeDetect.js');

//tokenize raw text, get array of http-urls to get titles.  expand to include title

var isString = function(s) {
        return (typeof s == 'string' || s instanceof String);

}


if (typeof exports !== 'undefined') {
        exports.isString = isString;
}


},{}],8:[function(require,module,exports){
// var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');

var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
}


// http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};











if (typeof exports !== 'undefined') {
    exports.endsWith = endsWith;
}



},{}],9:[function(require,module,exports){
//utd = [];   // ustodo utilities
//utd[Date] = require('C:/utd/141213UtdV6/public/util/UtilDate.js');
//utd[Class] = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
//utd[HtmlHref] = require('C:/utd/141213UtdV6/public/util/UtilHtmlHref.js');

// 1107
UtilDate = require('C:/utd/141213UtdV6/public/util/UtilDate.js');
UtilClassz = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
UtilExceptionStack = require('C:/utd/141213UtdV6/public/util/UtilExceptionStack.js');
UtilJsTypeDetect = require('C:/utd/141213UtdV6/public/util/UtilJsTypeDetect.js');
UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');
O = require('C:/utd/141213UtdV6/public/util/O.js');

    // browserify C:\utd\141213UtdV6\public\util\entry.js > C:\utd\141213UtdV6\public\bundle.js



},{"C:/utd/141213UtdV6/public/util/O.js":2,"C:/utd/141213UtdV6/public/util/UtilClass.js":3,"C:/utd/141213UtdV6/public/util/UtilDate.js":4,"C:/utd/141213UtdV6/public/util/UtilExceptionStack.js":5,"C:/utd/141213UtdV6/public/util/UtilHrefThisText.js":6,"C:/utd/141213UtdV6/public/util/UtilJsTypeDetect.js":7,"C:/utd/141213UtdV6/public/util/UtilString.js":8}]},{},[9]);

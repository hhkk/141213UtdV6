(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                    s = s + '\r\n' + i + '. not appending function definition!';
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


if (typeof exports !== 'undefined') {
    exports.getClass = getClass;
}

},{}],2:[function(require,module,exports){
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


var dateFromString = function(year, month, day, hours, minutes, seconds, milliseconds) {

    try {
        return new Date(year, month, day, hours, minutes, seconds, milliseconds);
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

var dateStringYYYYetcFromDate = function(dt)
{
    var dtstr =
        dt.getFullYear() + '-' +
        padnum(dt.getMonth()+1) + '-' +
        padnum(dt.getDate()) + ' ' +
        padnum(dt.getHours()) + ':' +
        padnum(dt.getMinutes()) + ':' +
        padnum(dt.getSeconds());
    console.log ('converted date [' + dt + '] to [' + dtstr + ']');
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
var renderAgeAsLetterFromNowToFileDateStr =function (dtthen) // date obj
{
    //O.o('date processing [' + d + '] len ['+ ']');
    try
    {
        // NOW
        var now = new Date();


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

        var ago = (now - dtthen)/1000;
        //(yyyy23-yyyy) * 365 * 24 * 3600 +
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

        if (ago < _ss)
            return '1<font size=-3>sec</font>';
        else if (ago < (60*_ss))
            return '< 1<font size=-3>min</font>';
        else if (ago < (10 * 60*_ss))
            return '< 10<font size=-3>min</font>';
        else if (ago < (10 * 60*_ss))
            return '< 30<font size=-3>min</font>';
        else if (ago < _hh)
        {
            var ageInMins = Math.round(ago/_mn);
            if (ageInMins < 50)
                return '<1h';
            else
                return '1h';
        }

        else if (ago < _dd)
        {
            var ageInHours = Math.round(ago/_hh);
            return ageInHours+'h';
        }
        else if (ago < _ww)
        {
            var ageInDays = Math.round(ago/_dd);
            return ageInDays+'d';
        }
        else if (ago < _mm)
        {
            var ageInWeeks = Math.round(ago/_ww);
            return ageInWeeks+'w';
        }
        else if (ago < _yyyy)
        {
            var ageInMo = Math.round(ago/30.5*24*3600);
            return ageInMo+'m';
        }
        else
        {
            throw 'should not be here';
            //var ageInMo = Math.round(ago/_yyyy);
            //return ageInMo+'y';
        }

        return '';


        //				if (ago > _yyyy)
        //				return 'y'
        //			else if (ago > _mm)
        //				return 'm'
        //			else if (ago > _ww)
        //				return 'w'
        //			else if (ago > _dd)
        //				return 'd'
        //			else if (ago > _hh)
        //				return 'h'
        //			else if (ago > _mn)
        //				return 'm'
        //			else if (ago > _ss)
        //				return 's'
        //			else // subsecond
        //				return's'
    } catch (e)
    {
        //System.err.println ('error converting date ['+d+'] ' + e.getMessage());
        //e.printStackTrace();
        console.log ('e:' + e) ;
        return '1+y';
    }


}; // render age as letter











// on getClassSub (desc, obj)

if (typeof exports !== 'undefined') {
    exports.dateFromComponents = dateFromComponents;
    exports.renderAgeAsLetterFromNowToFileDateStr = renderAgeAsLetterFromNowToFileDateStr;
    exports.dateStringYYYYetcFromDate = dateStringYYYYetcFromDate;
    exports.browserifyTest = browserifyTest;
}


var test = false;
if (test)
{
    var then = new Date();
    console.log ('then pre:' + dateStringYYYYetcFromDate(then));
    then.setMonth(2);
    //then.setFullYear(2014);
    console.log ('then post:' + dateStringYYYYetcFromDate(then));
    var now = new Date();
    var dtstr = dateStringYYYYetcFromDate(now);

    var timethen = then.getTime();
    var timenow = now.getTime();

    var diff = timenow-timethen;

    console.log ('dtstr:' + dtstr);
    console.log ('diff:' + diff);
    console.log ('timethen:' + timethen);
    console.log ('then:' + then);
    console.log ('rendered:' + renderAgeAsLetterFromNowToFileDateStr (then));
}

},{"C:/utd/141213UtdV6/public/util/UtilClass.js":1}],3:[function(require,module,exports){
//utd = [];   // ustodo utilities
//utd[Date] = require('C:/utd/141213UtdV6/public/util/UtilDate.js');
//utd[Class] = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
//utd[HtmlHref] = require('C:/utd/141213UtdV6/public/util/UtilHtmlHref.js');

// 1107
UtilDate = require('C:/utd/141213UtdV6/public/util/UtilDate.js');
UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');

},{"C:/utd/141213UtdV6/public/util/UtilClass.js":1,"C:/utd/141213UtdV6/public/util/UtilDate.js":2}]},{},[3]);

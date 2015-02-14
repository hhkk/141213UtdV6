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

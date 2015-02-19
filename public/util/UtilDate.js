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
        var y = dtStrFull.slice(0,4);
        var m = dtStrFull.slice(5,7);
        var d = dtStrFull.slice(8,10);
        var h = dtStrFull.slice(11,13);
        var mn= dtStrFull.slice(14,16);
        var s = dtStrFull.slice(17,19);
        var ms= dtStrFull.slice(20,23);
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
    console.log('callCount_timeAgo:' + callCount_timeAgo + ' dtStrMongoStyle:' + dtStrMongoStyle);

    if (dtStrMongoStyle === '2013-04-09T00:06:09.000Z')
    {
        console.log('break on 2013-04-09T00:06:09.000Z');
    }
    //O.o('date processing [' + d + '] len ['+ ']');
    try
    {
        var dtObjthen = dateObjFromMongoString(dtStrMongoStyle);
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

        var nowsec = now.getTime();
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
            return '1<font size=-3>sec</font>';
        else if (agoSecs < (60*_ss))
            return '< 1<font size=-3>min</font>';
        else if (agoSecs < (10 * 60*_ss))
            return '< 10<font size=-3>min</font>';
        else if (agoSecs < (10 * 60*_ss))
            return '< 30<font size=-3>min</font>';
        else if (agoSecs < _hh)
        {
            var ageInMins = Math.round(agoSecs/_mn);
            if (ageInMins < 50)
                return '<1h';
            else
                return '1h';
        }

        else if (agoSecs < _dd)
        {
            var ageInHours = Math.round(agoSecs/_hh);
            return ageInHours+'h';
        }
        else if (agoSecs < _ww)
        {
            var ageInDays = Math.round(agoSecs/_dd);
            return ageInDays+'d';
        }
        else if (agoSecs < _mm)
        {
            var ageInWeeks = Math.round(agoSecs/_ww);
            return ageInWeeks+'w';
        }
        else if (agoSecs < _yyyy)
        {
            var ageInMo = Math.round(agoSecs/30.5*24*3600);
            return ageInMo+'m';
        }
        else
        {
            //throw 'should not be here';
            var ageInYr = Math.round(agoSecs/_yyyy);
            return ageInYr + 'y';
        }

        return '';


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
        alert ('erra dtStrMongoStyle:'+dtStrMongoStyle);
        return '1+y';
    }


}; // render age as letter











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
    console.log ('rendered timeAgo:' + timeAgo (then));
}



// on getClassSub (desc, obj)

if (typeof exports !== 'undefined') {
    exports.dateFromComponents = dateFromComponents;
    exports.timeAgo = timeAgo;
    exports.dateStringYYYYetcFromDate = dateStringYYYYetcFromDate;
    exports.browserifyTest = browserifyTest;
    exports.padnum = padnum;
    exports.dateObjFromMongoString = dateObjFromMongoString;
}


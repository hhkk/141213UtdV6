
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



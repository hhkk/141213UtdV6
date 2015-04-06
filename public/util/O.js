
/**
 * Created by henryms on 3/2/2015.
 */
// var O = require('C:/utd/141213UtdV6/public/util/O.js');


//alert ('redefine alerthistory');
var alertHistory = [];

/**
 * output only
 * @param s
 */
// one and only console logger
// private
var callcount_o = 0;
var o = function (s)
{
    var t = callcount_o++ + '. olog:' + s
    console.log(t);
    appendFileSync('c:/tmp/t.txt', t);
    //console.log(callcount_o++ + '. olog:' + s + ' alertHistory:' + alertHistory);
}

// error
var e = function (s)
{
    var t = callcount_o++ + '. olog:' + s
    console.error(t);
    appendFileSync('c:/tmp/t.txt', t);
    //console.log(callcount_o++ + '. olog:' + s + ' alertHistory:' + alertHistory);
}
/**
 * alert - implies output with alert history log
 * @param s
 */
var a = function (s)
{
    //alert ('old len:' + alertHistory.length);
    var s = '['+alertHistory.length + '.'+s + ';'+']';
    alertHistory.push (s);
    //alert ('new len:' + alertHistory.length);
    o('a:' + s);
    alert (s + ' hist:' + alertHistory);
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
var appendFileSync = function (filefqname, s) {
    fs.appendFileSync(filefqname, s + '\r\n');
}

var test = false;
if (test) {
    writeFileSync('c:/tmp/t.txt', 'time in a bottle\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle2\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle3\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle4\r\n');
    appendFileSync('c:/tmp/t.txt', 'time in a bottle5\r\n');
}



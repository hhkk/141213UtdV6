
/**
 * Created by henryms on 3/2/2015.
 */
// var UtilLog = require('C:/utd/141213UtdV6/public/util/UtilLog.js');


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
    console.log(callcount_o++ + '. olog:' + s + ' alertHistory:' + alertHistory);
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
}

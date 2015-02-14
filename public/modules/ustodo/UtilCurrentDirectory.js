'use strict';

/**
 * Created with IntelliJ IDEA.
 * User: hkon
 * Date: 3/3/13
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */

// var UtilHtmlHref = require('C:/utd/141213UtdV6/public/util/UtilHtmlHref.js');

function getDirName ()
{
    return __dirname;  //eg  __dirname:c:\utd\141213UtdV6\app\controllers where js is rnning from
    // let'cs see what's on the client side
}



// C:\utd\141213UtdV6\public\modules\ustodo\UtilDirName.js
// UtilDirName.getDirName
// client require
    // require '/modules/ustodo/UtilDirName.js'
// server require
    // var UtilNodeVsBrowser  = require('../../public/modules/ustodo/UtilClass');

var getDirName = function ()
{
    return getDirName();
}; // function getClass(desc, obj)


if (typeof exports !== 'undefined') {
    exports.getDirName = getDirName;
}



var test = false;
if (test)
{
    console.log('in test');
}

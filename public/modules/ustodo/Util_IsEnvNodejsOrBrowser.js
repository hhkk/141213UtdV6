// see interesting perspective
// http://www.quirksmode.org/js/support.html
// if (window.focus)
//     means: "If the focus method is supported", while this code
// if (window.focus())
//     means: "If you can put the focus on the window" and assumes that focus is
// --> if (window.focus) window.focus()

// one idea
//try {
//    var fs = require('fs')
//} catch(e) {
//    alert('you are not in node !!!')
//}

// main page
// http://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js


/**
 * Created with IntelliJ IDEA.
 * User: hkon
 * Date: 3/3/13
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */

//C:\141118UsToDoV3\public\lib\ustodo\UtilClass.js

function isEnvNodeOrBrowser ()
{
    if (typeof window === 'undefined') {
        return true;
        //exports.foo = {};
    } else {
        return false;
        //window.foo = {};
    }
}


// C:\utd\141213UtdV6\public\modules\ustodo\UtilNodeVsBrowser.js
// UtilNodeVsBrowser.getClassSub
// client require
// require modules\ustodo
// server require
// var UtilNodeVsBrowser  = require('../../public/modules/ustodo/UtilClass');



exports.isEnvNodeOrBrowser = function ()
{
    return isEnvNodeOrBrowser ();

} // function getClass(desc, obj)



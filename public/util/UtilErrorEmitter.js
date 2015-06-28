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
// var UtilClass = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilGetClass.js');


function EmitError (desc, err)
{

    try {
        console.log ('error in err.message:' + err.message);
        console.log ('error in err.stack:' + err.stack);
    } catch (e) {
        console.log ('error in getClass:e:' + e.message);
        console.log ('error in getClass:estack:' + e.stack);
    }
}  //




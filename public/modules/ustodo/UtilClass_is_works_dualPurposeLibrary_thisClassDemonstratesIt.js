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
// var UtilClass3_isString = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass3_isString.js');




var isArray = function(a) {

    try {
        return Array.isArray(a);
    } catch (e) {
        console.log ('error in UtilClass:e:' + e.message);
        console.log ('error in getClass:estack:' + e.stack);
    }

};  // function

var isString = function(s) {

    try {
        return typeof s === 'string' || s instanceof String;
    } catch (e) {
        console.log ('error in UtilClass3:e:' + e.message);
        console.log ('error in getClass:estack:' + e.stack);
    }

};  // function

// on getClassSub (desc, obj)

if (typeof exports !== 'undefined') {
    exports.isArray = isArray;
    exports.isString = isString;
}

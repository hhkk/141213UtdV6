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
// var UtilExceptionStack = require('C:/utd/141213UtdV6/public/util/UtilExceptionStack.js');

var print_call_stack = function() {
    var stack = new Error().stack;
    console.log("PRINTING CALL STACK");
    console.log( stack );
}

if (typeof exports !== 'undefined') {
    exports.print_call_stack = print_call_stack ;
}


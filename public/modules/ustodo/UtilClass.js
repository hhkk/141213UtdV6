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
// var UtilClass = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilClass.js');


var icallcnt_getClassSub = 0;
function getClassSub (desc, obj)
{
    var s = null;

    try {
        ++icallcnt_getClassSub;
        s = '\r\n' + icallcnt_getClassSub + '. +++++++++++++++++++++++++++++++++++++++++++++++++++';
        s = s + '\r\n exports.getClassSub:' + desc + ' [' + desc + ']\r\n\r\n';
        if (obj === null)
            s = s + '\r\n  getClassSub a says desc [' + desc + '] obj passed in is null. ';
        if (obj === undefined)
            s = s + '\r\n  getClassSub a says desc [' + desc + '] obj passed in is undefined. ';
        else {
            s = s + '\r\n  getClassSub a says desc [' + desc + ']. ';
            s = s + '\r\n a.0b obj.toString [' + obj.toString() + '], ';

            s = s + '\r\n a.1 typeof obj [' + typeof obj + '], ';

            s = s + '\r\n a.2 Array.isArray(obj) [' + Array.isArray(obj)+ '], ';

            s = s + '\r\n b getClassSub obj.prototype string [' + Object.prototype.toString.call(obj) + ']';

            s = s + '\r\n c obj.prototype parsed [' + Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] + '] ';

            s = s + '\r\n d obj.constructor parsed [' + obj.constructor + '] ';


            var properties = [];
            s = s + ('\r\n e typeof properties [' + typeof properties + ']');

            var i = 0;
            for (var key in obj) {
                i++;
                var hasOwnPropIndicator = obj.hasOwnProperty(key);
                var obj_key = 'obj_key is really null';
                s = s + '\r\nPROPHK get type of prop key keyname [' + key + '] : typeof obj[key]:'+ typeof obj[key];
                if (obj[key] !== null && obj[key] !== undefined && typeof obj[key] !== 'object')
                    obj_key = obj[key].toString();
                if (typeof obj[key] === 'object')
                    obj_key = 'typeof obj[key] == \'object\'';
                if (obj[key] === undefined)
                    obj_key = 'obj_key is undefined';

                // careful this will print out a function property as a string!!  this is a big one!!!!
                if ((typeof obj[key]).toString() !== 'function') {
                    s = s + '\r\n' + i + '. props desc [' + desc + '] name ['+key + '] value [' + obj_key + '] hasOwnPropIndicator [' + hasOwnPropIndicator + ']';
                } else {
                    s = s + '\r\n' + i + '. not appending function definition!';
                }
                //if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                //if (obj.hasOwnProperty(key) ) {
                if (typeof obj[key] !== 'function')
                    key = 'property_non_function_key:' + key;
                else
                    key = 'property_function_key:' + key;
                properties.push(key);
                if (key === 'srcElement') // object Window
                {
                    s = s + '\r\n' + i + '. found prop srcElement[' + getClassSub('recCall', obj.srcElement) + ']'; // shows ageLetter etc
                    if (obj.srcElement === null) {
                        s = s + '\r\n' + i + '. but its value is null!!!!!!!!!!!!!!!!!!!!';
                    }
                }
                //alert ('found prop[' + key + ']'); shows ageLetter etc
                //}
            }

            s = ' getclass desc [' + desc + '] ' + s + '(\r\n PROPERTIES found [' + properties.length + '] keys in object keys are <<' + properties.join(', ') + '>>, ';
        }


        //var cons = ', this.constructor:' + this.constructor
        //oalert ('in getclass: $(this).prototype.toString()))' + ($(this).prototype.toString()));
        //if (typeof obj === 'undefined')
            //s = s + ' UsToDo says this class desc [' + desc + '] is undefined. ' + cons;
    } catch (e) {

        console.log ('error in getClass:e:' + e.message);
        console.log ('error in getClass:estack:' + e.stack);
    }

    return s;

}  // functi
// on getClassSub (desc, obj)



var utilGetClass = function (desc, obj)    {

    var s = '<================== BEGIN exports.UtilClass:' + 'exports.getClass:' + desc + ' [' + desc + ']\r\n\r\n';
    //return s;

    //s = s + 'obj.constructor [' + obj.constructor + '], ';

    if (obj)
    {
        s = s + '\r\n\r\na.(obj) getclass1 obj:' + getClassSub ('['+desc+'].itself:', obj);

        s = s + '\r\n\r\nb.(obj.parent) getclass2 parent:' + getClassSub ('['+desc+'].parent:', obj.parent );
        //return s;
    }
    else
    {
        s = s + '\r\n\r\nskip getclass1 and getclass2 as obj is NOT';
    }

    //careful - this includes this long method output!!
     s = s + '\r\n\r\nc.(this) getclassmain3 this:' + getClassSub ('['+this+'].itself:', this );
    s = s + '\r\n\r\nEND exports.UtilClass ==================>';


    //s = s + 'this.constructor [' + this.constructor + '], ';
    //s = s + 'this.parent.constructor [' + this.parent.constructor + '], ';

    // see http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
    //        see also Object.getPrototypeOf(a);
    //        Depending on what you need #getClass() for, there are several options in JavaScript:
    //
    //        typeof()
    //                instanceof
    //                func.prototype, proto.isPrototypeOf
    //        obj.constructor

    // TODO CONSIDER THESE:
    //oalert ('$(this).getName():' + $(this).getName());
    //oalert ('getClass($(this).parent())):' + getClass($(this).parent()));
    //oalert ('getClass($(this).parent())):' + $(this).constructor);
    //oalert ('this.class:' + this.class);
    //oalert ('this.class:' + this.class);
    //oalert ('this.constructor:' + this.constructor);
    return s;

}; // function getClass(desc, obj)


if (typeof exports !== 'undefined') {
    exports.utilGetClass = utilGetClass;
}

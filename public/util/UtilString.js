// var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');

var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
}


// http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

// http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
// console.log ('111111111111111111111 defining function');
String.prototype.hasUpperCase = function () {
    var str = this;
    var arr = str.split('');
    //console.log ('@@@@@@@@@@@@@@@@@@@@@@@@@@ in fn str [' + str + ']');
    for (var c in arr) {
        //console.log ('testing case of [' + c + ']');
        var cc = arr[c];
        if (cc >= 'A' && cc <= 'Z') {
            //console.log ('mixed case return true');
            return true;
        }
    }
    return false;
};












if (typeof exports !== 'undefined') {
    exports.endsWith = endsWith;
}



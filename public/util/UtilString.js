// var UtilDate = require('C:/utd/141213UtdV6/public/modules/ustodo/UtilDate.js');


String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
}

var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

if (typeof exports !== 'undefined') {
    exports.endsWith = endsWith;
}

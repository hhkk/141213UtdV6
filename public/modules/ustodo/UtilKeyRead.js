/**
 * Created by henryms on 1/15/2015.
 */

// var UtilKeyRead = require ('C:/utd/141213UtdV6/public/modules/ustodo/UtilKeyRead.js');
// response = UtilKeyRead.getInput("enter y or n for remove or not");

//if (response.toString() === "y") {
//    console.log ("you typed y");
//}else {
//    console.log ("you typed not y");
//}



var readline = require('readline');

exports.getInput =function(s) {
    console.log ("prompt:" + s);
    process.stdin.resume();
    var fs = require('fs');
    var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
    process.stdin.pause();
    return response[0].slice(0,response[0].length-1);
}

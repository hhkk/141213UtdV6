var readline = require('readline');

exports.getInput =function(s) {
    console.log ("prompt:" + s);
    process.stdin.resume();
    var fs = require('fs');
    var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
    process.stdin.pause();
    return response[0].slice(0,response[0].length-1);
}


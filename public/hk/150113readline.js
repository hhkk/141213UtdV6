var readline = require('readline');

exports.getInput =function(s) {


    console.log ("prompt:" + s);
    process.stdin.resume();
    var fs = require('fs');
    var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
    process.stdin.pause();
    //console.log("Array.isArray(response):" + Array.isArray(response));
    //console.log("response:" + response);
    //console.log(process.stdin)
    return response[0];






    //var rl = readline.createInterface({
    //    input: process.stdin,
    //    output: process.stdout,
    //    terminal: false
    //});
    //
    //rl.on('line', function (cmd) {
    //    console.log('You just typed: '+cmd);
    //});
    //
    //console.log ("past read");
    //



    //process.stdin.resume();
    //var fs = require('fs');
    //var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
    //console.log ("response:" + response);
    //process.stdin.pause();







    //console.log ("in    150113readline.js");
    //var readline = require('readline');
    //
    //var rl = readline.createInterface({
    //    input: process.stdin,
    //    output: process.stdout,
    //    terminal: false
    //});
    //
    //rl.on('line', function (cmd) {
    //    console.log('You just typed: '+cmd);
    //});












    //var readline = require('readline'),
    //    rl = readline.createInterface(process.stdin, process.stdout);
    //
    //rl.setPrompt('enter text hk> ');
    //rl.prompt();
    //
    //rl.on('line', function(line) {
    //
    //    switch(line.trim()) {
    //        case 'hello':
    //            console.log('world!');
    //            break;
    //        default:
    //            console.log('Say what? I might have heard `' + line.trim() + '`');
    //            break;
    //    }
    //    rl.prompt();
    //}).on('close', function() {
    //    console.log('Have a great day!');
    //    process.exit(0);
    //});

}


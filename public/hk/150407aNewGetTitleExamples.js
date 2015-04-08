
var http = require('follow-redirects').http;
var O = require('C:/utd/141213UtdV6/public/util/O.js');

//var http = require('http');
var getTitle = function(url) {
    var urlOpts = {host: url, path: '/', port: '80'};
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
    http.get(urlOpts, function (response) {
        response.on('data', function (chunk) {
            var str=chunk.toString();
            var match = re.exec(str);
            if (match && match[2]) {
                console.log(match[2]);
            }
        });
        response.on('end', function (chunk) {
            var str=chunk.toString();
            var match = re.exec(str);
            if (match && match[2]) {
                console.log(match[2]);
            }
        });
    });
};


try {
    //getTitle('www.nodejs.org');//ok
    //getTitle('www.ibm.com');//ok
    getTitle('www.dell.com');
} catch (e) {
    O.e ('e:' + e);
}


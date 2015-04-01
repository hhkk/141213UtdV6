//var XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;
//
//var client = new XMLHttpRequest();
//client.open('GET', 'http://netflix.com/');
//client.addEventListener('load', function(event) {
//    console.log('HTTP Request OSHIMAI.');
//}, false);
//client.send();



var XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

var client = new XMLHttpRequest();
client.open('GET', 'http://netflix.com');
client.responseType = 'json';
client.addEventListener('load', function() {
    var data = client.response;
    console.log('data:' + data);
    if (data.meta.status !== 200) {
        return;
    }
    console.log(data.response.blog.title);
}, false);
client.send();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ustodo-dev');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
});
var UstodoSchema = mongoose.Schema({
    text: String
})
var Ustodo = mongoose.model('Ustodo', UstodoSchema)

//Ustodo.find(function (err, kittens) {
//    if (err) return console.error(err);
//    //console.log(kittens)
//})
var callback = function(a, b) {
    console.log ('in callback a' + a);
    console.log ('in callback b' + b);
    //console.log ('in callback c');
}

var y = 'thorx'
var yp = new RegExp(y, 'i');
var queryy = {text:yp}; // works

//console.log ('yp:' + yp);

Ustodo.find(queryy, callback);


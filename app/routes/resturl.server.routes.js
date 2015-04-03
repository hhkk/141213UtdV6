'use strict';

//console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\routes

module.exports = function(app) {

    var resturl = require('../../app/controllers/resturl.server.controller');

    var a150403AsyncExample_WithHttpGet_ItemStyle = require('C:/utd/141213UtdV6/public/hk/150403AsyncExample_WithHttpGet_ItemStyle.js');


    function Item(url){
        this.url= url;
        this.title=null;
    }

    // localhost:3000/resturl
    //http://localhost:3000/resturl?q=http://www.apple.com
    app.get('/resturl', function(req, res) {
        //var urlstruct = {};
        //urlstruct.test = 'hihk';
        //res.json(urlstruct);
        console.log ('req.query.q:' + req.query.q)
        var itemsxxxxy = [];
        itemsxxxxy.push(new Item(req.query.q)); // // no such domain
        //itemsxxxxy.push(new Item('http://www.dgsdfgdfgsdgsdfgsdgsdgsfdg.com')); // // no such domain
        //itemsxxxxy.push(new Item('http://www.dell.com')); // failed on method 1 - needs fallback
        //itemsxxxx.push(new Item('http://www.tame.com')); // takes longer and fails
        //itemsxxxxy.push(new Item('http://www.apple.com')); // ok w/2
        a150403AsyncExample_WithHttpGet_ItemStyle.asyncWrapperForTitle_levelOne(itemsxxxxy, res);

    });

    // http://localhost:3000/resturl2?q=ibm.com
    app.route('/resturl2')
       .get(resturl.get);

    // Ustodos Routes
    //app.route('/resturl')
    //    .get();


    // Finish by binding the Ustodo middleware
    //app.param('ustodoId', ustodos.ustodoByID);
};

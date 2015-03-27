'use strict';

//console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\routes

module.exports = function(app) {

    var resturl = require('../../app/controllers/resturl.server.controller');

    // calhost:3000/resturl
    app.get('/resturl', function(req, res) {
        var urlstruct = {};
        urlstruct.test = 'hihk';
        res.json(urlstruct);
    });

    app.route('/resturl2')
       .get(resturl.get);

    // Ustodos Routes
    //app.route('/resturl')
    //    .get();


    // Finish by binding the Ustodo middleware
    //app.param('ustodoId', ustodos.ustodoByID);
};

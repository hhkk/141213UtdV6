'use strict';

	//console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\routes

module.exports = function(app) {
	var users = require('../controllers/users.server.controller');
	var ustodos = require('../controllers/ustodos.server.controller');

	// Ustodos Routes
	app.route('/ustodos')
		.get(ustodos.list)
		.post(users.requiresLogin, ustodos.create);

	app.route('/ustodos/:ustodoId')
		.get(ustodos.read)
		.put(users.requiresLogin, ustodos.hasAuthorization, ustodos.update)
		.delete(users.requiresLogin, ustodos.hasAuthorization, ustodos.delete);

	// Finish by binding the Ustodo middleware
	app.param('ustodoId', ustodos.ustodoByID);
};

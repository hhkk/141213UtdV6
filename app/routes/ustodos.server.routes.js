'use strict';

	//console.log ('__dirname:' + __dirname);  // __dirname:c:\utd\141213UtdV6\app\routes

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ustodos = require('../../app/controllers/ustodos.server.controller');

	// Ustodos Routes
	app.route('/ustodos')
		.get(ustodos.list2)  // exports.list2 in C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
		.post(users.requiresLogin, ustodos.create);

	//app.route('/ustodosremove')
//		.post(users.requiresLogin, ustodos.create);

		app.route('/ustodobulkdel')
		.delete(users.requiresLogin, ustodos.ustodobulkdel);

	app.route('/ustodos/:ustodoId')
		.get(ustodos.read)
		.put(users.requiresLogin, ustodos.hasAuthorization, ustodos.update)
		.delete(users.requiresLogin, ustodos.hasAuthorization, ustodos.delete2);

	// Finish by binding the Ustodo middleware
	app.param('ustodoId', ustodos.ustodoByID);
};

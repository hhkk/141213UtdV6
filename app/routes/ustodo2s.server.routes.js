'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ustodo2s = require('../../app/controllers/ustodo2s.server.controller');

	// Ustodo2s Routes
	app.route('/ustodo2s')
		.get(ustodo2s.list)
		.post(users.requiresLogin, ustodo2s.create);

	app.route('/ustodo2s/:ustodo2Id')
		.get(ustodo2s.read)
		.put(users.requiresLogin, ustodo2s.hasAuthorization, ustodo2s.update)
		.delete(users.requiresLogin, ustodo2s.hasAuthorization, ustodo2s.delete);

	// Finish by binding the Ustodo2 middleware
	app.param('ustodo2Id', ustodo2s.ustodo2ByID);
};

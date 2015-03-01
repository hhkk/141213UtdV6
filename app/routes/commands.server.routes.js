'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var commands = require('../../app/controllers/commands.server.controller');

	// Commands Routes
	app.route('/commands')
		.get(commands.list)
		.post(users.requiresLogin, commands.create);

	app.route('/commands/:commandId')
		.get(commands.read)
		.put(users.requiresLogin, commands.hasAuthorization, commands.update)
		.delete(users.requiresLogin, commands.hasAuthorization, commands.delete);

	// Finish by binding the Command middleware
	app.param('commandId', commands.commandByID);
};

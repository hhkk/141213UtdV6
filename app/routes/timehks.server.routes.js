'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var timehks = require('../../app/controllers/timehks.server.controller');

	// Timehks Routes
	app.route('/timehks')
		.get(timehks.list)
		.post(users.requiresLogin, timehks.create);

	app.route('/timehks/:timehkId')
		.get(timehks.read)
		.put(users.requiresLogin, timehks.hasAuthorization, timehks.update)
		.delete(users.requiresLogin, timehks.hasAuthorization, timehks.delete);

	// Finish by binding the Timehk middleware
	app.param('timehkId', timehks.timehkByID);
};

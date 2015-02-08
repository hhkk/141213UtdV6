'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ustodooris = require('../../app/controllers/ustodooris.server.controller');

	// Ustodooris Routes
	app.route('/ustodooris')
		.get(ustodooris.list)
		.post(users.requiresLogin, ustodooris.create);

	app.route('/ustodooris/:ustodooriId')
		.get(ustodooris.read)
		.put(users.requiresLogin, ustodooris.hasAuthorization, ustodooris.update)
		.delete(users.requiresLogin, ustodooris.hasAuthorization, ustodooris.delete);

	// Finish by binding the Ustodoori middleware
	app.param('ustodooriId', ustodooris.ustodooriByID);
};

'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var rawrecords = require('../../app/controllers/rawrecords.server.controller');

	// Rawrecords Routes
	app.route('/rawrecords')
		.get(rawrecords.list)
		.post(users.requiresLogin, rawrecords.create);

	app.route('/rawrecords/:rawrecordId')
		.get(rawrecords.read)
		.put(users.requiresLogin, rawrecords.hasAuthorization, rawrecords.update)
		.delete(users.requiresLogin, rawrecords.hasAuthorization, rawrecords.delete);

	// Finish by binding the Rawrecord middleware
	app.param('rawrecordId', rawrecords.rawrecordByID);
};

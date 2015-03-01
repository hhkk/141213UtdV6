'use strict';

//Setting up route
angular.module('commands').config(['$stateProvider',
	function($stateProvider) {
		// Commands state routing
		$stateProvider.
		state('listCommands', {
			url: '/commands',
			templateUrl: 'modules/commands/views/list-commands.client.view.html'
		}).
		state('createCommand', {
			url: '/commands/create',
			templateUrl: 'modules/commands/views/create-command.client.view.html'
		}).
		state('viewCommand', {
			url: '/commands/:commandId',
			templateUrl: 'modules/commands/views/view-command.client.view.html'
		}).
		state('editCommand', {
			url: '/commands/:commandId/edit',
			templateUrl: 'modules/commands/views/edit-command.client.view.html'
		});
	}
]);
'use strict';

//Setting up route
angular.module('ustodo2s').config(['$stateProvider',
	function($stateProvider) {
		// Ustodo2s state routing
		$stateProvider.
		state('listUstodo2s', {
			url: '/ustodo2s',
			templateUrl: 'modules/ustodo2s/views/list-ustodo2s.client.view.html'
		}).
		state('createUstodo2', {
			url: '/ustodo2s/create',
			templateUrl: 'modules/ustodo2s/views/create-ustodo2.client.view.html'
		}).
		state('viewUstodo2', {
			url: '/ustodo2s/:ustodo2Id',
			templateUrl: 'modules/ustodo2s/views/view-ustodo2.client.view.html'
		}).
		state('editUstodo2', {
			url: '/ustodo2s/:ustodo2Id/edit',
			templateUrl: 'modules/ustodo2s/views/edit-ustodo2.client.view.html'
		});
	}
]);
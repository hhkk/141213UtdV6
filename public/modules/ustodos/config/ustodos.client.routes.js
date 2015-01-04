'use strict';

//Setting up route
angular.module('ustodos').config(['$stateProvider',
	function($stateProvider) {
		// Ustodos state routing
		$stateProvider.
		state('listUstodos', {
			// http://localhost:3000/#!/ustodos
			url: '/ustodos',
			templateUrl: 'modules/ustodos/views/list-ustodos.client.view.html'
		}).
		state('createUstodo', {
			//http://localhost:3000/#!/ustodos/create
			url: '/ustodos/create',
			templateUrl: 'modules/ustodos/views/create-ustodo.client.view.html'
		}).
		state('findlistUstodos', {
			// http://localhost:3000/#!/ustodos/findlist
			url: '/ustodos/findlist',
			templateUrl: 'modules/ustodos/views/findlist-ustodos.client.view.html'
		}).
		state('findlistUstodosSearch', {
			// http://localhost:3000/#!/ustodos/findlistustodosearch/testing  ??
			url: '/ustodos/findlistustodosearch/:searchstring',
			templateUrl: 'modules/ustodos/views/findlist-ustodos.client.view.html'
		}).
		state('viewUstodo', {
			// http://localhost:3000/#!/ustodos/549d29c6006bc4041fb22e70
			url: '/ustodos/:ustodoId',
			templateUrl: 'modules/ustodos/views/view-ustodo.client.view.html'
		}).
		state('editUstodo', {
			url: '/ustodos/:ustodoId/edit',
			templateUrl: 'modules/ustodos/views/edit-ustodo.client.view.html'
		})
		;
	}
]);

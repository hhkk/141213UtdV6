'use strict';

//Setting up route
angular.module('ustodooris').config(['$stateProvider',
	function($stateProvider) {
		// Ustodooris state routing
		$stateProvider.
		state('listUstodooris', {
			url: '/ustodooris',
			templateUrl: 'modules/ustodooris/views/list-ustodooris.client.view.html'
		}).
		state('createUstodoori', {
			url: '/ustodooris/create',
			templateUrl: 'modules/ustodooris/views/create-ustodoori.client.view.html'
		}).
		state('viewUstodoori', {
			url: '/ustodooris/:ustodooriId',
			templateUrl: 'modules/ustodooris/views/view-ustodoori.client.view.html'
		}).
		state('editUstodoori', {
			url: '/ustodooris/:ustodooriId/edit',
			templateUrl: 'modules/ustodooris/views/edit-ustodoori.client.view.html'
		});
	}
]);
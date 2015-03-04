'use strict';

//Setting up route
angular.module('rawrecords').config(['$stateProvider',
	function($stateProvider) {
		// Rawrecords state routing
		$stateProvider.
		state('listRawrecords', {
			url: '/rawrecords',
			templateUrl: 'modules/rawrecords/views/list-rawrecords.client.view.html'
		}).
		state('createRawrecord', {
			url: '/rawrecords/create',
			templateUrl: 'modules/rawrecords/views/create-rawrecord.client.view.html'
		}).
		state('viewRawrecord', {
			url: '/rawrecords/:rawrecordId',
			templateUrl: 'modules/rawrecords/views/view-rawrecord.client.view.html'
		}).
		state('editRawrecord', {
			url: '/rawrecords/:rawrecordId/edit',
			templateUrl: 'modules/rawrecords/views/edit-rawrecord.client.view.html'
		});
	}
]);
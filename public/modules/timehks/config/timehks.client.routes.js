'use strict';

//Setting up route
angular.module('timehks').config(['$stateProvider',
	function($stateProvider) {
		// Timehks state routing
		$stateProvider.
		state('listTimehks', {
			url: '/timehks',
			templateUrl: 'modules/timehks/views/list-timehks.client.view.html'
		}).
		state('createTimehk', {
			url: '/timehks/create',
			templateUrl: 'modules/timehks/views/create-timehk.client.view.html'
		}).
		state('viewTimehk', {
			url: '/timehks/:timehkId',
			templateUrl: 'modules/timehks/views/view-timehk.client.view.html'
		}).
			state('editTimehk', {
				url: '/timehks/:timehkId/edit',
				templateUrl: 'modules/timehks/views/edit-timehk.client.view.html'
		}).
		state('editTimehkUsToDo', {
			url: '/timehksustodoxy',
			templateUrl: 'modules/timehks/views/list-timehks.client.view.html'
		})

		;
	}
]);

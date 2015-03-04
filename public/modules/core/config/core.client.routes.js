'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		//$stateProvider.
		//state('home', {
		//	//templateUrl: 'modules/core/views/home.client.view.html'
		//	//templateUrl: 'modules/ustodos/views/view-ustodo.client.view.html'
         //   url: '/',
         //   templateUrl: 'modules/ustodos/views/findlist-ustodos.client.view.html'
         //   //templateUrl: 'modules/core/views/home.client.view.html'
        //
		//});

        //$stateProvider.
        //    state('home', {
        //        url: '/',
        //        templateUrl: 'modules/core/views/home.client.view.html'
        //    });

	}
]);

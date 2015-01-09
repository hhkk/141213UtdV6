'use strict';

//Ustodo2s service used to communicate Ustodo2s REST endpoints
angular.module('ustodo2s').factory('Ustodo2s', ['$resource',
	function($resource) {
		return $resource('ustodo2s/:ustodo2Id', { ustodo2Id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
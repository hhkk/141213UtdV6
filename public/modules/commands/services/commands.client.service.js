'use strict';

//Commands service used to communicate Commands REST endpoints
angular.module('commands').factory('Commands', ['$resource',
	function($resource) {
		return $resource('commands/:commandId', { commandId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
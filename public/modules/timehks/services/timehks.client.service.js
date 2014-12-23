'use strict';

//Timehks service used to communicate Timehks REST endpoints
angular.module('timehks').factory('Timehks', ['$resource',
	function($resource) {
		return $resource('timehks/:timehkId', { timehkId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
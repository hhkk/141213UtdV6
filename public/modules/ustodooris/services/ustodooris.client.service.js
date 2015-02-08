'use strict';

//Ustodooris service used to communicate Ustodooris REST endpoints
angular.module('ustodooris').factory('Ustodooris', ['$resource',
	function($resource) {
		return $resource('ustodooris/:ustodooriId', { ustodooriId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
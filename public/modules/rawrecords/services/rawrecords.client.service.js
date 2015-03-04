'use strict';

//Rawrecords service used to communicate Rawrecords REST endpoints
angular.module('rawrecords').factory('Rawrecords', ['$resource',
	function($resource) {
		return $resource('rawrecords/:rawrecordId', { rawrecordId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
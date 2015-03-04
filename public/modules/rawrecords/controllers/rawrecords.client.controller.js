'use strict';

// Rawrecords controller
angular.module('rawrecords').controller('RawrecordsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rawrecords',
	function($scope, $stateParams, $location, Authentication, Rawrecords) {
		$scope.authentication = Authentication;

		// Create new Rawrecord
		$scope.create = function() {
			// Create new Rawrecord object
			var rawrecord = new Rawrecords ({
				name: this.name
			});

			// Redirect after save
			rawrecord.$save(function(response) {
				$location.path('rawrecords/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Rawrecord
		$scope.remove = function(rawrecord) {
			if ( rawrecord ) { 
				rawrecord.$remove();

				for (var i in $scope.rawrecords) {
					if ($scope.rawrecords [i] === rawrecord) {
						$scope.rawrecords.splice(i, 1);
					}
				}
			} else {
				$scope.rawrecord.$remove(function() {
					$location.path('rawrecords');
				});
			}
		};

		// Update existing Rawrecord
		$scope.update = function() {
			var rawrecord = $scope.rawrecord;

			rawrecord.$update(function() {
				$location.path('rawrecords/' + rawrecord._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rawrecords
		$scope.find = function() {
			$scope.rawrecords = Rawrecords.query();
		};

		// Find existing Rawrecord
		$scope.findOne = function() {
			$scope.rawrecord = Rawrecords.get({ 
				rawrecordId: $stateParams.rawrecordId
			});
		};
	}
]);
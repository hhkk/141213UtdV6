'use strict';

// Ustodo2s controller
angular.module('ustodo2s').controller('Ustodo2sController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ustodo2s',
	function($scope, $stateParams, $location, Authentication, Ustodo2s) {
		$scope.authentication = Authentication;

		// Create new Ustodo2
		$scope.create = function() {
			// Create new Ustodo2 object
			var ustodo2 = new Ustodo2s ({
				name: this.name
			});

			// Redirect after save
			ustodo2.$save(function(response) {
				$location.path('ustodo2s/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ustodo2
		$scope.remove = function(ustodo2) {
			if ( ustodo2 ) { 
				ustodo2.$remove();

				for (var i in $scope.ustodo2s) {
					if ($scope.ustodo2s [i] === ustodo2) {
						$scope.ustodo2s.splice(i, 1);
					}
				}
			} else {
				$scope.ustodo2.$remove(function() {
					$location.path('ustodo2s');
				});
			}
		};

		// Update existing Ustodo2
		$scope.update = function() {
			var ustodo2 = $scope.ustodo2;

			ustodo2.$update(function() {
				$location.path('ustodo2s/' + ustodo2._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ustodo2s
		$scope.find = function() {
			$scope.ustodo2s = Ustodo2s.query();
		};

		// Find existing Ustodo2
		$scope.findOne = function() {
			$scope.ustodo2 = Ustodo2s.get({ 
				ustodo2Id: $stateParams.ustodo2Id
			});
		};
	}
]);
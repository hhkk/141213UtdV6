'use strict';

// Ustodooris controller
angular.module('ustodooris').controller('UstodoorisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ustodooris',
	function($scope, $stateParams, $location, Authentication, Ustodooris) {
		$scope.authentication = Authentication;

		// Create new Ustodoori
		$scope.create = function() {
			// Create new Ustodoori object
			var ustodoori = new Ustodooris ({
				name: this.name
			});

			// Redirect after save
			ustodoori.$save(function(response) {
				$location.path('ustodooris/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ustodoori
		$scope.remove = function(ustodoori) {
			if ( ustodoori ) { 
				ustodoori.$remove();

				for (var i in $scope.ustodooris) {
					if ($scope.ustodooris [i] === ustodoori) {
						$scope.ustodooris.splice(i, 1);
					}
				}
			} else {
				$scope.ustodoori.$remove(function() {
					$location.path('ustodooris');
				});
			}
		};

		// Update existing Ustodoori
		$scope.update = function() {
			var ustodoori = $scope.ustodoori;

			ustodoori.$update(function() {
				$location.path('ustodooris/' + ustodoori._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ustodooris
		$scope.find = function() {
			$scope.ustodooris = Ustodooris.query();
		};

		// Find existing Ustodoori
		$scope.findOne = function() {
			$scope.ustodoori = Ustodooris.get({ 
				ustodooriId: $stateParams.ustodooriId
			});
		};
	}
]);
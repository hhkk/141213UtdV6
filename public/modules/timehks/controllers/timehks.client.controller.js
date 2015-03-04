'use strict';




//angularModule = angular.module('timehks', ['ngSanitize']);

//angularModule = angular.module('timehks', ['ngSanitize'])
//    .directive('onFinishRender', function ($timeout) {
//        O.a ('sss2');
//        return {
//            restrict: 'A',
//            link: function (scope, element, attr) {
//                if (scope.$last === true) {
//                    $timeout(function () {
//                        O.a ('sss3');
//                        scope.$emit('ngRepeatFinished');
//                        alert ('ngRepeatFinished');
//                    });
//                }
//            }
//        };
//
//    });
//



// Timehks controller
angular.module('timehks').controller('TimehksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Timehks',
	function($scope, $stateParams, $location, Authentication, Timehks) {
		$scope.authentication = Authentication;

		// Create new Timehk
		$scope.create = function() {
			// Create new Timehk object
			var timehk = new Timehks ({
				name: this.name
			});

			// Redirect after save
			timehk.$save(function(response) {
				$location.path('timehks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Timehk
		$scope.remove = function(timehk) {
			if ( timehk ) { 
				timehk.$remove();

				for (var i in $scope.timehks) {
					if ($scope.timehks [i] === timehk) {
						$scope.timehks.splice(i, 1);
					}
				}
			} else {
				$scope.timehk.$remove(function() {
					$location.path('timehks');
				});
			}
		};

		// Update existing Timehk
		$scope.update = function() {
			var timehk = $scope.timehk;

			timehk.$update(function() {
				$location.path('timehks/' + timehk._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Timehks
		$scope.find = function() {
			$scope.timehks = Timehks.query();
		};

		// Find existing Timehk
		$scope.findOne = function() {
			$scope.timehk = Timehks.get({ 
				timehkId: $stateParams.timehkId
			});
		};
	}
]);

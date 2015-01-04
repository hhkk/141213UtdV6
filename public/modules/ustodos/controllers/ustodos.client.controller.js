'use strict';


// Ustodos controller
angular.module('ustodos').controller('UstodosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ustodos',
	function($scope, $stateParams, $location, Authentication, Ustodos) {
		$scope.authentication = Authentication;

		$scope.hbkkBindSearch = 'hi mom';

		// Create new Ustodo
		$scope.create = function() {
			console.log ('in ustodos.client.controller CREATE');
			// Create new Ustodo object
			//getProperties('props this:', this);
			//getProperties('props Ustodos:', Ustodos);
			var ustodo = new Ustodos ({
				name: this.name  // hbkk mystery
			});
			//getProperties('props ustodo:', ustodo);

			// Redirect after save
			ustodo.$save(function(response) {
				$location.path('ustodos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ustodo
		$scope.remove = function(ustodo) {
			console.log ('in ustodos.client.controller REMOVE');
			if ( ustodo ) {
				ustodo.$remove();

				for (var i in $scope.ustodos) {
					if ($scope.ustodos [i] === ustodo) {
						$scope.ustodos.splice(i, 1);
					}
				}
			} else {
				$scope.ustodo.$remove(function() {
					$location.path('ustodos');
				});
			}
		};

		// Update existing Ustodo
		$scope.update = function() {
			console.log ('in ustodos.client.controller UPDATE');
			var ustodo = $scope.ustodo;

			ustodo.$update(function() {
				$location.path('ustodos/' + ustodo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ustodos
		$scope.find = function() {
			console.log ('in ustodos.client.controller FIND');
			//getProperties('props Ustodos:', Ustodos);

			//$scope.ustodos = Ustodos.query(); //original
			//returns a single not array, causing a fail $scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
			// seems to work but returns all? $scope.ustodos = Ustodos.query({name: 'ggggg'});
			//$scope.ustodos = Ustodos.query({name: 'ggggg'}); // Works!
			$scope.ustodos = Ustodos.query({name: ''});
			//$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
			//$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
			//$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
			setTimeout(function(){console.log ('in ustodos.client.controller FIND2 $scope.ustodos.length:' + $scope.ustodos.length);}, 2000);
			//console.log ('in ustodos.client.controller FIND2 $scope.ustodos.length:' + $scope.ustodos.length);
			console.log ('in ustodos.client.controller FIND2');

		};

		// Find existing Ustodo
		$scope.findOne = function() {
			console.log ('in ustodos.client.controller FINDONE');
			$scope.ustodo = Ustodos.get({
				// ORIGINAL A/B SPLIT HBKK
				ustodoId: $stateParams.ustodoId    // original
				//ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
				//name: /road/
				//name: 'as'
			});
		};

		// https://www.google.com/search?q=mongo+search+angular+resource&oq=mongo+search+angular+resource&aqs=chrome..69i64j69i57.6281j0j7&sourceid=chrome&es_sm=93&ie=UTF-8
		// http://stackoverflow.com/questions/17552977/using-angularjss-resource-to-query-a-database
		// https://groups.google.com/forum/#!topic/angular/kcV0ZROeBRw

		// Search for new Ustodo (findlist)
		$scope.search = function() {
			console.log ('in ustodos.client.controller SEARCH');
			// find matching
			    console.log ('in search function1');
			    console.log ('in search function2');
			//var patternhk = /$scope.hbkkBindSearch/;
			var tt = Ustodos.query ({name: /a/});
			$scope.ustodos = tt;
			//	// ORIGINAL A/B SPLIT HBKK
			//	//ustodoSearchString: $stateParams.ustodoId
			//name: /a/
			//	//ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
			//	//name: /road/
			//	//name: 'as'

			//$scope.ustodos = Ustodos.query ({name: /141229/});
			//	setTimeout(function(){console.log ('in ustodos.client.controller SEARCH2 $scope.ustodos.length:' + $scope.ustodos.length)}, 2000);


			//getProperties('props this:', this);
			//var ustodo = new Ustodos ({
			//	name: this.name,  // hbkk mystery
			//	hbkkBindSearch: this.hbkkBindSearch // hbkk mystery
				//});
			//getProperties('props ustodo:', ustodo);




			//// Redirect after save
			//ustodo.$save(function(response) {
			//	$location.path('ustodos/' + response._id);
            //
			//	// Clear form fields
			//	$scope.name = '';
			//}, function(errorResponse) {
			//	$scope.error = errorResponse.data.message;
			//});
		};

		// Search for one hbkk existing Ustodo by string
		$scope.searchOne = function() {
			console.log ('in ustodos.client.controller SEARCHONE');
			console.log ('hbkk getting ustodo searchOne :' + $stateParams.ustodoId);
			$scope.ustodo = Ustodos.get({
				// ORIGINAL A/B SPLIT HBKK
				ustodoSearchString: $stateParams.ustodoId
				//ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
				//name: /road/
				//name: 'as'
			});
		};



	}
]);



var getProperties = function (desc, obj)
{
	var j = 0 ;
	for(var propertyName in obj)
	{
		j++;
		var hasOwnPropIndicator = obj.hasOwnProperty(propertyName);
		console.log (j + '. props desc [' + desc + '] name ['+propertyName + '] value [' + obj[propertyName] + '] hasOwnPropIndicator [' + hasOwnPropIndicator + ']');
		// propertyName is what you want
		// you can get the value like this: myObject[propertyName]
	}
};














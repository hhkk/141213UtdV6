'use strict';


//angular.module('ustodos').controller('UstodosController', ['$scope', '$stateParams', '$location', '$document', '$rootScope', '$sce',
//    'Authentication', 'Ustodos',
//    function($scope, $stateParams, $location, $document, $rootScope, $sce, Authentication, Ustodos) {


angular.module('core').controller('HeaderController', ['$scope', '$window', '$location', 'Authentication', 'Menus',
	function($scope, $window, $location, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

        //alert ('defining sayhi');

        $scope.eventClickedTheAnimals = function() {
            //alert ('in eventClickedTheAnimals');
            //alert ('in sayhi df to run $location.search');
            //$location.path('/')
            //$location.url('http://www.yahoo.com')
            //$window.location.href = '#/tab/category/1';

            //works?  var target = angular.element('#textHKKH');
            //alert ('target[0].innerText:'+target[0].innerText);
            //alert ('GLOBAL_commandFromInputBox:'+GLOBAL_commandFromInputBox);

            //if (!GLOBAL_commandFromInputBox)
                $window.location.href = 'http://jpro.co?q=*';
            //else
              //  $window.location.href = 'http://www.google.com/search?q=' + GLOBAL_commandFromInputBox;

            //$location.search('hk', this.commandFromInputBox);
        };




        //<a href="//facebook.com" target="_blank">Facebook</a>
        //<button ng-click="foo()">Facebook</button>
        //JavaScript:
        //
        //var app = angular.module('myApp', []);
        //
        //app.controller('myCtrl', function($scope, $window) {
        //    $scope.foo = function() {
        //        $window.open('//facebook.com');
        //    };
        //});






        $scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

//angular.module('core').config(['$locationProvider',
//    function($locationProvider) {
//        $locationProvider.hashPrefix('!');
//        $locationProvider.html5Mode(true);
//
//    }
//]);
//



'use strict';

// Configuring the Articles module
angular.module('ustodos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ustodos', 'ustodos', 'dropdown', '/ustodos(/create)?');
		Menus.addSubMenuItem('topbar', 'ustodos', 'List Ustodos', 'ustodos');
		Menus.addSubMenuItem('topbar', 'ustodos', 'New Ustodo', 'ustodos/create');
		Menus.addSubMenuItem('topbar', 'ustodos', 'Findlist Ustodo', 'ustodos/findlist');
	}
]);

//angular.module('ustodos').run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
//	var original = $location.path;
//	$location.path = function (path, reload) {
//		if (reload === false) {
//			var lastRoute = $route.current;
//			var un = $rootScope.$on('$locationChangeSuccess', function () {
//				$route.current = lastRoute;
//				un();
//			});
//		}
//		return original.apply($location, [path]);
//	};
//}]);

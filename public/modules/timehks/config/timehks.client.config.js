'use strict';

// Configuring the Articles module
angular.module('timehks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        O.a ('fff1');
		Menus.addMenuItem('topbar', 'Timehks', 'timehks', 'dropdown', '/timehks(/create)?');
		Menus.addSubMenuItem('topbar', 'timehks', 'List Timehks', 'timehks');
		Menus.addSubMenuItem('topbar', 'timehks', 'New Timehk', 'timehks/create');
		Menus.addSubMenuItem('topbar', 'timehks', 'timehksustodox', 'timehksustodoxy');
        O.a('fff2');
	}
]);

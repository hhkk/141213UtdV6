'use strict';

// Configuring the Articles module
angular.module('commands').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Commands', 'commands', 'dropdown', '/commands(/create)?');
		Menus.addSubMenuItem('topbar', 'commands', 'List Commands', 'commands');
		Menus.addSubMenuItem('topbar', 'commands', 'New Command', 'commands/create');
	}
]);
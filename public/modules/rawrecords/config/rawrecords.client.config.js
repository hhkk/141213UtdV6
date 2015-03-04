'use strict';

// Configuring the Articles module
angular.module('rawrecords').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rawrecords', 'rawrecords', 'dropdown', '/rawrecords(/create)?');
		Menus.addSubMenuItem('topbar', 'rawrecords', 'List Rawrecords', 'rawrecords');
		Menus.addSubMenuItem('topbar', 'rawrecords', 'New Rawrecord', 'rawrecords/create');
	}
]);
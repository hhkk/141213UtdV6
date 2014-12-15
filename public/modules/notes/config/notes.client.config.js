'use strict';

// Configuring the Articles module
angular.module('notes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Notes', 'notes', 'dropdown', '/notedata(/create)?');
		Menus.addSubMenuItem('topbar', 'notes', 'List Notes', 'notedata');
        Menus.addSubMenuItem('topbar', 'notes', 'New Note', 'notedata/create');
        Menus.addSubMenuItem('topbar', 'notes', 'NoteData', 'notedata/data');
	}
]);
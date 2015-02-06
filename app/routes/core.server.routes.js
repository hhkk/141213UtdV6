'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
    //app.route('q=rr').get(core.indexsdf);
    app.route('/').get(core.index);
};

'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob');

/**
 * Load app configurations
 */
module.exports = _.extend(
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV) || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
        //if (globPatterns.indexOf('tinymce.js') >= 0 || globPatterns.indexOf('config.js')  >= 0)
//            console.log ('found one');
		if (urlRegex.test(globPatterns)) {
        //    console.log ('added file globPatterns:' + globPatterns);
			output.push(globPatterns);
		} else {
            //console.log ('not exactly adding file globPatterns:' + globPatterns);
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

                //for (var i = 0; i < files.length; i++) {
//                    console.log ('got getJavaScriptAssets file :' + i + '. ' + files[i]);
//                }

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}
    console.log ('done getJavaScriptAssets output.length:' + output.length);
    for (var i = 0; i < output.length; i++) {
        console.log ('got getJavaScriptAssets output :' + i + '. ' + output[i]);
    }

    //alert ('done getJavaScriptAssets output.length:' + output.length);
	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {

    var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};

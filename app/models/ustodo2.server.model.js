'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ustodo2 Schema
 */
var Ustodo2Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ustodo2 name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ustodo2', Ustodo2Schema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Timehk Schema
 */
var TimehkSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Timehk name',
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

mongoose.model('Timehk', TimehkSchema);
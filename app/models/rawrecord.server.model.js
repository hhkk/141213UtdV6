'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rawrecord Schema
 */
var RawrecordSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Rawrecord name',
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

mongoose.model('Rawrecord', RawrecordSchema);
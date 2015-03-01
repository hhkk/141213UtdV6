'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Command Schema
 */
var CommandSchema = new Schema({
    commandCode: {
        type: String,
        default: '',
        required: 'Please fill commandCode',
        trim: true
    },
    commandUrl: {
        type: String,
        default: '',
        required: 'Please fill commandUrl',
        trim: true
    },
    commandDescription: {
        type: String,
        default: 'optional description',
        //required: 'Please fill commandDescription',
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

mongoose.model('Command', CommandSchema);

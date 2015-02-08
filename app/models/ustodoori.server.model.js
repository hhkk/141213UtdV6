'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ustodoori Schema
 */
var UstodooriSchema = new Schema({
    text: {
        type: String,
        default: '',
        required: 'Please enter Ustodoori text',
        trim: true
    },
    json: {
        type: String,
        default: '',
        required: 'Please enter Ustodoori text',
        trim: true
    },
    date: {
        type: Date,
        required: 'Please enter Ustodoori dateori',
        default: Date.now
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

mongoose.model('Ustodoori', UstodooriSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ustodo Schema
 */
var UstodoSchema = new Schema({

        text: {
            type: String,
            default: '',
            required: 'Please enter Ustodoori text',
            trim: true
        },
    //jsonx
    jsonx: {
        type: String,
        default: '',
        required: 'Please enter Ustodoori text',
        trim: true
    },
    html: {
        type: String,
        default: '',
        required: 'Please enter Ustodoori html',
        trim: true
    },
        datelastmod: {
            type: Date,
            required: 'Please enter datelastmod',
            default: Date.now
        },
        datecreated: {
            type: Date,
            required: 'Please enter datecreated',
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


	//name: {
	//	type: String,
	//	default: '',
	//	required: 'Please fill Ustodo name',
	//	trim: true
	//},
	//created: {
	//	type: Date,
	//	default: Date.now
	//},
	//modified: {
	//	type: Date,
	//	default: Date.now
	//},
	//user: {
	//	type: Schema.ObjectId,
	//	ref: 'User'
	//}

});

mongoose.model('Ustodo', UstodoSchema);

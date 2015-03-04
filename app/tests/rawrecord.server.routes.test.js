'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Rawrecord = mongoose.model('Rawrecord'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rawrecord;

/**
 * Rawrecord routes tests
 */
describe('Rawrecord CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Rawrecord
		user.save(function() {
			rawrecord = {
				name: 'Rawrecord Name'
			};

			done();
		});
	});

	it('should be able to save Rawrecord instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecord
				agent.post('/rawrecords')
					.send(rawrecord)
					.expect(200)
					.end(function(rawrecordSaveErr, rawrecordSaveRes) {
						// Handle Rawrecord save error
						if (rawrecordSaveErr) done(rawrecordSaveErr);

						// Get a list of Rawrecords
						agent.get('/rawrecords')
							.end(function(rawrecordsGetErr, rawrecordsGetRes) {
								// Handle Rawrecord save error
								if (rawrecordsGetErr) done(rawrecordsGetErr);

								// Get Rawrecords list
								var rawrecords = rawrecordsGetRes.body;

								// Set assertions
								(rawrecords[0].user._id).should.equal(userId);
								(rawrecords[0].name).should.match('Rawrecord Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Rawrecord instance if not logged in', function(done) {
		agent.post('/rawrecords')
			.send(rawrecord)
			.expect(401)
			.end(function(rawrecordSaveErr, rawrecordSaveRes) {
				// Call the assertion callback
				done(rawrecordSaveErr);
			});
	});

	it('should not be able to save Rawrecord instance if no name is provided', function(done) {
		// Invalidate name field
		rawrecord.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecord
				agent.post('/rawrecords')
					.send(rawrecord)
					.expect(400)
					.end(function(rawrecordSaveErr, rawrecordSaveRes) {
						// Set message assertion
						(rawrecordSaveRes.body.message).should.match('Please fill Rawrecord name');
						
						// Handle Rawrecord save error
						done(rawrecordSaveErr);
					});
			});
	});

	it('should be able to update Rawrecord instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecord
				agent.post('/rawrecords')
					.send(rawrecord)
					.expect(200)
					.end(function(rawrecordSaveErr, rawrecordSaveRes) {
						// Handle Rawrecord save error
						if (rawrecordSaveErr) done(rawrecordSaveErr);

						// Update Rawrecord name
						rawrecord.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Rawrecord
						agent.put('/rawrecords/' + rawrecordSaveRes.body._id)
							.send(rawrecord)
							.expect(200)
							.end(function(rawrecordUpdateErr, rawrecordUpdateRes) {
								// Handle Rawrecord update error
								if (rawrecordUpdateErr) done(rawrecordUpdateErr);

								// Set assertions
								(rawrecordUpdateRes.body._id).should.equal(rawrecordSaveRes.body._id);
								(rawrecordUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Rawrecords if not signed in', function(done) {
		// Create new Rawrecord model instance
		var rawrecordObj = new Rawrecord(rawrecord);

		// Save the Rawrecord
		rawrecordObj.save(function() {
			// Request Rawrecords
			request(app).get('/rawrecords')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Rawrecord if not signed in', function(done) {
		// Create new Rawrecord model instance
		var rawrecordObj = new Rawrecord(rawrecord);

		// Save the Rawrecord
		rawrecordObj.save(function() {
			request(app).get('/rawrecords/' + rawrecordObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rawrecord.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Rawrecord instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecord
				agent.post('/rawrecords')
					.send(rawrecord)
					.expect(200)
					.end(function(rawrecordSaveErr, rawrecordSaveRes) {
						// Handle Rawrecord save error
						if (rawrecordSaveErr) done(rawrecordSaveErr);

						// Delete existing Rawrecord
						agent.delete('/rawrecords/' + rawrecordSaveRes.body._id)
							.send(rawrecord)
							.expect(200)
							.end(function(rawrecordDeleteErr, rawrecordDeleteRes) {
								// Handle Rawrecord error error
								if (rawrecordDeleteErr) done(rawrecordDeleteErr);

								// Set assertions
								(rawrecordDeleteRes.body._id).should.equal(rawrecordSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Rawrecord instance if not signed in', function(done) {
		// Set Rawrecord user 
		rawrecord.user = user;

		// Create new Rawrecord model instance
		var rawrecordObj = new Rawrecord(rawrecord);

		// Save the Rawrecord
		rawrecordObj.save(function() {
			// Try deleting Rawrecord
			request(app).delete('/rawrecords/' + rawrecordObj._id)
			.expect(401)
			.end(function(rawrecordDeleteErr, rawrecordDeleteRes) {
				// Set message assertion
				(rawrecordDeleteRes.body.message).should.match('User is not logged in');

				// Handle Rawrecord error error
				done(rawrecordDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Rawrecord.remove().exec();
		done();
	});
});
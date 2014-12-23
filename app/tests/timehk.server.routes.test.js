'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Timehk = mongoose.model('Timehk'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, timehk;

/**
 * Timehk routes tests
 */
describe('Timehk CRUD tests', function() {
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

		// Save a user to the test db and create new Timehk
		user.save(function() {
			timehk = {
				name: 'Timehk Name'
			};

			done();
		});
	});

	it('should be able to save Timehk instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Timehk
				agent.post('/timehks')
					.send(timehk)
					.expect(200)
					.end(function(timehkSaveErr, timehkSaveRes) {
						// Handle Timehk save error
						if (timehkSaveErr) done(timehkSaveErr);

						// Get a list of Timehks
						agent.get('/timehks')
							.end(function(timehksGetErr, timehksGetRes) {
								// Handle Timehk save error
								if (timehksGetErr) done(timehksGetErr);

								// Get Timehks list
								var timehks = timehksGetRes.body;

								// Set assertions
								(timehks[0].user._id).should.equal(userId);
								(timehks[0].name).should.match('Timehk Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Timehk instance if not logged in', function(done) {
		agent.post('/timehks')
			.send(timehk)
			.expect(401)
			.end(function(timehkSaveErr, timehkSaveRes) {
				// Call the assertion callback
				done(timehkSaveErr);
			});
	});

	it('should not be able to save Timehk instance if no name is provided', function(done) {
		// Invalidate name field
		timehk.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Timehk
				agent.post('/timehks')
					.send(timehk)
					.expect(400)
					.end(function(timehkSaveErr, timehkSaveRes) {
						// Set message assertion
						(timehkSaveRes.body.message).should.match('Please fill Timehk name');
						
						// Handle Timehk save error
						done(timehkSaveErr);
					});
			});
	});

	it('should be able to update Timehk instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Timehk
				agent.post('/timehks')
					.send(timehk)
					.expect(200)
					.end(function(timehkSaveErr, timehkSaveRes) {
						// Handle Timehk save error
						if (timehkSaveErr) done(timehkSaveErr);

						// Update Timehk name
						timehk.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Timehk
						agent.put('/timehks/' + timehkSaveRes.body._id)
							.send(timehk)
							.expect(200)
							.end(function(timehkUpdateErr, timehkUpdateRes) {
								// Handle Timehk update error
								if (timehkUpdateErr) done(timehkUpdateErr);

								// Set assertions
								(timehkUpdateRes.body._id).should.equal(timehkSaveRes.body._id);
								(timehkUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Timehks if not signed in', function(done) {
		// Create new Timehk model instance
		var timehkObj = new Timehk(timehk);

		// Save the Timehk
		timehkObj.save(function() {
			// Request Timehks
			request(app).get('/timehks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Timehk if not signed in', function(done) {
		// Create new Timehk model instance
		var timehkObj = new Timehk(timehk);

		// Save the Timehk
		timehkObj.save(function() {
			request(app).get('/timehks/' + timehkObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', timehk.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Timehk instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Timehk
				agent.post('/timehks')
					.send(timehk)
					.expect(200)
					.end(function(timehkSaveErr, timehkSaveRes) {
						// Handle Timehk save error
						if (timehkSaveErr) done(timehkSaveErr);

						// Delete existing Timehk
						agent.delete('/timehks/' + timehkSaveRes.body._id)
							.send(timehk)
							.expect(200)
							.end(function(timehkDeleteErr, timehkDeleteRes) {
								// Handle Timehk error error
								if (timehkDeleteErr) done(timehkDeleteErr);

								// Set assertions
								(timehkDeleteRes.body._id).should.equal(timehkSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Timehk instance if not signed in', function(done) {
		// Set Timehk user 
		timehk.user = user;

		// Create new Timehk model instance
		var timehkObj = new Timehk(timehk);

		// Save the Timehk
		timehkObj.save(function() {
			// Try deleting Timehk
			request(app).delete('/timehks/' + timehkObj._id)
			.expect(401)
			.end(function(timehkDeleteErr, timehkDeleteRes) {
				// Set message assertion
				(timehkDeleteRes.body.message).should.match('User is not logged in');

				// Handle Timehk error error
				done(timehkDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Timehk.remove().exec();
		done();
	});
});
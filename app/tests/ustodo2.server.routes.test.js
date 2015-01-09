'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ustodo2 = mongoose.model('Ustodo2'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ustodo2;

/**
 * Ustodo2 routes tests
 */
describe('Ustodo2 CRUD tests', function() {
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

		// Save a user to the test db and create new Ustodo2
		user.save(function() {
			ustodo2 = {
				name: 'Ustodo2 Name'
			};

			done();
		});
	});

	it('should be able to save Ustodo2 instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo2
				agent.post('/ustodo2s')
					.send(ustodo2)
					.expect(200)
					.end(function(ustodo2SaveErr, ustodo2SaveRes) {
						// Handle Ustodo2 save error
						if (ustodo2SaveErr) done(ustodo2SaveErr);

						// Get a list of Ustodo2s
						agent.get('/ustodo2s')
							.end(function(ustodo2sGetErr, ustodo2sGetRes) {
								// Handle Ustodo2 save error
								if (ustodo2sGetErr) done(ustodo2sGetErr);

								// Get Ustodo2s list
								var ustodo2s = ustodo2sGetRes.body;

								// Set assertions
								(ustodo2s[0].user._id).should.equal(userId);
								(ustodo2s[0].name).should.match('Ustodo2 Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ustodo2 instance if not logged in', function(done) {
		agent.post('/ustodo2s')
			.send(ustodo2)
			.expect(401)
			.end(function(ustodo2SaveErr, ustodo2SaveRes) {
				// Call the assertion callback
				done(ustodo2SaveErr);
			});
	});

	it('should not be able to save Ustodo2 instance if no name is provided', function(done) {
		// Invalidate name field
		ustodo2.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo2
				agent.post('/ustodo2s')
					.send(ustodo2)
					.expect(400)
					.end(function(ustodo2SaveErr, ustodo2SaveRes) {
						// Set message assertion
						(ustodo2SaveRes.body.message).should.match('Please fill Ustodo2 name');
						
						// Handle Ustodo2 save error
						done(ustodo2SaveErr);
					});
			});
	});

	it('should be able to update Ustodo2 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo2
				agent.post('/ustodo2s')
					.send(ustodo2)
					.expect(200)
					.end(function(ustodo2SaveErr, ustodo2SaveRes) {
						// Handle Ustodo2 save error
						if (ustodo2SaveErr) done(ustodo2SaveErr);

						// Update Ustodo2 name
						ustodo2.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ustodo2
						agent.put('/ustodo2s/' + ustodo2SaveRes.body._id)
							.send(ustodo2)
							.expect(200)
							.end(function(ustodo2UpdateErr, ustodo2UpdateRes) {
								// Handle Ustodo2 update error
								if (ustodo2UpdateErr) done(ustodo2UpdateErr);

								// Set assertions
								(ustodo2UpdateRes.body._id).should.equal(ustodo2SaveRes.body._id);
								(ustodo2UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ustodo2s if not signed in', function(done) {
		// Create new Ustodo2 model instance
		var ustodo2Obj = new Ustodo2(ustodo2);

		// Save the Ustodo2
		ustodo2Obj.save(function() {
			// Request Ustodo2s
			request(app).get('/ustodo2s')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ustodo2 if not signed in', function(done) {
		// Create new Ustodo2 model instance
		var ustodo2Obj = new Ustodo2(ustodo2);

		// Save the Ustodo2
		ustodo2Obj.save(function() {
			request(app).get('/ustodo2s/' + ustodo2Obj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ustodo2.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ustodo2 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo2
				agent.post('/ustodo2s')
					.send(ustodo2)
					.expect(200)
					.end(function(ustodo2SaveErr, ustodo2SaveRes) {
						// Handle Ustodo2 save error
						if (ustodo2SaveErr) done(ustodo2SaveErr);

						// Delete existing Ustodo2
						agent.delete('/ustodo2s/' + ustodo2SaveRes.body._id)
							.send(ustodo2)
							.expect(200)
							.end(function(ustodo2DeleteErr, ustodo2DeleteRes) {
								// Handle Ustodo2 error error
								if (ustodo2DeleteErr) done(ustodo2DeleteErr);

								// Set assertions
								(ustodo2DeleteRes.body._id).should.equal(ustodo2SaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ustodo2 instance if not signed in', function(done) {
		// Set Ustodo2 user 
		ustodo2.user = user;

		// Create new Ustodo2 model instance
		var ustodo2Obj = new Ustodo2(ustodo2);

		// Save the Ustodo2
		ustodo2Obj.save(function() {
			// Try deleting Ustodo2
			request(app).delete('/ustodo2s/' + ustodo2Obj._id)
			.expect(401)
			.end(function(ustodo2DeleteErr, ustodo2DeleteRes) {
				// Set message assertion
				(ustodo2DeleteRes.body.message).should.match('User is not logged in');

				// Handle Ustodo2 error error
				done(ustodo2DeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ustodo2.remove().exec();
		done();
	});
});
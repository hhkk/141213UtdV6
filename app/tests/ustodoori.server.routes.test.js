'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ustodoori = mongoose.model('Ustodoori'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ustodoori;

/**
 * Ustodoori routes tests
 */
describe('Ustodoori CRUD tests', function() {
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

		// Save a user to the test db and create new Ustodoori
		user.save(function() {
			ustodoori = {
				name: 'Ustodoori Name'
			};

			done();
		});
	});

	it('should be able to save Ustodoori instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodoori
				agent.post('/ustodooris')
					.send(ustodoori)
					.expect(200)
					.end(function(ustodooriSaveErr, ustodooriSaveRes) {
						// Handle Ustodoori save error
						if (ustodooriSaveErr) done(ustodooriSaveErr);

						// Get a list of Ustodooris
						agent.get('/ustodooris')
							.end(function(ustodoorisGetErr, ustodoorisGetRes) {
								// Handle Ustodoori save error
								if (ustodoorisGetErr) done(ustodoorisGetErr);

								// Get Ustodooris list
								var ustodooris = ustodoorisGetRes.body;

								// Set assertions
								(ustodooris[0].user._id).should.equal(userId);
								(ustodooris[0].name).should.match('Ustodoori Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ustodoori instance if not logged in', function(done) {
		agent.post('/ustodooris')
			.send(ustodoori)
			.expect(401)
			.end(function(ustodooriSaveErr, ustodooriSaveRes) {
				// Call the assertion callback
				done(ustodooriSaveErr);
			});
	});

	it('should not be able to save Ustodoori instance if no name is provided', function(done) {
		// Invalidate name field
		ustodoori.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodoori
				agent.post('/ustodooris')
					.send(ustodoori)
					.expect(400)
					.end(function(ustodooriSaveErr, ustodooriSaveRes) {
						// Set message assertion
						(ustodooriSaveRes.body.message).should.match('Please fill Ustodoori name');
						
						// Handle Ustodoori save error
						done(ustodooriSaveErr);
					});
			});
	});

	it('should be able to update Ustodoori instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodoori
				agent.post('/ustodooris')
					.send(ustodoori)
					.expect(200)
					.end(function(ustodooriSaveErr, ustodooriSaveRes) {
						// Handle Ustodoori save error
						if (ustodooriSaveErr) done(ustodooriSaveErr);

						// Update Ustodoori name
						ustodoori.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ustodoori
						agent.put('/ustodooris/' + ustodooriSaveRes.body._id)
							.send(ustodoori)
							.expect(200)
							.end(function(ustodooriUpdateErr, ustodooriUpdateRes) {
								// Handle Ustodoori update error
								if (ustodooriUpdateErr) done(ustodooriUpdateErr);

								// Set assertions
								(ustodooriUpdateRes.body._id).should.equal(ustodooriSaveRes.body._id);
								(ustodooriUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ustodooris if not signed in', function(done) {
		// Create new Ustodoori model instance
		var ustodooriObj = new Ustodoori(ustodoori);

		// Save the Ustodoori
		ustodooriObj.save(function() {
			// Request Ustodooris
			request(app).get('/ustodooris')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ustodoori if not signed in', function(done) {
		// Create new Ustodoori model instance
		var ustodooriObj = new Ustodoori(ustodoori);

		// Save the Ustodoori
		ustodooriObj.save(function() {
			request(app).get('/ustodooris/' + ustodooriObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ustodoori.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ustodoori instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodoori
				agent.post('/ustodooris')
					.send(ustodoori)
					.expect(200)
					.end(function(ustodooriSaveErr, ustodooriSaveRes) {
						// Handle Ustodoori save error
						if (ustodooriSaveErr) done(ustodooriSaveErr);

						// Delete existing Ustodoori
						agent.delete('/ustodooris/' + ustodooriSaveRes.body._id)
							.send(ustodoori)
							.expect(200)
							.end(function(ustodooriDeleteErr, ustodooriDeleteRes) {
								// Handle Ustodoori error error
								if (ustodooriDeleteErr) done(ustodooriDeleteErr);

								// Set assertions
								(ustodooriDeleteRes.body._id).should.equal(ustodooriSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ustodoori instance if not signed in', function(done) {
		// Set Ustodoori user 
		ustodoori.user = user;

		// Create new Ustodoori model instance
		var ustodooriObj = new Ustodoori(ustodoori);

		// Save the Ustodoori
		ustodooriObj.save(function() {
			// Try deleting Ustodoori
			request(app).delete('/ustodooris/' + ustodooriObj._id)
			.expect(401)
			.end(function(ustodooriDeleteErr, ustodooriDeleteRes) {
				// Set message assertion
				(ustodooriDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ustodoori error error
				done(ustodooriDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ustodoori.remove().exec();
		done();
	});
});
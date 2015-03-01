'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Command = mongoose.model('Command'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, command;

/**
 * Command routes tests
 */
describe('Command CRUD tests', function() {
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

		// Save a user to the test db and create new Command
		user.save(function() {
			command = {
				name: 'Command Name'
			};

			done();
		});
	});

	it('should be able to save Command instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Command
				agent.post('/commands')
					.send(command)
					.expect(200)
					.end(function(commandSaveErr, commandSaveRes) {
						// Handle Command save error
						if (commandSaveErr) done(commandSaveErr);

						// Get a list of Commands
						agent.get('/commands')
							.end(function(commandsGetErr, commandsGetRes) {
								// Handle Command save error
								if (commandsGetErr) done(commandsGetErr);

								// Get Commands list
								var commands = commandsGetRes.body;

								// Set assertions
								(commands[0].user._id).should.equal(userId);
								(commands[0].name).should.match('Command Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Command instance if not logged in', function(done) {
		agent.post('/commands')
			.send(command)
			.expect(401)
			.end(function(commandSaveErr, commandSaveRes) {
				// Call the assertion callback
				done(commandSaveErr);
			});
	});

	it('should not be able to save Command instance if no name is provided', function(done) {
		// Invalidate name field
		command.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Command
				agent.post('/commands')
					.send(command)
					.expect(400)
					.end(function(commandSaveErr, commandSaveRes) {
						// Set message assertion
						(commandSaveRes.body.message).should.match('Please fill Command name');
						
						// Handle Command save error
						done(commandSaveErr);
					});
			});
	});

	it('should be able to update Command instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Command
				agent.post('/commands')
					.send(command)
					.expect(200)
					.end(function(commandSaveErr, commandSaveRes) {
						// Handle Command save error
						if (commandSaveErr) done(commandSaveErr);

						// Update Command name
						command.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Command
						agent.put('/commands/' + commandSaveRes.body._id)
							.send(command)
							.expect(200)
							.end(function(commandUpdateErr, commandUpdateRes) {
								// Handle Command update error
								if (commandUpdateErr) done(commandUpdateErr);

								// Set assertions
								(commandUpdateRes.body._id).should.equal(commandSaveRes.body._id);
								(commandUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Commands if not signed in', function(done) {
		// Create new Command model instance
		var commandObj = new Command(command);

		// Save the Command
		commandObj.save(function() {
			// Request Commands
			request(app).get('/commands')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Command if not signed in', function(done) {
		// Create new Command model instance
		var commandObj = new Command(command);

		// Save the Command
		commandObj.save(function() {
			request(app).get('/commands/' + commandObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', command.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Command instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Command
				agent.post('/commands')
					.send(command)
					.expect(200)
					.end(function(commandSaveErr, commandSaveRes) {
						// Handle Command save error
						if (commandSaveErr) done(commandSaveErr);

						// Delete existing Command
						agent.delete('/commands/' + commandSaveRes.body._id)
							.send(command)
							.expect(200)
							.end(function(commandDeleteErr, commandDeleteRes) {
								// Handle Command error error
								if (commandDeleteErr) done(commandDeleteErr);

								// Set assertions
								(commandDeleteRes.body._id).should.equal(commandSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Command instance if not signed in', function(done) {
		// Set Command user 
		command.user = user;

		// Create new Command model instance
		var commandObj = new Command(command);

		// Save the Command
		commandObj.save(function() {
			// Try deleting Command
			request(app).delete('/commands/' + commandObj._id)
			.expect(401)
			.end(function(commandDeleteErr, commandDeleteRes) {
				// Set message assertion
				(commandDeleteRes.body.message).should.match('User is not logged in');

				// Handle Command error error
				done(commandDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Command.remove().exec();
		done();
	});
});
'use strict';

(function() {
	// Commands Controller Spec
	describe('Commands Controller Tests', function() {
		// Initialize global variables
		var CommandsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Commands controller.
			CommandsController = $controller('CommandsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Command object fetched from XHR', inject(function(Commands) {
			// Create sample Command using the Commands service
			var sampleCommand = new Commands({
				name: 'New Command'
			});

			// Create a sample Commands array that includes the new Command
			var sampleCommands = [sampleCommand];

			// Set GET response
			$httpBackend.expectGET('commands').respond(sampleCommands);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.commands).toEqualData(sampleCommands);
		}));

		it('$scope.findOne() should create an array with one Command object fetched from XHR using a commandId URL parameter', inject(function(Commands) {
			// Define a sample Command object
			var sampleCommand = new Commands({
				name: 'New Command'
			});

			// Set the URL parameter
			$stateParams.commandId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/commands\/([0-9a-fA-F]{24})$/).respond(sampleCommand);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.command).toEqualData(sampleCommand);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Commands) {
			// Create a sample Command object
			var sampleCommandPostData = new Commands({
				name: 'New Command'
			});

			// Create a sample Command response
			var sampleCommandResponse = new Commands({
				_id: '525cf20451979dea2c000001',
				name: 'New Command'
			});

			// Fixture mock form input values
			scope.name = 'New Command';

			// Set POST response
			$httpBackend.expectPOST('commands', sampleCommandPostData).respond(sampleCommandResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Command was created
			expect($location.path()).toBe('/commands/' + sampleCommandResponse._id);
		}));

		it('$scope.update() should update a valid Command', inject(function(Commands) {
			// Define a sample Command put data
			var sampleCommandPutData = new Commands({
				_id: '525cf20451979dea2c000001',
				name: 'New Command'
			});

			// Mock Command in scope
			scope.command = sampleCommandPutData;

			// Set PUT response
			$httpBackend.expectPUT(/commands\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/commands/' + sampleCommandPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid commandId and remove the Command from the scope', inject(function(Commands) {
			// Create new Command object
			var sampleCommand = new Commands({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Commands array and include the Command
			scope.commands = [sampleCommand];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/commands\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCommand);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.commands.length).toBe(0);
		}));
	});
}());
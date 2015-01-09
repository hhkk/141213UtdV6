'use strict';

(function() {
	// Ustodo2s Controller Spec
	describe('Ustodo2s Controller Tests', function() {
		// Initialize global variables
		var Ustodo2sController,
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

			// Initialize the Ustodo2s controller.
			Ustodo2sController = $controller('Ustodo2sController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ustodo2 object fetched from XHR', inject(function(Ustodo2s) {
			// Create sample Ustodo2 using the Ustodo2s service
			var sampleUstodo2 = new Ustodo2s({
				name: 'New Ustodo2'
			});

			// Create a sample Ustodo2s array that includes the new Ustodo2
			var sampleUstodo2s = [sampleUstodo2];

			// Set GET response
			$httpBackend.expectGET('ustodo2s').respond(sampleUstodo2s);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodo2s).toEqualData(sampleUstodo2s);
		}));

		it('$scope.findOne() should create an array with one Ustodo2 object fetched from XHR using a ustodo2Id URL parameter', inject(function(Ustodo2s) {
			// Define a sample Ustodo2 object
			var sampleUstodo2 = new Ustodo2s({
				name: 'New Ustodo2'
			});

			// Set the URL parameter
			$stateParams.ustodo2Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ustodo2s\/([0-9a-fA-F]{24})$/).respond(sampleUstodo2);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodo2).toEqualData(sampleUstodo2);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ustodo2s) {
			// Create a sample Ustodo2 object
			var sampleUstodo2PostData = new Ustodo2s({
				name: 'New Ustodo2'
			});

			// Create a sample Ustodo2 response
			var sampleUstodo2Response = new Ustodo2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodo2'
			});

			// Fixture mock form input values
			scope.name = 'New Ustodo2';

			// Set POST response
			$httpBackend.expectPOST('ustodo2s', sampleUstodo2PostData).respond(sampleUstodo2Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ustodo2 was created
			expect($location.path()).toBe('/ustodo2s/' + sampleUstodo2Response._id);
		}));

		it('$scope.update() should update a valid Ustodo2', inject(function(Ustodo2s) {
			// Define a sample Ustodo2 put data
			var sampleUstodo2PutData = new Ustodo2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodo2'
			});

			// Mock Ustodo2 in scope
			scope.ustodo2 = sampleUstodo2PutData;

			// Set PUT response
			$httpBackend.expectPUT(/ustodo2s\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ustodo2s/' + sampleUstodo2PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ustodo2Id and remove the Ustodo2 from the scope', inject(function(Ustodo2s) {
			// Create new Ustodo2 object
			var sampleUstodo2 = new Ustodo2s({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ustodo2s array and include the Ustodo2
			scope.ustodo2s = [sampleUstodo2];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ustodo2s\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUstodo2);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ustodo2s.length).toBe(0);
		}));
	});
}());
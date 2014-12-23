'use strict';

(function() {
	// Timehks Controller Spec
	describe('Timehks Controller Tests', function() {
		// Initialize global variables
		var TimehksController,
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

			// Initialize the Timehks controller.
			TimehksController = $controller('TimehksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Timehk object fetched from XHR', inject(function(Timehks) {
			// Create sample Timehk using the Timehks service
			var sampleTimehk = new Timehks({
				name: 'New Timehk'
			});

			// Create a sample Timehks array that includes the new Timehk
			var sampleTimehks = [sampleTimehk];

			// Set GET response
			$httpBackend.expectGET('timehks').respond(sampleTimehks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timehks).toEqualData(sampleTimehks);
		}));

		it('$scope.findOne() should create an array with one Timehk object fetched from XHR using a timehkId URL parameter', inject(function(Timehks) {
			// Define a sample Timehk object
			var sampleTimehk = new Timehks({
				name: 'New Timehk'
			});

			// Set the URL parameter
			$stateParams.timehkId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/timehks\/([0-9a-fA-F]{24})$/).respond(sampleTimehk);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.timehk).toEqualData(sampleTimehk);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Timehks) {
			// Create a sample Timehk object
			var sampleTimehkPostData = new Timehks({
				name: 'New Timehk'
			});

			// Create a sample Timehk response
			var sampleTimehkResponse = new Timehks({
				_id: '525cf20451979dea2c000001',
				name: 'New Timehk'
			});

			// Fixture mock form input values
			scope.name = 'New Timehk';

			// Set POST response
			$httpBackend.expectPOST('timehks', sampleTimehkPostData).respond(sampleTimehkResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Timehk was created
			expect($location.path()).toBe('/timehks/' + sampleTimehkResponse._id);
		}));

		it('$scope.update() should update a valid Timehk', inject(function(Timehks) {
			// Define a sample Timehk put data
			var sampleTimehkPutData = new Timehks({
				_id: '525cf20451979dea2c000001',
				name: 'New Timehk'
			});

			// Mock Timehk in scope
			scope.timehk = sampleTimehkPutData;

			// Set PUT response
			$httpBackend.expectPUT(/timehks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/timehks/' + sampleTimehkPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid timehkId and remove the Timehk from the scope', inject(function(Timehks) {
			// Create new Timehk object
			var sampleTimehk = new Timehks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Timehks array and include the Timehk
			scope.timehks = [sampleTimehk];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/timehks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTimehk);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.timehks.length).toBe(0);
		}));
	});
}());
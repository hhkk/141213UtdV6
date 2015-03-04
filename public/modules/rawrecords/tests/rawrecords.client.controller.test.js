'use strict';

(function() {
	// Rawrecords Controller Spec
	describe('Rawrecords Controller Tests', function() {
		// Initialize global variables
		var RawrecordsController,
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

			// Initialize the Rawrecords controller.
			RawrecordsController = $controller('RawrecordsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rawrecord object fetched from XHR', inject(function(Rawrecords) {
			// Create sample Rawrecord using the Rawrecords service
			var sampleRawrecord = new Rawrecords({
				name: 'New Rawrecord'
			});

			// Create a sample Rawrecords array that includes the new Rawrecord
			var sampleRawrecords = [sampleRawrecord];

			// Set GET response
			$httpBackend.expectGET('rawrecords').respond(sampleRawrecords);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rawrecords).toEqualData(sampleRawrecords);
		}));

		it('$scope.findOne() should create an array with one Rawrecord object fetched from XHR using a rawrecordId URL parameter', inject(function(Rawrecords) {
			// Define a sample Rawrecord object
			var sampleRawrecord = new Rawrecords({
				name: 'New Rawrecord'
			});

			// Set the URL parameter
			$stateParams.rawrecordId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rawrecords\/([0-9a-fA-F]{24})$/).respond(sampleRawrecord);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rawrecord).toEqualData(sampleRawrecord);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rawrecords) {
			// Create a sample Rawrecord object
			var sampleRawrecordPostData = new Rawrecords({
				name: 'New Rawrecord'
			});

			// Create a sample Rawrecord response
			var sampleRawrecordResponse = new Rawrecords({
				_id: '525cf20451979dea2c000001',
				name: 'New Rawrecord'
			});

			// Fixture mock form input values
			scope.name = 'New Rawrecord';

			// Set POST response
			$httpBackend.expectPOST('rawrecords', sampleRawrecordPostData).respond(sampleRawrecordResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rawrecord was created
			expect($location.path()).toBe('/rawrecords/' + sampleRawrecordResponse._id);
		}));

		it('$scope.update() should update a valid Rawrecord', inject(function(Rawrecords) {
			// Define a sample Rawrecord put data
			var sampleRawrecordPutData = new Rawrecords({
				_id: '525cf20451979dea2c000001',
				name: 'New Rawrecord'
			});

			// Mock Rawrecord in scope
			scope.rawrecord = sampleRawrecordPutData;

			// Set PUT response
			$httpBackend.expectPUT(/rawrecords\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rawrecords/' + sampleRawrecordPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rawrecordId and remove the Rawrecord from the scope', inject(function(Rawrecords) {
			// Create new Rawrecord object
			var sampleRawrecord = new Rawrecords({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rawrecords array and include the Rawrecord
			scope.rawrecords = [sampleRawrecord];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rawrecords\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRawrecord);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rawrecords.length).toBe(0);
		}));
	});
}());
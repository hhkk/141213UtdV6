'use strict';

(function() {
	// Ustodooris Controller Spec
	describe('Ustodooris Controller Tests', function() {
		// Initialize global variables
		var UstodoorisController,
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

			// Initialize the Ustodooris controller.
			UstodoorisController = $controller('UstodoorisController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ustodoori object fetched from XHR', inject(function(Ustodooris) {
			// Create sample Ustodoori using the Ustodooris service
			var sampleUstodoori = new Ustodooris({
				name: 'New Ustodoori'
			});

			// Create a sample Ustodooris array that includes the new Ustodoori
			var sampleUstodooris = [sampleUstodoori];

			// Set GET response
			$httpBackend.expectGET('ustodooris').respond(sampleUstodooris);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodooris).toEqualData(sampleUstodooris);
		}));

		it('$scope.findOne() should create an array with one Ustodoori object fetched from XHR using a ustodooriId URL parameter', inject(function(Ustodooris) {
			// Define a sample Ustodoori object
			var sampleUstodoori = new Ustodooris({
				name: 'New Ustodoori'
			});

			// Set the URL parameter
			$stateParams.ustodooriId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ustodooris\/([0-9a-fA-F]{24})$/).respond(sampleUstodoori);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodoori).toEqualData(sampleUstodoori);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ustodooris) {
			// Create a sample Ustodoori object
			var sampleUstodooriPostData = new Ustodooris({
				name: 'New Ustodoori'
			});

			// Create a sample Ustodoori response
			var sampleUstodooriResponse = new Ustodooris({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodoori'
			});

			// Fixture mock form input values
			scope.name = 'New Ustodoori';

			// Set POST response
			$httpBackend.expectPOST('ustodooris', sampleUstodooriPostData).respond(sampleUstodooriResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ustodoori was created
			expect($location.path()).toBe('/ustodooris/' + sampleUstodooriResponse._id);
		}));

		it('$scope.update() should update a valid Ustodoori', inject(function(Ustodooris) {
			// Define a sample Ustodoori put data
			var sampleUstodooriPutData = new Ustodooris({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodoori'
			});

			// Mock Ustodoori in scope
			scope.ustodoori = sampleUstodooriPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ustodooris\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ustodooris/' + sampleUstodooriPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ustodooriId and remove the Ustodoori from the scope', inject(function(Ustodooris) {
			// Create new Ustodoori object
			var sampleUstodoori = new Ustodooris({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ustodooris array and include the Ustodoori
			scope.ustodooris = [sampleUstodoori];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ustodooris\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUstodoori);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ustodooris.length).toBe(0);
		}));
	});
}());
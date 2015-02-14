'use strict';

//var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');

var resolveSearchStringBetweenUrlAndInputBox = function(location_search_q, this_hbkkBindSearch)
{
    //alert ('in resolveSearchStringBetweenUrlAndInputBox  SEARCH $location.search().q:' + location_search_q +
    //', this_hbkkBindSearch:' + this_hbkkBindSearch);

    //alert ('stateParams_searchstring_url:' + stateParams_searchstring_url);
    //alert ('hbkkBindSearch:' + hbkkBindSearch);


//	sdfsdf

    var searchStringUiBoxOverridesUrl = this_hbkkBindSearch;
    if (searchStringUiBoxOverridesUrl === undefined || !searchStringUiBoxOverridesUrl) {
        searchStringUiBoxOverridesUrl = location_search_q;
    }
    if (searchStringUiBoxOverridesUrl === undefined || !searchStringUiBoxOverridesUrl) {
        searchStringUiBoxOverridesUrl = '';
    }

    console.log ('searchStringUiBoxOverridesUrl:'+searchStringUiBoxOverridesUrl);
    return searchStringUiBoxOverridesUrl;
};



// Ustodos controller
var angularModule = angular.module('ustodos');


//angularModule.directive('ignoreClick',  function() {
//
//	return {
//		restrict: 'A',
//		link: function(scope, element) {
//			element.bind('click', function(event) {
//				event.preventDefault();
//			});
//		}
//	};g
//});









angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'Authentication', 'Ustodos',
    function($scope, $stateParams, $location, $rootScope, Authentication, Ustodos) {
        console.log ('0 in ustodos.client.controller init');
        $scope.authentication = Authentication;

        //alert ('angularModule.controller(UstodosController)');
        // Create new Ustodo
        $scope.create = function() {
            console.log ('1 in ustodos.client.controller CREATE');
            // Create new Ustodo object
            //getProperties('props this:', this);
            //getProperties('props Ustodos:', Ustodos);
            var ustodo = new Ustodos ({
                text: this.text// hbkk mystery
            });
            //getProperties('props ustodo:', ustodo);

            // Redirect after save
            ustodo.$save(function(response) {
                $location.path('ustodos/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Ustodo
        $scope.remove = function(ustodo) {
            console.log ('2 in ustodos.client.controller REMOVE');
            if ( ustodo ) {
                ustodo.$remove();

                for (var i in $scope.ustodos) {
                    if ($scope.ustodos [i] === ustodo) {
                        $scope.ustodos.splice(i, 1);
                    }
                }
            } else {
                $scope.ustodo.$remove(function() {
                    $location.path('ustodos');
                });
            }
        };

        // Update existing Ustodo
        $scope.update = function() {
            console.log ('3 in ustodos.client.controller UPDATE');
            var ustodo = $scope.ustodo;

            ustodo.$update(function() {
                $location.path('ustodos/' + ustodo._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Ustodos
        $scope.find = function() {
            console.log ('4 in ustodos.client.controller FIND');
            //getProperties('props Ustodos:', Ustodos);

            //$scope.ustodos = Ustodos.query(); //original
            //returns a single not array, causing a fail $scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
            // seems to work but returns all? $scope.ustodos = Ustodos.query({name: 'ggggg'});
            //$scope.ustodos = Ustodos.query({name: 'ggggg'}); // Works!
            $scope.ustodos = Ustodos.query({text: ''});
            //$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
            //$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
            //$scope.ustodos = Ustodos.query({ustodoId: '54929d5d1d3df384165f4fa2'});
            //console.log ('in ustodos.client.controller FIND2 $scope.ustodos.length:' + $scope.ustodos.length);
            console.log ('in ustodos.client.controller FIND2');

        };

        // Find existing Ustodo
        $scope.findOne = function() {
            console.log ('5 in ustodos.client.controller FINDONE');
            $scope.ustodo = Ustodos.get({
                // ORIGINAL A/B SPLIT HBKK
                ustodoId: $stateParams.ustodoId    // original
                //ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
                //name: /road/
                //name: 'as'
            });
        };

        // https://www.google.com/search?q=mongo+search+angular+resource&oq=mongo+search+angular+resource&aqs=chrome..69i64j69i57.6281j0j7&sourceid=chrome&es_sm=93&ie=UTF-8
        // http://stackoverflow.com/questions/17552977/using-angularjss-resource-to-query-a-database
        // https://groups.google.com/forum/#!topic/angular/kcV0ZROeBRw

        // Search for new Ustodo (findlist)
        $scope.callCountSearch = 0;
        $scope.search = function() {

            //var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');

            //console.log ('%%%$$%%$$%%%%%%%%%%%%% UtilClassx.getClass(this):'+utd.Class.getClass(this));

            // 1107pm
            //console.log ('%%%$$%%$$%%%%%%%%%%%%% UtilClassx.utilGetClass(this):'+UtilClassx.utilGetClass(this));
            //console.log ('%%%$$%%$$%%%%%%%%%%%%% UtilClassx.utilGetClass(this):'+UtilClassx.utilGetClass(this));


            $scope.callCountSearch++;
            //alert ('in search $stateParams.q:'+$stateParams.q +
            //    ',\r\n$location.search().q:' + $location.search().q +
            //    ',\r\nthis.hbkkBindSearch:' + this.hbkkBindSearch
            //);

            //alert ('6 in ustodos.client.controller SEARCH this.hbkkBindSearch:' + this.hbkkBindSearch);
            //alert ('7 in ustodos.client.controller SEARCH $stateParams.q:' + $stateParams.q);
            //console.log ("$location.search().q:"+$location.search().q);

            this.hbkkBindSearch = resolveSearchStringBetweenUrlAndInputBox
            ($location.search().q, this.hbkkBindSearch);
            //alert ('in search $stateParams.q:'+$stateParams.q +
            //    ',\r\n$location.search().q:' + $location.search().q +
            //    ',\r\nthis.hbkkBindSearch:' + this.hbkkBindSearch
            //);

            //setTimeout(function(){alert('in ustodos')}, 2000);
            //setTimeout(function(){
            //var newpath = $location.path+'/'+this.hbkkBindSearch;
            //alert ('set this.hbkkBindSearch to:' + this.hbkkBindSearch +
            //      ',   $scope.callCountSearch:' + $scope.callCountSearch
            //);
            //}, 1000);


            window.document.title = this.hbkkBindSearch; // not jpro:
            $scope.hkhkhkbk = this.hbkkBindSearch;
            console.log ('hi0 hk $scope.hkhkhkbk:' + $scope.hkhkhkbk);
            //alert ('22a $location.absUrl():' + $location.absUrl());
            //var newUrl = $location.absUrl() + this.hbkkBindSearch;

            //setTimeout(function(){
            //console.log ('hi1 hk this.newUrl :' + newUrl );
            //console.log ('hi2 hk this.hbkkBindSearch:' + this.hbkkBindSearch);
            //console.log ('hi3 hk $scope.hkhkhkbk:' + $scope.hkhkhkbk);
            //$location.path('/#!/ddddddd');
            //$location.path(newUrl).replace();
            //$location.skipReload().path("/newpath").replace(); // https://github.com/angular-ui/ui-router/issues/427
            // https://github.com/angular-ui/ui-router/issues/427
            // https://www.google.com/search?num=100&es_sm=93&q=angular+%24location.path+replace&oq=angular+%24location.path+replace&gs_l=serp.3..0i22i30.1345.1711.0.2094.2.2.0.0.0.0.130.250.0j2.2.0.msedr...0...1c.1.61.serp..0.2.250.2tLK_AkIUUs
            // https://www.google.com/search?q=angular+change+url&oq=angular+change+url&aqs=chrome..69i64j0l5.704j0j9&sourceid=chrome&es_sm=93&ie=UTF-8
            // https://docs.angularjs.org/api/ng/service/$location


            //window.location.href = '/#!/ssss2' ;
            //window.location.href = '/#!/' + $scope.hkhkhkbk;
            //$scope.apply();
            //alert ('done newUrl:' + newUrl);
            //alert ('done');

            //}, 3000);

            try {

                //$locationProvider.html5Mode(true);
                //console.log ("$location.search().q:"+$location.search().q);
                //console.log ('$location.absUrl() 1:'+ $location.absUrl());
                //console.log ('$scope.hkhkhkbk 2:'+ $scope.hkhkhkbk);
                //window.location.href = '/#!/ustodos/findlist/' + $scope.hkhkhkbk;

                //window.location.href = '/#!/ustodos/findlist?q=' + $scope.hkhkhkbk;
                //window.location.href = '/#!/?q=' + $scope.hkhkhkbk;
                //window.location.href = '?q=' + $scope.hkhkhkbk;





                window.location.href = '/#!/?q=' + $scope.hkhkhkbk;
                //alert ('pre setting to'+$location.path())
                //$location.path($location.path() + 'ddd/#!/?q=' + $scope.hkhkhkbk);
                //$location.path('aaa');
                //alert ('done setting to'+$location.path())


                //window.location.href = '?q=' + $scope.hkhkhkbk;
                //$location.path('/ustodos/findlist/' + $scope.hkhkhkbk);
                //$location.path('/ustodos/findlist?q=' + $scope.hkhkhkbk);
                //console.log ('$location.absUrl() 3:'+ $location.absUrl());
            } catch (err) {
                alert ('err:'+ err);
            }

            //alert('look ma no hands $location.absUrl():' + $location.absUrl());


            //$location.path(newUrl);
            //$location.path('#/login');
            //window.location.href =
            //$scope.$apply( function(){$location.path(newUrl + '/somelocatin'); } );
            //window.location.href = window.location.href + '/xxx' + this.hbkkBindSearch;
            //alert ('22b this.hbkkBindSearch:' + this.hbkkBindSearch);
            //$location.path(newUrl);
            //window.location.href = newUrl +'hk';
            //alert ('22c $location.absUrl():' + $location.absUrl());
            //alert ('22d window.location.href:' + window.location.href);
            //alert ('22e this.hbkkBindSearch:' + this.hbkkBindSearch);
            //window.location.href = window.location.href + '/xxx' + this.hbkkBindSearch;
//			window.location.href = window.location.href + '/xxx';
            // https://docs.angularjs.org/guide/$location
            //alert('assigned this.hbkkBindSearch:'+ this.hbkkBindSearch);

            console.log('1assigned this.hbkkBindSearch:'+ this.hbkkBindSearch);
            //$location.path('/'+this.hbkkBindSearch)

            var ustodosQueryResult = Ustodos.query ({querystring: this.hbkkBindSearch});
            //console.log ('!@!@!@!@!@!@!!!@ utd[Class].getClass(ustodosQueryResult)]:'+utd[Class].getClass(ustodosQueryResult));
            console.log ('!@!@!@!@!@!@!!!@ utd[Class].getClass(ustodosQueryResult)]:'+UtilClass.getClass(ustodosQueryResult));
            //console.log ('============ in here'+ustodosQueryResult.length);

            console.log('2assigned this.hbkkBindSearch:'+ this.hbkkBindSearch);
            //this.countOfUstodos = ustodosQueryResult.length;
            this.ustodosQueryResult = ustodosQueryResult;
            console.log('this.countOfUstodos:'+ this.countOfUstodos);
            $scope.ustodos = ustodosQueryResult;

            //console.log (getClass('ssdfsdfdsf', this.hbkkBindSearch));
            //var patternhk = /$scope.hbkkBindSearch/;
            //	// ORIGINAL A/B SPLIT HBKK
            //	//ustodoSearchString: $stateParams.ustodoId
            //name: /a/
            //	//ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
            //	//name: /road/
            //	//name: 'as'

            //$scope.ustodos = Ustodos.query ({name: /141229/});
            //setTimeout(function(){console.log ('in ustodos.client.controller SEARCH2 $scope.ustodos.length:' + $scope.ustodos.length);}, 1000);
            //setTimeout(function(){alert ('in ustodos.client.controller SEARCH2 $scope.ustodos.length:' + $scope.ustodos.length);}, 1000);
            //$scope.$apply();

            //getProperties('props this:', this);
            //var ustodo = new Ustodos ({
            //	name: this.name,  // hbkk mystery
            //	hbkkBindSearch: this.hbkkBindSearch // hbkk mystery
            //});
            //getProperties('props ustodo:', ustodo);




            //// Redirect after save
            //ustodo.$save(function(response) {
            //	$location.path('ustodos/' + response._id);
            //
            //	// Clear form fields
            //	$scope.name = '';
            //}, function(errorResponse) {
            //	$scope.error = errorResponse.data.message;
            //});
        };

        // Search for one hbkk existing Ustodo by string
        $scope.searchOne = function() {
            console.log ('7 in ustodos.client.controller SEARCHONE');
            console.log ('7 hbkk getting ustodo searchOne :' + $stateParams.ustodoId);
            $scope.ustodo = Ustodos.get({
                // ORIGINAL A/B SPLIT HBKK
                ustodoSearchString: $stateParams.ustodoId
                //ustodoId: '54929d5d1d3df384165f4fa2'  // worked!!
                //name: /road/
                //name: 'as'
            });
        };

        $scope.search();

    }
]);







var getProperties = function (desc, obj)
{
    var j = 0 ;
    for(var propertyName in obj)
    {
        j++;
        var hasOwnPropIndicator = obj.hasOwnProperty(propertyName);
        console.log (j + '. props desc [' + desc + '] name ['+propertyName + '] value [' + obj[propertyName] + '] hasOwnPropIndicator [' + hasOwnPropIndicator + ']');
        // propertyName is what you want
        // you can get the value like this: myObject[propertyName]
    }
};














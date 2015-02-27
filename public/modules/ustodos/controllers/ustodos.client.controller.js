'use strict';


//var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
//var UtilClass = null;

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
//var angularModule = angular.module('ustodos').directive('onFinishRender', function ($timeout) {
//var angularModule = null;
//try {
//    angularModule = angular.module('ustodos', ['ngSanitize']);
//    console.log ('no errorhks!!!!!!!!!!!!!!!!!!!!');
//}catch (err) {
//    console.log ('errorhk!!!!!!!!!!!!!!!!!!!!');
//}


//var angularModule = angular.module('ustodos', ['ngSanitize']).directive('onFinishRender', function ($timeout) {
var angularModule = angular.module('ustodos', ['ngSanitize']).directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

//angularModule.run(function($rootScope, $compile, $rootElement) {
//    // We'll create a new scope to use as the context for the view.
//    //$scope = $rootScope.$new();
//    $scope.model = [{name: 'first'}, {name: 'second'}, {name: 'third'}];
//
//    // Calling `$compile(html)` returns a function that, when called with
//    // a context object, links the compiled HTML to the given context (e.g.
//    // binds scope-based expressions in the view to the passed in scope).
//    var html = "<div ng-repeat='m in model'>{{m.name}}</div>";
//    var linkingFunction = $compile(html);
//    var elem = linkingFunction($scope);
//
//    // You can then use the DOM element like normal.
//    $rootElement.append(elem);
//});



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



//myApp.controller('myCtrl', ['$scope', '$sce', function($scope, $sce) {
//    // ...
//    $scope.preview_data.preview.embed.htmlSafe =
//        $sce.trustAsHtml(preview_data.preview.embed.html);
//}
//myApp.controller('myCtrl', ['$scope', '$sce', function($scope, $sce)




// works angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'Authentication', 'Ustodos',
//    function($scope, $stateParams, $location, $rootScope, Authentication, Ustodos) {
// angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'ngSanitize', 'Authentication', 'Ustodos',
angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'Authentication', 'Ustodos',
    function($scope, $stateParams, $location, $rootScope, Authentication, Ustodos) {
//angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'ngSanitize', 'Authentication', 'Ustodos',
//    function($scope, $stateParams, $location, $rootScope, ngSanitize, Authentication, Ustodos) {
        //$rootScope', $compile, $rootElement,
        console.log ('000000000000000000000000000000 in ustodos.client.controller init');



        $scope.myFnOnKeyup = function() { // onkey
            alert ('hi2');
        }


        //
        //jQuery("#edit").on('keyup', function() {
        //    alert ('hi');
        //    //$this = $(this);
        //    //$this.scrollTop(0);
        //
        //    //var contentOuterHeight = 0;
        //    //var line_height = 18;
        //    //
        //    //$("#edit *").each(function() {
        //    //    $this = $(this);
        //    //    contentOuterHeight += $this.outerHeight(true);
        //    //});
        //    //
        //    //// if (contentOuterHeight == 0) {
        //    //// when there are no elements, just text, add one line-height
        //    //contentOuterHeight += line_height;
        //    //// }
        //    //$("#edit").height(contentOuterHeight);
        //    //
        //    //$("#edit_container").scrollTop(0);
        //});



        $scope.onKeyUp = function(index) {
            // alert ('onKeyUp index:' + index);
            $scope.count++;
            isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(false);
            //$scope.$apply()
        }

        $scope.savechanged = function() {
            console.log ('in c');
            $scope.count++;
            isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(true);
            //$scope.$apply()
        }

        $scope.name = 'Whirled';

        $scope.areThereChanges = false;
        //
        //$scope.$on('$destroy', function() {
        //    window.onbeforeunload = undefined;
        //});
        //$scope.$on('$locationChangeStart', function(event, next, current) {
        //    if(!confirm("Are you sure you want to leave this page?")) {
        //        event.preventDefault();
        //    }
        //});
        //
        //
        window.onbeforeunload = confirmExit;
        function confirmExit()
        {
            if (isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(false))
                return "Your changes will be lost.  Are you sure you want to exit this page?";
        };


        $scope.alignAnUstodoWithUstodoHtmlByIndex = function(i) {
            var myEl = angular.element( document.querySelector( '#ustodorow' + i ) );
            $scope.ustodos[i].html = myEl[0].innerHTML;
            $scope.ustodos[i].text = myEl[0].innerText;
            $scope.ustodos[i].html = myEl[0].innerHTML;

            $scope.ustodos[i].$update(function() {
                console.log ('SAVED !!! ' + $scope.ustodos[i].html);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log ('ERROR ON SAVE !!! '  + $scope.ustodos[i].html);
            });
        }

        $scope.saveUstodoGiven = function(ustodo, i) {



            var myEl = angular.element( document.querySelector( '#ustodorow' + i ) );
            ustodo.html = myEl[0].innerHTML;
            ustodo.text = myEl[0].innerText;
            ustodo.datelastmod= new Date();


            console.log ('SAVED1 !!! ustodo.html [' + ustodo.html);
            console.log ('SAVED2 !!! ustodo.text [' + ustodo.text);
            console.log ('SAVED3 !!! ustodo.json [' + ustodo.json);
            console.log ('SAVED4 !!! ustodo.jsonx [' + ustodo.jsonx);
            ustodo.$update(function() {
                console.log ('SAVED OK !!! ' );
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log ('ERROR ON SAVE !!! '  + ustodo.html);
            });
        }

        // has any row changed
        var callCnt_isDirty = 0;
        var time_last_save = 0;
        function isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(saveDiffs)
        {
            //if (saveDiffs)
            //alert(' start save ');
            callCnt_isDirty++;
            $scope.areThereChanges = false;
            for (var i = 0; i < $scope.ustodos.length; i++) {
                //for (var i = 0; i < 1; i++) {
                //console.log ('ustodo checking dirty and saving $scope.ustodos.length:'
                //    + $scope.ustodos.length);
                // angular getelement
                //console.log ('testing dirty on item [' + i + '] html [' + $scope.ustodos[i].html + ']');
                //console.log ('has inner html [' + myEl[0].innerHTML + ']');

                //"ustodorow1"
                var myEl = angular.element( document.querySelector( '#ustodorow' + i ) );
                console.log (i + '. @@@@@@@@@@@@@@@@ checking for change $scope.areThereChanges:' + $scope.areThereChanges);
                var anyChangeThisRow = false; // creates race condition for a microsecond, user could lose edit - real ulikely
                if (myEl[0] !== undefined) {
                    anyChangeThisRow = ($scope.ustodos[i].html !== myEl[0].innerHTML);
                    if (anyChangeThisRow) {
                        //console.log(i + '. A changed  [' + $scope.ustodos[i].html + ']');
                        //console.log(i + '. A vs inner [' + myEl[0].innerHTML + ']');
                        if (saveDiffs)
                        {
                            $scope.ustodos[i].html = myEl[0].innerHTML;
                            //console.log(i + '. B changed  [' + $scope.ustodos[i].html + ']');
                            //console.log(i + '. B vs inner [' + myEl[0].innerHTML + ']');
                            //console.log(i + '. B id changed  [' + $scope.ustodos[i]._id+ ']');

                            saveOneUstodo($scope.ustodos[i]);

                            // ends up in C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
                            // .exports.update
                        }
                        $scope.areThereChanges = true;
                        name = 'll'+ $scope.areThereChanges;
                        if (!saveDiffs) // for non save, only need one
                            break;
                    }
                    //alert ('loop done');
                }
                // diff here
            }
            console.log (callCnt_isDirty + ". exiting isDirty returning with $scope.areThereChanges:"+ $scope.areThereChanges);
        }


        $scope.deleteDbUstotoById = function(ustodo)
        {
            try {
                var savOid = ustodo._id;
                //console.log ('in deleteDbUstotoById '  + savOid);
                console.log ('in deleteDbUstotoById html:'  + ustodo.html);
                //alert ('in deleteDbUstotoById ' + savOid);
                var indexToDelete = -1;
                for (var i = 0; i < $scope.ustodos.length; i++) {
                    if ($scope.ustodos[i]._id === savOid)
                    {
                        console.log ('found one local array to delete, index:' + i)
                        $scope.ustodos.splice(indexToDelete, 1);
                        console.log ('done local array delete, index:' + i)
                    }
                }
                if (indexToDelete < 0)
                    console.log ('found NONE to delete!!!');


                ustodo.$delete(function() {
                    console.log ('$delete done !!! savOid:' + savOid);
                    //$scope.ustodos.splice(index, 1));
                    //alert ('delete done, now remove from array');
                    //array.;
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                    console.log ('ERROR ON SAVE !!! '  + $scope.ustodos[i].html);
                });
            } catch (err) {
                console.log ('err:' + err);
            }
        }



        //var hktimeout = function () {
        //    setTimeout(function () {
        //        //alert ('hi dad');
        //        //console.log ('checking dirty and saving');
        //        isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption();
        //        $scope.$apply();
        //        // Then recall the parent function to
        //        // create a recursive loop.
        //        hktimeout();
        //    }, 30000); // for non keyboa in ms so eg 5000 is 5 seconds
        //}
        //hktimeout();


        //setTimeout(function(){
        //    //var item = items.shift();
        //    //process.call(context, item);
        //
        //    //if (items.length > 0){
        //        alert ('hi mommy');
        //        setTimeout(arguments.callee, 100);
        //    //}
        //}, 100);



        //self.addEventListener('message', function(evt) {
        //    var gateway = new XMLHttpRequest();
        //    var intie = setInterval(function() {
        //        gateway.open("GET",evt.data.load_url,true);
        //        gateway.send();
        //        gateway.onreadystatechange = function() {
        //            if (gateway.readyState==4 && gateway.status==200)
        //                self.postMessage(gateway.responseText);
        //        }
        //    }, 300000); //every 5 minutes
        //}, false);




        $scope.UtilDate = UtilDate;

        //$scope.testfn = function(dateStrFromMongo)
        //{
        //    console.log('in testfn');
        //    return UtilDate.dateFromMongoString(dateStrFromMongo);
        //}

        $scope.authentication = Authentication;

        $scope.joes = ['a','b'];
        $scope.snippet = [];

        $scope.snippet[0] = 'Pretty text with some links:\n'+
        'http://angularjs.org/,\n'+
        'mailto:us@somewhere.org,\n'+
        'another@somewhere.org,\n'+
        'and one more: ftp://127.0.0.1/.';
        $scope.snippet[1] = 'Pretty2 text with some links:\n'+
        'Pretty2 text with some links:\n'+
        'http://angularjs2.org/,\n'+
        'mailto:us@somewhere2.org,\n'+
        'another@somewhere2.org,\n'+
        'and one more: ftp://127.0.0.1/.';

        $scope.caption = 'My Caption';
        //$scope.htmlhkhk = $compile('<div>{{caption}}</div>')($scope);

        $scope.model = [{name: 'first'}, {name: 'second'}, {name: 'third'}];

        // Calling `$compile(html)` returns a function that, when called with
        // a context object, links the compiled HTML to the given context (e.g.
        // binds scope-based expressions in the view to the passed in scope).
        //var html = "<div ng-repeat='m in model'>{{m.name}}</div>";
        //var linkingFunction = $compile(html);
        //var elem = linkingFunction($scope);
        //
        //// You can then use the DOM element like normal.
        //$rootElement.append(elem);








        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
        // plunker link from here








        $scope.htmlhk ='<div>htmlhk</div>';



        //$scope.htmlString = '<a ng-href="http://hkon.net" target="_blank">hkon.net</a>';
        //$scope.htmlString = 'ffffffffffff';
        $scope.htmlString = '<ul><li>render me please</li></ul>';
        //this.htmlString = '<ul><li>render me please</li></ul>';
        //this.htmlString = 'hhhhhhhhhhhhhh';
        //$scope.htmlString = $sce.trustAsHtml($scope.htmlString);
        //

        //$scope.posts = [{url:'http://u2d.co', text:'u2d'},{url:'http://ibm.com', text:'ibm'}];
        $scope.postshk = ['a', 'b'];
        //console.log ('UtilClass.getClass($scope.posts):' + UtilClassz.getClass($scope.posts));
        //console.log ('$scope.posts.length:' + $scope.posts.length);
        //console.log ('$scope.posts[0]:' + $scope.posts[0]);

        // test
        $scope.showClient = function(client) {
            alert ('in showclient');
            console.log ('in showclient');
            $location.path('#/user/' + client.tagid);
        };

        $scope.hklinkycallcount = 0;
        $scope.hklinky= function(client) {
            //alert ('in  hklinky');
            console.log ('in hklinky ');
            $scope.hklinkycallcount++;
            //var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
            //return 'hklinkyrtn:' + client.replace(exp,"<a href='$1'>$1</a>");
            return 'hklinkyrtn:' + client;
        };




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



        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            //you also get the actual event object
            //do stuff, execute functions -- whatever...
            //console.log ('@@@@@@@@@@@@@@@@@@@@@@@@ done rendering this.ustodosQueryResult.length:' + $scope.ustodosQueryResult.length);
            //console.log ('@@@@@@@@@@@@@@@@@@@@@@@@ done rendering this.ustodosQueryResult.length:' + $scope.ustodosQueryResult[9].toString());
            //console.log ('@@@@@@@@@@@@@@@@@@@@@@@@ getClass:'+UtilClassz.getClass($scope.ustodosQueryResult));












            for (var i=0; i < $scope.ustodosQueryResult.length; i++) {
                //console.log('===========' + $scope.ustodosQueryResult[i].text);
                //console.log('===========' + UtilHtmlHref.seeIfConnectedToThisClass($scope.ustodosQueryResult[i].text));
                //$scope.ustodosQueryResult[i].text = '<a href="http://ibm.com">http://ibm.com</a>' + UtilHtmlHref.seeIfConnectedToThisClass($scope.ustodosQueryResult[i].text);




                $scope.ustodosQueryResult[i].text =
                    //' yyy2 <a href="http://banana.com" target="_blank">http://banana.com</a>' + UtilHtmlHref.seeIfConnectedToThisClass($scope.ustodosQueryResult[i].text);
                    ' yyy2 ' + UtilHtmlHref.seeIfConnectedToThisClass($scope.ustodosQueryResult[i].text);

                //$scope.ustodosQueryResult[i].text =
                //    'xxx1 [' +
                //    '<a ng-href=\"http://u2d.co\" target=\"_blank\">UtD</a>' /
                //    + '] yyy1' + UtilHtmlHref.seeIfConnectedToThisClass($scope.ustodosQueryResult[i].text);








            }
            //<a ng-href="http://u2d.co" target="_blank">link1</a>

            //$scope.ustodosQueryResult = null;

            //if (index > -1) {
            $scope.ustodosQueryResult.splice(2, 1);
            //}
        });
        $scope.functionTest = function(s)
        {
            return 'eee:'+ s;
        };

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
            // KEEPER 150214 console.log ('!@!@!@!@!@!@!!!@ utd[Class].getClass(ustodosQueryResult)]:'+UtilClass.getClass(ustodosQueryResult));
            //console.log ('============ in here'+ustodosQueryResult.length);

            console.log('2assigned this.hbkkBindSearch:'+ this.hbkkBindSearch);
            //this.countOfUstodos = ustodosQueryResult.length;
            //this.ustodosQueryResult = ustodosQueryResult;
            $scope.ustodosQueryResult = ustodosQueryResult;
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
]).directive('myCustomer', function() {
    return {
        //templateUrl: function(elem, attr){
        //    return 'customer-'+attr.type+'.html';
        template: function(elem, attr){

            console.log ('in mycustomer directive ==================================');
            //return 'ggggggggggghhhhhhhhhhhhhh';
            return 'ustodo text: <a href="http://applex.com" target="_blank">http://applex.com</a>';

        }
    };
});







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














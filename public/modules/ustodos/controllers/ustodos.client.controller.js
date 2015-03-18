'use strict';


//var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
//var O = require('C:/utd/141213UtdV6/public/util/O.js');
//var UtilClass = null;

var resolveFinalCommandBetweenUrlAndInputBox = function(commandFromInputBox, commandInputBox)
{
    //alert ('in resolveFinalCommandBetweenUrlAndInputBox  SEARCH $location.search().q:' + commandFromInputBox +
    //', commandInputBox:' + commandInputBox);

    //alert ('stateParams_searchstring_url:' + stateParams_searchstring_url);
    //alert ('commandFromInputBox:' + commandFromInputBox);


//	sdfsdf

    var commandFinal = commandInputBox;
    if (commandFinal === undefined || !commandFinal) {
        commandFinal = commandFromInputBox;
    }
    if (commandFinal === undefined || !commandFinal) {
        commandFinal = '';
    }

    console.log ('commandFinal:'+commandFinal);
    return commandFinal;
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
//var getHtmlHk = function(index) {
//    console.log ('A getHtmlHk:'+index);
//    return ustodos[$index].html
//    console.log ('B getHtmlHk:'+index);
//}

var angularModule = null;
//angularModule = angular.module('ustodos');


//O.a ('sssa1.5');



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




//myApp.controller('myCtrl', ['$scope', '$sce', function($scope, $sce) {
//    // ...
//    $scope.preview_data.preview.embed.htmlSafe =
//        $sce.trustAsHtml(preview_data.preview.embed.html);
//}
//myApp.controller('myCtrl', ['$scope', '$sce', function($scope, $sce)




// works angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'Authentication', 'Ustodos',
//    function($scope, $stateParams, $location, $rootScope, Authentication, Ustodos) {
// angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'ngSanitize', 'Authentication', 'Ustodos',




var app = angular.module('ustodos');


//O.a ('oneOfSeveral controller with array - first?');
app.controller('UstodosController', ['$scope', '$window', '$stateParams', '$location', '$document', '$rootScope', '$sce',
    'Authentication', 'Ustodos', 'Commands',
    function($scope, $window, $stateParams, $location, $document, $rootScope, $sce, Authentication, Ustodos, Commands)
    {
        //angularModule.controller('UstodosController', ['$scope', '$stateParams', '$locationProvider', '$rootScope', '$sce',
        //    'Authentication', 'Ustodos',
        //    function($scope, $stateParams, $locationProvider, $rootScope, $sce, Authentication, Ustodos) {
        //angularModule.controller('UstodosController', ['$scope', '$stateParams', '$location', '$rootScope', 'ngSanitize', 'Authentication', 'Ustodos',
        //    function($scope, $stateParams, $location, $rootScope, ngSanitize, Authentication, Ustodos) {
        //$rootScope', $compile, $rootElement,
        //    O.a ('sssa1');

        $scope.setCaret  = function () {
            //alert ('in setcaret');
            var el = document.getElementById("editorhk");
            var range = document.createRange();
            var sel = window.getSelection();
            //range.setStart(el.childNodes[0], 5);
            //range.collapse(true);
            //sel.removeAllRanges();
            //sel.addRange(range);
            el.focus();
        }

        $scope.inputbind ='search or input';
        $scope.onKeyDownInputField = function() {
            var t = $scope.mmmm.element.innerText;
            console.log ('inkey onKeyDownInputField t:' + t);
            if (t.indexOf('search or input') === 0)
            {
                console.log ('change it:' + t);
                $scope.mmmm.element.innerHTML = '';
                //$scope.mmmm.element.innerText
            }

        }
        $scope.onKeyUpInputField = function() {
            $scope.count++;
            var t = $scope.mmmm.element.innerText;
            console.log ('inkey onKeyUpInputField index t [' + t + ']' );
            if (t.length > 2)
            {
                console.log('t-1:' + t[t.length-1])
                console.log('t-1:' + t[t.length-1].charCodeAt(0))
                console.log('t-2:' + t[t.length-2])
                console.log('t-2:' + t[t.length-2].charCodeAt(0))
                console.log('a:' + $scope.mmmm.element.innerHTML);
            }
            //isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(false);
            //alert ('inkey keypress commandFromInputBox:' + this.inputbind);
            //var t = $scope.mmmm.element.innerText;
            //if (t.indexOf('search or input') === 1)
            //{
            //    $scope.mmmm.element.innerText = 'joe';
            //    //$scope.mmmm.element.innerText
            //}


            //console.log('a [' + $scope.mmmm.element.innerText + ']');


            //$scope.$apply()
        };





        //alert ('defined medium');

        console.log ('000000000000000000000000000000 in ustodos.client.controller init');

        //tinymce.init({
        //    selector: "textarea"
        //});
        //console.log ('done tinymce init !!!!!!!!!!!!! ');

        // see https://devcenter.heroku.com/articles/nodejs-mongoose#querying
        // see http://jsfiddle.net/FxM3B/4/  for examples
        $scope.operators = [];

        // see https://devcenter.heroku.com/articles/nodejs-mongoose#querying
        // see http://jsfiddle.net/FxM3B/4/  for examples

        //var query = Commands.find({});
//        query.sort('commandDescription', 1);


        //var x = Commands.query();
        //x.sort('commandDescription', 1);

        //$scope.modelForSelectId = '-save';
        $scope.selectModel = 'Amazon';
        $scope.commands = Commands.query(function() {
            //$scope.commands = query.exec (function() {
            //alert ('done query $scope.commands.length:' + $scope.commands.length);
            try {
                for (var i = 0; i < $scope.commands.length; i++) {
                    var map = {};
                    //console.log('$scope.commands[i].commandDescription:' + $scope.commands[i].commandDescription);
                    map.value = $scope.commands[i].commandUrl;
                    map.displayName = $scope.commands[i].commandDescription + ' (' + $scope.commands[i].commandCode + ')';
                    //alert('$scope.commands[i].commandDescription:' + $scope.commands[i].commandDescription);
                    //commandsValueName.push ({value:$scope.commands[i].commandDescription})
                    $scope.operators.push(map);
                }

                //alert('pre sort');
                $scope.commands = $scope.commands.sort(function (a, b) {
                    if (a.commandDescription.toLowerCase() > b.commandDescription.toLowerCase())
                        return 1;
                    else
                        return -1;
                });
                //alert ('post sort $scope.commands.length:' + $scope.commands.length);
            } catch (err) {
                alert('era in commands query:' + err);
            }
        });

        //var x = Commands.query();
        //x.sort('commandDescription', 1);

        $scope.operators = [];
        //$scope.commands = Commands.query(function() {
        //    //$scope.commands = query.exec (function() {
        //    //alert ('done query $scope.commands.length:' + $scope.commands.length);
        //    for (var i = 0; i < $scope.commands.length; i++) {
        //        var map = {};
        //        console.log ('$scope.commands[i].commandDescription:' + $scope.commands[i].commandDescription);
        //        map.value = $scope.commands[i].commandDescription;
        //        map.displayName = $scope.commands[i].commandDescription;
        //        //alert('$scope.commands[i].commandDescription:' + $scope.commands[i].commandDescription);
        //        //commandsValueName.push ({value:$scope.commands[i].commandDescription})
        //        $scope.operators.push(map);
        //    }
        //
        //});
        //
        $scope.filterCondition = '-save';



        //$scope.filterCondition= {
        //    operator: 'eq'
        //};

        //$scope.commandsxx = 1;

        //$scope.filterCondition= {
        //    operator: 'eq'
        //};

        //$scope.commandsxx = 1;
        //$scope.operators = [
        //    {value: 'eq', displayName: 'equals'},
        //    {value: 'neq', displayName: 'not equal'}
        //];

        $scope.mml = angular.element(document.getElementById('myMenuList'));

        //$locationProvider.html5Mode(true).hashPrefix('!');

        $scope.SkipValidationHK = function(value) {
            return $sce.trustAsHtml(value);
        };

        $scope.event = null;

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

        var o = O.o;

        $scope.commandFromInputBox = 'lll';

        $scope.keyCount = 0;

        $document.bind('keypress', function(event) {
            //o ('inkey keypress event.keyCode:' + event.keyCode + ', $scope.keyCount:'+$scope.keyCount);
            $scope.keyCount++;
        });

        $scope.myFnOnKeyUp = function($index, $event) { // onkey
            //o ('inkey myFnOnKeyUp $index:' + $index + ', $event.keyCode:' + $event.keyCode);
            //console.log (i + '. aaa event.altKey:'+event.altKey);
        };

        $scope.myFnOnKeyDown = function($index, $event) { // onkey
            //o ('inkey myFnOnKeyDown $index:' + $index + ', $event.keyCode:' + $event.keyCode);

        };



        $scope.event_click_timeAgo = function (_id) {
            alert (_id);
        };

        $scope.buttonClickSearchStar = function() {
            this.commandFromInputBox = '*';
            search();
        }

        $scope.eventMouseoverRow = function(i) {
            //console.log ('in eventMouseoverRow ' + i);
            var x = document.getElementById('ustodorow'+i);
            //var x = angular.element('ustodorow'+i);
            //console.log ('in eventMouseoverRow x.innerText:' + x.innerText);
            $scope.commandFromInputBox = x.innerText;
            //elem.contentEditable = false;
            //console.log ('in eventMouseoverRow set this.commandFromInputBox :' + x.innerText);

        };

        $scope.eventMouseoverRow2 = function(i) {
            //console.log('A in eventMouseoverRow2 i:' + i);
            var x = document.getElementById('ustodorow'+i);
            //console.log ('B in eventMouseoverRow x.innerText:' + x.innerText);
            $scope.commandFromInputBox = x.innerText;
            //console.log('C in eventMouseoverRow2 i:' + i);
        };

        //$scope.buttonClickSearchClear = function() {
        //    this.commandFromInputBox = '';
        //}

        // selectId
        $scope.yyutdact = function() {

            $scope.mmmm.element.focus();
            window.getSelection().setPosition(0)
            console.log ('doneit');
        }

        $scope.utdEventSelectedEngine = function() {
            try
            {
                //var t = document.getElementById('selectId').value;
                //var options = document.getElementById('selectId').options;
                var idxSelected = parseInt(document.getElementById('selectId').value);
                //var commandDisplayName = options[idxSelected].innerText;
                //for (var i = 0; i < $scope.commands.length; i++) {
                //    if ($scope.commands[i].commandDescription === commandDisplayName) {
                //        //alert ('found match:'+$scope.commands[i].commandDescription);
                //        var finalUrl = $scope.commands[i].commandUrl.replace(/%s/, this.commandFromInputBox);
                //        // alert ('finalUrl:'+finalUrl);
                //        $window.location.href = finalUrl;
                //    }
                //}
                var selectedCommandUrl = $scope.commands[idxSelected].commandUrl;
                var finalUrl = selectedCommandUrl.replace(/%s/, this.commandFromInputBox); // change %s

                //finalUrl = finalUrl.replace(/^.*\)/, ''); // get rid of parens
                $window.location.href = finalUrl;

                //$location.path('/')
                //$location.url('http://www.yahoo.com')
                //$window.location.href = '#/tab/category/1';
                //var target = angular.element('#textHKKH');
                //$scope.commandUrl = $scope.commands[idxSelected].commandUrl;
                //var idxSelected = parseInt(document.getElementById('selectId').value);
                //var selectedCommandUrl = $scope.commands[idxSelected].commandUrl;
                //isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(true);
                //$scope.$apply()
            } catch (err) {
                alert ('err in utdact:' + err);
            }


        };

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
        function confirmExit()
        {
            if (isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption(false))
                return 'Your changes will be lost.  Are you sure you want to exit this page?';
        }
        window.onbeforeunload = confirmExit;


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
        };

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
        };

        // has any row changed
        var callCnt_isDirty = 0;
        var time_last_save = 0;
        var isDirtySetFlag_updateScopeStateFlag_SaveDiffsOption = function (saveDiffs)
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
                //console.log (i + '. @@@@@@@@@@@@@@@@ checking for change $scope.areThereChanges:' + $scope.areThereChanges);
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

                            //saveOneUstodo($scope.ustodos[i]);

                            // ends up in C:\utd\141213UtdV6\app\controllers\ustodos.server.controller.js
                            // .exports.update
                        }
                        $scope.areThereChanges = true;
                        //name = 'll'+ $scope.areThereChanges;
                        if (!saveDiffs) // for non save, only need one
                            break;
                    }
                    //alert ('loop done');
                }
                // diff here
            }
            //console.log (callCnt_isDirty + '. exiting isDirty returning with $scope.areThereChanges:'+ $scope.areThereChanges);
        };


        $scope.deleteDbUstotoById = function(ustodo)
        {
            try {
                var savOid = ustodo._id;
                //console.log ('in deleteDbUstotoById '  + savOid);
                console.log ('in deleteDbUstotoById html:'  + ustodo.html);
                //alert ('in deleteDbUstotoById ' + savOid);
                var indexToDelete = -1;
                for (var i = 0; i < $scope.ustodos.length; i++) {
                    console.log ('check if to array to delete, index:' + i + '. id:' +  $scope.ustodos[i].html);

                    if ($scope.ustodos[i]._id === savOid)
                    {
                        console.log ('found one local array to delete, index:' + i);
                        console.log ('found one local array to delete, indexToDelete:' + indexToDelete);
                        console.log ('@@@@deleting:' + $scope.ustodos[i].html);
                        $scope.ustodos.splice(i, 1);
                        console.log ('done local array delete, index:' + i);
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
        };



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
                html: this.html// hbkk mystery
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
            //console.log ('in ustodos.client.controller FIND2');

            //alert ('set commandsxx ');
            //{
            //alert('in ustodos.client.controller $scope.commands.length:' + $scope.commands.length);
            //};
            //$scope.commands = Commandsss.query();
            //alert ('in ustodos.client.controller $scope.commands.length:'+$scope.commands.length);


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

        // Search for new Ustodo (findlist)
        $scope.callCountSearch = 0;

        $scope.sayhi = function() {
            alert ('df');
        };

        $scope.search = function()
        {
            $scope.callCountSearch++;
            o ('in search 0 this.commandFromInputBox:' + this.commandFromInputBox);
            this.commandFromInputBox = resolveFinalCommandBetweenUrlAndInputBox
                //( $location.search.q  , this.commandFromInputBox);
            ( $location.$$search.q, this.commandFromInputBox);
            o ('in search 1 $location.$$search.q:' +  $location.$$search.q);
            o ('in search 2 this.commandFromInputBox:' + this.commandFromInputBox);
            window.document.title = 'll:'+$location.$$search.q; // not jpro:
            //alert ('$location.$$search.q:'+$location.$$search.q);
            //$location.path('/'+this.commandFromInputBox)

            $scope.ustodos  = Ustodos.query ({q: this.commandFromInputBox});
            $location.search('q', this.commandFromInputBox);       // yoo bar foo bar baz
            //var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');
            //console.log ('%%%$$%%$$%%%%%%%%%%%%% UtilClassx.getClass(this):'+utd.Class.getClass(this));
            //console.log ('%%%$$%%$$%%%%%%%%%%%%% UtilClassx.utilGetClass(this):'+UtilClassx.utilGetClass(this));

            //setTimeout(function(){alert('in ustodos')}, 2000);
            //setTimeout(function(){

            //setTimeout(function(){
            //console.log ('hi1 hk this.newUrl :' + newUrl );
            //console.log ('hi2 hk this.commandFromInputBox:' + this.commandFromInputBox);
            //console.log ('hi3 hk $scope.hkhkhkbk:' + $scope.hkhkhkbk);
            //$location.path('/#!/ddddddd');
            //$location.path(newUrl).replace();
            //$location.skipReload().path("/newpath").replace(); // https://github.com/angular-ui/ui-router/issues/427
            // https://github.com/angular-ui/ui-router/issues/427
            // https://www.google.com/search?num=100&es_sm=93&q=angular+%24location.path+replace&oq=angular+%24location.path+replace&gs_l=serp.3..0i22i30.1345.1711.0.2094.2.2.0.0.0.0.130.250.0j2.2.0.msedr...0...1c.1.61.serp..0.2.250.2tLK_AkIUUs
            // https://www.google.com/search?q=angular+change+url&oq=angular+change+url&aqs=chrome..69i64j0l5.704j0j9&sourceid=chrome&es_sm=93&ie=UTF-8
            // https://docs.angularjs.org/api/ng/service/$location


            //window.location.href = '/#!/ssss2' ;
            //$scope.apply();

//            try {

            //$locationProvider.html5Mode(true);
            //window.location.href = '/#!/ustodos/findlist/' + $scope.hkhkhkbk;

            // this is the one to toggle 150304
            //window.location.href = '/#!/?q=' + $scope.hkhkhkbk;
            //$location.path($location.path() + 'ddd/#!/?q=' + $scope.hkhkhkbk);

            //window.location.href = '/?q=sdfdfdf';
            //$location.path('#/login');
            //alert ('22c $location.absUrl():' + $location.absUrl());
            //alert ('22d window.location.href:' + window.location.href);
            //alert ('22e this.commandFromInputBox:' + this.commandFromInputBox);
            //window.location.href = window.location.href + '/xxx' + this.commandFromInputBox;
            //window.location.href = window.location.href + '/xxx';
            //https://docs.angularjs.org/guide/$location
            //alert('assigned this.commandFromInputBox:'+ this.commandFromInputBox);


            //console.log (getClass('ssdfsdfdsf', this.commandFromInputBox));

            //$scope.ustodos = Ustodos.query ({name: /141229/});
            //setTimeout(function(){console.log ('in ustodos.client.controller SEARCH2 $scope.ustodos.length:' + $scope.ustodos.length);}, 1000);
            //setTimeout(function(){alert ('in ustodos.client.controller SEARCH2 $scope.ustodos.length:' + $scope.ustodos.length);}, 1000);
            //$scope.$apply();

            //getProperties('props this:', this);
            //var ustodo = new Ustodos ({
            //	name: this.name,  // hbkk mystery
            //	commandFromInputBox: this.commandFromInputBox // hbkk mystery
            //});
            //getProperties('props ustodo:', ustodo);




            //// Redirect after save
            //ustodo.$save(function(response) {
            //	$location.path('ustodos/' + response._id);
            //	$scope.name = '';
            //}, function(errorResponse) {
            //	$scope.error = errorResponse.data.message;
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
        //O.a ('sssa2');






// <select> element displays its options on mousedown, not click.
        $scope.showSelectDropdown = function () {
            var event;
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('mousedown', true, true, window);
            document.getElementById('selectId').dispatchEvent(event);
        };

// This isn't magic.
        //http://jsfiddle.net/fz2sY/39/
        $scope.runThis = function () {
        };





        //alert ('defining medium');
        $scope.mmmm = new Medium({
            element: document.getElementById('editorhk'),
            modifier: 'auto',
            placeholder: "",
            autofocus: false,
            autoHR: true,
            mode: Medium.richMode,
            maxLength: -1,
            modifiers: {
                'b': 'bold',
                'i': 'italicize',
                'u': 'underline',
                'v': 'paste'
            },
            tags: {
                'break': 'br',
                'horizontalRule': 'hr',
                'paragraph': 'p',
                'outerLevel': ['pre', 'blockquote', 'figure'],
                'innerLevel': ['a', 'b', 'u', 'i', 'img', 'strong']
            },
            cssClasses: {
                editor: 'Medium',
                pasteHook: 'Medium-paste-hook',
                placeholder: 'Medium-placeholder',
                clear: 'Medium-clear'
            },
            attributes: {
                remove: ['style', 'class']
            },
            pasteAsText: true,
            beforeInvokeElement: function () {
                //this = Medium.Element
            },
            beforeInsertHtml: function () {
                //this = Medium.Html
            },
            beforeAddTag: function (tag, shouldFocus, isEditable, afterElement) {
            },
            keyContext: null,
            pasteEventHandler: function(e) {
                /*default paste event handler*/
            }
        });








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













//O.a ('oneOfSeveral $routeProvider', '$locationProvider');
angular.module('ustodos')
    //.config (
    //['$locationProvider',
    //    function ($locationProvider) {
    //
    //        //commenting out this line (switching to hashbang mode) breaks the app
    //        //-- unless # is added to the templates
    //        $locationProvider.html5Mode(true);
    //
    //        //$routeProvider.when('/', {
    //        //    template: 'this is home. go to <a href="/about"/>about</a>'
    //        //});
    //        //$routeProvider.when('/about', {
    //        //    template: 'this is about. go to <a href="/"/>home</a'
    //        //});
    //    }
    //])
    ////.config(function($locationProvider ) {
    ////    $locationProvider.html5Mode(true);
    ////    //$routeProvider.otherwise({redirectTo: '/home', controller: HomeCtrl});
    ////})
    .directive('onFinishRender', function ($timeout) {
        O.a('sss2');
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        //O.a ('sss3');
                        scope.$emit('ngRepeatFinished');
                        alert('ngRepeatFinished');
                    });
                }
            }
        }
    });


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


//if ( typeof String.prototype.startsWith != 'function' ) {
//    String.prototype.startsWith = function( str ) {
//        return this.substring( 0, str.length ) === str;
//    }
//} else
//    alert('startswith defined already');
//
//;
//
////alert( "hello world".startsWith( "hello" ) );
//
//if ( typeof String.prototype.endsWith != 'function' ) {
//    String.prototype.endsWith = function( str ) {
//        return this.substring( this.length - str.length, this.length ) === str;
//    }
//}
//else
//    alert('endswith defined already');
//
//alert( "hello world".endsWith( "world"));


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


        $scope.pickCkEditorBasedOnPlatform = function()
        {
            var x = 'Platform: '+ navigator.platform;
            document.getElementById('demo').innerHTML = x;
        };

        $scope.$watch('$viewContentLoaded', function(){ // like onload YES
            //alert ('in $viewContentLoaded');
            //var x = document.getElementById('idCkeEditorTextarea').innerHTML;
            //alert ('in $viewContentLoaded:' + x);

            //var editor = CKEDITOR.instances.idCkeEditorTextarea;

            //alert ('focusManager.focus');
            //editor.focusManager.focus( editor.editable() );

            CKEDITOR.instances.idCkeEditorTextarea.on('blur', function() {
                //alert('cke blur fired');
                $scope.prop2Cke();
                //$scope.propagateTextChanges();
            });

            $scope.toggleVisibilityTo0();
                //ng-blur="propagateTextChanges()"

        });

        //$scope.testTinyMce = function()
        //{
        //    console.log ('start testTinyMce');
        //    //tinymce.activeEditor.setContent('<span>some</span> html');
        //    tinyMCE.get('idTinyMceTextArea').setContent('<span>some1</span> html');
        //    //alert ('done testTinyMce');
        //}

        $scope.ngInitTopLevel= function()
        {
            //alert ('in ngInitTopLevel');
        };

        $scope.ngInitTinyMceButton = function()
        {
            //alert ('in ngInitTinyMceButton');
        };

        $scope.ngInitTinyMce = function()
        {
            //alert ('start testTinyMce');
            //tinymce.activeEditor.setContent('<span>some</span> html');
            //alert ('in ngInitTinyMce');
            //alert ('done testTinyMce');
        };

        $scope.myCustomOnInit = function () {
            //alert("myCustomOnInit from mce");
            //tinyMCE.get('idTinyMceTextArea').setContent('<span>some1</span> html');
            //tinymce.activeEditor.setContent('<span>some</span> html');
        };

        //tinyMCE.init({
        //    ...
        //    oninit : myCustomOnInit
        //});
        //


        //tinyMCE.init({
        //    selector:'textarea',
        //    //setup : function(ed) {
        //    //    ed.onKeyDown.add(function(ed, e) {
        //    //        console.debug('Key down event: ' + e.keyCode);
        //    //    });
        //    oninit : '$scope.myCustomOnInit()'
        //    })
        //;
        //



        // tinymce4 works
        //tinymce.init({
        //    selector: "textarea",
        //    theme: "modern",
        //    plugins: [
        //        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        //        "searchreplace wordcount visualblocks visualchars code fullscreen",
        //        "insertdatetime media nonbreaking save table contextmenu directionality",
        //        "emoticons template paste textcolor colorpicker textpattern"
        //    ],
        //    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        //    toolbar2: "print preview media | forecolor backcolor emoticons",
        //    image_advtab: true,
        //    templates: [
        //        {title: 'Test template 1', content: 'Test 1'},
        //        {title: 'Test template 2', content: 'Test 2'}
        //    ]
        //});

        //tinymce3 works
        tinyMCE.init({
            mode : 'exact',
            elements : 'idTinyMceTextArea, idTinyMceTextArea'
        });


        // ckeditor test
        //CKEDITOR.replace('idCkeEditorTextarea');
        //alert('setting editor');
        $scope.editor = CKEDITOR.replace( 'idCkeEditorTextarea', {
            //language: 'fr',
            customConfig: '/lib/ckeditor/config.js',
            startupFocus : false,
            uiColor: '#9AB8F3'
        });

        $scope.ns = {};

        // input ENUM
        $scope.ns.Input = {
            INPUT_NONE_IS_IN_FOCUS: -1,
            INPUT_0_TEXT: 0,
            INPUT_1_MEDIUM: 1,
            INPUT_2_CKE: 2
        };

        //$scope.whichInputIsInFocus = function() {
        //    if (document.activeElement.id === 'idInput0TypeText')
        //        return $scope.ns.Input.INPUT_0_TEXT;
        //    // 1 medium
        //    else if (document.activeElement.id === 'idMediumEditor')
        //        return $scope.ns.Input.INPUT_1_MEDIUM;
        //    // 2 cke
        //    else if (document.activeElement.parentElement.id.indexOf('cke') >= 0)
        //        return $scope.ns.Input.INPUT_2_CKE;
        //    else
        //        alert ('errra');
        //}

        $scope.whichInputIsInFocus = function() {
            var currentlyInFocus = $scope.currentVisibleCounter % arrIds.length;
            // 0 input text box
            if ($scope.ns.Input.INPUT_0_TEXT === currentlyInFocus)
                return $scope.ns.Input.INPUT_0_TEXT;
            // 1 medium
            if ($scope.ns.Input.INPUT_1_MEDIUM === currentlyInFocus)
                return $scope.ns.Input.INPUT_1_MEDIUM;
            // 2 cke
            if ($scope.ns.Input.INPUT_2_CKE === currentlyInFocus)
                return $scope.ns.Input.INPUT_2_CKE;
            else
                return $scope.ns.Input.INPUT_NONE_IS_IN_FOCUS;
        };


        $scope.respondToChangeEvent = function(keyCode)
        {
            //alert ('in $scope.respondToChangeEvent()');
            // 0 idInput0TypeText
            // 1 idMediumEditor
            // 2 parent like CKE

            // 0 text input
            var xText = null;
            var xHtml = null;
            var bShouldIsearch = false;
            var bShouldIsave = false;

            // decide for each input type whether to search
            var xHtmlStripped = null;
            switch($scope.whichInputIsInFocus()) {
                case $scope.ns.Input.INPUT_0_TEXT:
                    xText = document.getElementById('idInput0TypeText').value;
                    if (xText.charCodeAt(xText.length-1) === 32)
                        bShouldIsearch = true;
                    break;
                case $scope.ns.Input.INPUT_1_MEDIUM:
                    xText = $scope.mmmm.element.innerText;
                    xHtml = $scope.mmmm.element.innerHTML;
                    xHtmlStripped = xHtml.replace('<p>','');
                    xHtmlStripped = xHtmlStripped.replace('</p>','');
                    xHtmlStripped = xHtmlStripped.trim();
                    if (xHtmlStripped.endsWith('&nbsp;')) {
                        bShouldIsearch = true;
                        //alert ('yes search');
                    }
                    //else
                        ///alert ('no search');

                    break;
                case $scope.ns.Input.INPUT_2_CKE:
                    xText = CKEDITOR.instances.idCkeEditorTextarea.document.getBody().getText();
                    xHtml = CKEDITOR.instances.idCkeEditorTextarea.getData();
                    xHtmlStripped = xHtml.replace('<p>','');
                    xHtmlStripped = xHtmlStripped.replace('</p>','');
                    xHtmlStripped = xHtmlStripped.trim();
                    if (xHtmlStripped.endsWith('&nbsp;')) {
                        bShouldIsearch = true;
                        //alert ('yes search');
                    }
                    break;
                default:
                    alert ('era - bad input resolution');
            }
            //alert ('xText [' + xText + ']');
            //alert ('xHtml [' + xHtml + ']');
            //alert ('xHtmlStripped [' + xHtmlStripped + ']');
            //alert ('xText [' + xText[xText.length-1] + ']')
            //alert ('xText -1 [' + xText.charCodeAt(xText.length-1) + ']');
            //alert ('xText -2 [' + xText.charCodeAt(xText.length-2) + ']');
            //alert ('xText -3 [' + xText.charCodeAt(xText.length-3) + ']');
            //window.document.title = 'jp2 - '+xText; // not jpro:
            if (keyCode === 13 || bShouldIsearch)
            {
                $scope.searchhk(xText);
            }

            //alert ('document.activeElement.id:' + document.activeElement.id + ', parent:' + document.activeElement.parentElement.id);
            //alert ('document.activeElement.parentElement.id:' + document.activeElement.parentElement.id);
        };

        $scope.editor = CKEDITOR.instances.idCkeEditorTextarea;
        $scope.editor.on( 'contentDom', function() {
            //alert ('in contentDom1');
            var editable = $scope.editor.editable();
            editable.attachListener( editable, 'keyup', function(event) {
                //var keyCode= (window.event ? keyEvent.keyCode : keyEvent.which);

                if ( !event.data.$.ctrlKey && !event.data.$.metaKey )
                {
                    // something changed
                    O.o ( '1 in contentdom ' + $scope.editor.getData() );
                    O.o ( '2 in contentdom ' + event.data.$.keyCode);
                    O.o ( '3 in contentdom ' + !event.data.$.ctrlKey && !event.data.$.metaKey);
                    $scope.respondToChangeEvent(event.data.$.keyCode);
                }


                //var keyCode= keyEvent.getKey();
                //O.o ( '1 in contentdom ' + $scope.editor.getData() );
                //O.o ( '2 in contentdom ' + keyCode);
                //O.o ( '2 in contentdom ' + !event.data.$.ctrlKey && !event.data.$.metaKey);
                //O.o ( $scope.editor.getData() );
                //$scope.respondToChangeEvent();
            } );
        } );


        //$scope.editor.on('contentDom', function( event )
        //{
        //    $scope.editor.document.on('key', function(event)
        //    {
        //        console.log('my key');
        //    });
        //
        //    //$scope.editor.on('keyup', function(event) {
        //    //    alert('raw keyup');
        //    //});
        //    //$scope.editor.document.on('keyup', function(event) {
        //    //    console.log('my keyup:' + $scope.editor.getData());
        //    //    //tinyMCE.get('idTinyMceTextArea').setContent('<span>some1</span> html'); // 4
        //    //});
        //
        //    $scope.editor.on('keydown', function(event) {
        //        console.log('my keydown');
        //    });
        //
        //    //$scope.editor.on( 'contentDom', function() {
        //    //    //alert ('in contentDom1');
        //    //    var editable = $scope.editor.editable();
        //    //    editable.attachListener( editable, 'keyup', function(ev) {
        //    //        O.o ('in contentDom2 ' + ev);
        //    //
        //    //        console.log( $scope.editor.getData() );
        //    //    } );
        //    //} );
        //    //
        //    $scope.editor.on('key', function(event) {
        //        var x = CKEDITOR.instances.idCkeEditorTextarea.getData();
        //        //var xText = CKEDITOR.instances.idCkeEditorTextarea.document.getBody().getText()
        //        //o('raw key x:' + x); // hbkhbk
        //        $scope.respondToChangeEvent();
        //        //console.log('raw key xText:' + xText); // hbkhbk
        //        //$scope.showFocus();
        //
        //
        //        //alert ('raw key x:' + x)
        //    });
        //
        //    $scope.editor.on('keydown', function(event) {
        //        console.log('raw keydown');
        //    });
        //
        //    $scope.editor.document.on('mouseup', function(event) {
        //        console.log('mouseup');
        //    });
        //
        //    $scope.editor.document.on('blur', function(event) {
        //        alert('blur');
        //    });
        //
        //    //CKEDITOR.instances.editor1.on('OnBlur', function() {
        //    //    alert('onblur fired');
        //    //});
        //
        //});
        //
        //



        $scope.editor.addCommand('mySimpleCommand', { // create named command
            exec: function(edt) {
                alert(edt.getData());
            }
        });

        $scope.editor.ui.addButton('SuperButton', { // add new button and bind our command
            label: 'Click me',
            command: 'mySimpleCommand',
            toolbar: 'clipboard, 1',
            icon: 'https://avatars1.githubusercontent.com/u/5500999?v=2&s=16'
        });




        //CKEDITOR.replace( 'editor1' );
        //idCkeEditorTextarea
        //CKEDITOR.on('instanceReady', function (ev) {
        //    editor = ev.editor;
        //
        //    // Show this 'on' button.
        //    document.getElementById('idCkeEditorTextarea').style.display = '';
        //
        //    // Event fired when the readOnly property changes.
        //    editor.on('readOnly', function () {
        //        document.getElementById('idCkeEditorTextarea').style.display = this.readOnly ? 'none' : '';
        //        //document.getElementById('readOnlyOff').style.display = this.readOnly ? '' : 'none';
        //    });
        //});
        //function toggleReadOnly(isReadOnly) {
        //    // Change the read-only state of the editor.
        //    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#setReadOnly
        //    editor.setReadOnly(isReadOnly);
        //}

        //$scope.testTinyMce();
        //tinyMCE.get('idTinyMceTextArea').setContent('<span>some2</span> html');

        $scope.focusOnId  = function (id) {
            //alert ('in setcaret');
            try {
                if (id !== 'idDivForCkeEditorTextarea')
                {
                    //alert ('in focusOnId 1:'+ id);
                    var el = document.getElementById(id);
                    var range = document.createRange();
                    var sel = window.getSelection();
                    //range.setStart(el.childNodes[0], 5);
                    //range.collapse(true);
                    //sel.removeAllRanges();
                    //sel.addRange(range);
                    el.focus();
                }
                else
                {
                    //alert ('focusManager.focus 2');
                    //var editor = CKEDITOR.instances.idCkeEditorTextarea;
                    //editor.focusManager.focus( editor.editable() );

                    CKEDITOR.instances.idCkeEditorTextarea.focus();

                }



            } catch (e) {
                alert ('era:' + e);
            }

        };

        $scope.inputbind ='search or inputx';

        //$scope.onKeyDownInputField = function() {
        //    //var inputText = $scope.mmmm.element.innerText;
        //    $scope.count++;
        //    O.o('in onKeyDownInputField:'+$scope.count)
        //    //console.log ('inkey onKeyDownInputField t:' + t);
        //    if (inputText.indexOf('search or input') === 0)
        //    {
        //        //console.log ('change it:' + t);
        //        //$scope.mmmm.element.innerHTML = '';
        //        //$scope.mmmm.element.innerText
        //    }
        //}

        $scope.toggleVisibility = function(id) {
            try {
                var e = document.getElementById(id);
                //alert ('in toggleVisibility 1 for id ' + id + ', e.style.display:' + e.style.display);
                if(e.style.display === 'block')
                    e.style.display = 'none';
                else {
                    //alert ('in else')
                    e.style.display = 'block';
                }
                //alert ('in toggleVisibility 2 for id ' + id + ', e.style.display:' + e.style.display);

            } catch (e) {
                alert ('in error fir id ' + id + ' e:'+e);
            }
        };

        $scope.eventClickedTheAnimals = function() {
            //alert ('in eventClickedTheAnimals');
            $window.location.href = 'http://jpro.co?q=*';
            //  $window.location.href = 'http://www.google.com/search?q=' + GLOBAL_commandFromInputBox;
            //$location.search('hk', this.commandFromInputBox);
        };


        $scope.getKeyboardEventResult = function (keyEvent, keyEventDesc)
        {
            return keyEventDesc + ' (keyCode: ' + (window.event ? keyEvent.keyCode : keyEvent.which) + ')';
        };

        // Event handlers
        //$scope.onKeyDown = function ($event) {
        //    $scope.onKeyDownResult = getKeyboardEventResult($event, 'Key down');
        //};
        $scope.onKeyUp = function (keyEvent) {
            var keyCode= (window.event ? keyEvent.keyCode : keyEvent.which);
            O.o('onKeyUp:' + keyCode);
            //O.o('onKeyUp:' + getKeyboardEventResult($event, 'Key up')); // hbkhbk
            $scope.respondToChangeEvent(keyCode);
        };
        //$scope.onKeyUp = function(ev) {
        //    ////alert('onKeyUp:' + ev); // hbkhbk
        //    //console.log('onKeyUp:' + getKeyboardEventResult); // hbkhbk
        //    ////console.log ('onKeyUp'); // hbkhbk
        //    ////$scope.showFocus();
        //    //$scope.respondToChangeEvent()
        //    ////$scope.propagateTextChanges();
        //};
        var getKeyboardEventResult = function (keyEvent, keyEventDesc)
        {
            return keyEventDesc + ' (keyCode: ' + (window.event ? keyEvent.keyCode : keyEvent.which) + ')';
        };

        $scope.currentTextValueAfterBlur = null;
        $scope.currentHtmlValueAfterBlur = null;

        $scope.prop0Input = function () {
            try {

                //O.o('start case 0')
                var x = document.getElementById('idInput0TypeText').value;

                $scope.currentValueAfterBlurText = x;
                $scope.currentValueAfterBlurHtml = x;

                //alert ('start case 0 x [' + x + ']')
                // 0 text input
                //document.getElementById('idInput0TypeText').value = x;

                // 1 medium
                $scope.mmmm.element.innerHTML = x;

                // 2 CKE
                CKEDITOR.instances.idCkeEditorTextarea.setData(x);
                //O.o('done case 0')
            }  catch (e) {
                alert ('error in prop0Input:' + e);
            }
        };

        $scope.prop1Medium = function () {
            try {

                var x = $scope.mmmm.element.innerText;
                var xHtml = $scope.mmmm.element.innerHTML;
                $scope.currentValueAfterBlurText = x;
                $scope.currentValueAfterBlurHtml = xHtml;
                O.o('start case 1 x [' + x + ']');
                //alert ('start case 1 x:' + x);

                // 0 text input
                document.getElementById('idInput0TypeText').value = x;

                // 1 medium
                //$scope.mmmm.element.innerHTML = $scope.inputbind;

                // 2 CKE
                CKEDITOR.instances.idCkeEditorTextarea.setData(xHtml);
                O.o('done case 1');
            }  catch (e) {
                alert ('error in prop1Medium:' + e);
            }
        };

        $scope.prop2Cke = function () {
            //alert ('start prop2Cke ')
            try {
                //alert ('start case 2')
                var xText = CKEDITOR.instances.idCkeEditorTextarea.document.getBody().getText();
                var xHtml = CKEDITOR.instances.idCkeEditorTextarea.getData();
                //alert('start case 2 x [' + xText + ']')
                $scope.currentValueAfterBlurText = xText;
                $scope.currentValueAfterBlurHtml = xHtml;

                // 0 text input
                document.getElementById('idInput0TypeText').value = xText;

                // 1 medium
                $scope.mmmm.element.innerHTML = xHtml;

                // 2 CKE
                //CKEDITOR.instances.idCkeEditorTextarea.setData($scope.inputbind)
            }  catch (e) {
                alert ('error in prop2Cke:' + e);
            }
        };



        var arrIds = ['idInput0TypeText', 'idMediumEditor', 'idDivForCkeEditorTextarea'];
        //var arrIds = ['idInput0TypeText', 'idMediumEditor', 'idDivForCkeEditorTextarea', 'idDivForTinyMceEditorTextarea'];
        $scope.currentVisibleCounter = $scope.ns.Input.INPUT_0_TEXT; // arrIds.length-1;

        $scope.showFocus= function() {
            alert ('document.activeElement.id:' + document.activeElement.id);
            alert ('document.activeElement.parentElement.id:' + document.activeElement.parentElement.id);
            //alert ('document.activeElement.parentElement.id:' + document.activeElement.parentElement.parentElement.id);
            //alert ('document.activeElement.parentElement.id:' + document.activeElement.parentElement.parentElement.parentElement.id);
            //alert ('document.activeElement.parentElement.id:' + document.activeElement.parentElement.parentElement.parentElement.parentElement.id);

        };



        $scope.toggleVisibilityToNext = function() {

            try {
                //alert ('in toggleVisibilityToNext');

                $scope.currentVisibleCounter++;
                //idInput0TypeText
                //idMediumEditor
                //idDivForCkeEditorTextarea
                //idTinyMceTextArea
                ////idInput4TypeSpan

                for (var i = 0; i < arrIds.length; i++)
                {
                    try {
                        var e = document.getElementById(arrIds[i]);
                        if (i === $scope.currentVisibleCounter % arrIds.length) {
                            e.style.display = 'block';
                            $scope.focusOnId(arrIds[i]);

                            //alert ('in toggleVisibility 1 for id ' + id + ', e.style.display:' + e.style.display);
                            //O.o ('in toggleVisibility for id ' + arrIds[i] + ', setting display to:' + e.style.display);
                            //O.o ('in toggleVisibility $scope.currentVisibleCounter:' + $scope.currentVisibleCounter);
                            //O.o ('in toggleVisibility arrIds.length:' + arrIds.length);
                            //O.o ('in toggleVisibility $scope.currentVisibleCounter % arrIds.length:' + ($scope.currentVisibleCounter % arrIds.length));
                        }
                        else
                            e.style.display = 'none';

                    } catch (e) {
                        alert ('erra in toggleVisibilityToNext loop on id [' + arrIds[i] + '] e:' + e );
                    }
                }
            } catch (e) {
                alert ('era in toggleVisibilityToNext:' + e);
            }

            //alert ('in toggleVisibilityToNext');

            //this.toggleVisibility('idInput0TypeText');
            //this.toggleVisibility('idMediumEditor');
            //this.toggleVisibility('idDivForCkeEditorTextarea');
        };

        $scope.focusOnIt = function(i) {
            $scope.focusOnId(arrIds[i]);
        };

        $scope.toggleVisibilityTo0 = function() {
            document.getElementById(arrIds[1]).style.display = 'none';
            document.getElementById(arrIds[2]).style.display = 'none';
            document.getElementById(arrIds[0]).style.display = 'block';
            $scope.focusOnId(arrIds[0]);
            $scope.currentVisibleCounter = $scope.ns.Input.INPUT_0_TEXT;
        };

        $scope.toggleVisibilityTo1 = function() {
            document.getElementById(arrIds[0]).style.display = 'none';
            document.getElementById(arrIds[2]).style.display = 'none';
            document.getElementById(arrIds[1]).style.display = 'block';
            $scope.focusOnId(arrIds[1]);
            $scope.currentVisibleCounter = $scope.ns.Input.INPUT_1_MEDIUM;
        };

        $scope.toggleVisibilityTo2 = function() {
            document.getElementById(arrIds[0]).style.display = 'none';
            document.getElementById(arrIds[1]).style.display = 'none';
            document.getElementById(arrIds[2]).style.display = 'block';
            $scope.currentVisibleCounter = $scope.ns.Input.INPUT_2_CKE;
            setTimeout(function(){ $scope.focusOnId(arrIds[2]); }, 300);
            setTimeout(function(){ $scope.focusOnId(arrIds[2]); }, 600);
        };


        //alert ('defining eventClickedTheAnimals ');

        $scope.eventBlur0InputText = function () {
            $scope.prop0Input();

        };

        $scope.eventBlur1Medium = function () {

            $scope.prop1Medium();
        };


        $scope.eventBlur2cke = function () {

            $scope.prop2Cke();
        };


        $scope.alerthk = function () {

            alert ('in alerthk:' );
        };

        $scope.propagateTextChanges = function()
        {
            try {
                $scope.count++;
                O.o('in propagateTextChanges:' + propagateTextChanges);
                //O.o('in onKeyUp1:'+$scope.count);
                //O.o('in onKeyUp $scope.inputbind:'+$scope.inputbind);

                // 0 input text
                if ($scope.currentVisibleCounter % arrIds.length === 0)
                {
                    prop0Input();
                }
                // 1 medium mmmm
                else if ($scope.currentVisibleCounter % arrIds.length === 1)
                {
                    prop1Medium();
                }
                // 2 cke
                else if ($scope.currentVisibleCounter % arrIds.length === 2)
                {
                    prop2Cke();
                } else{
                    alert ('fail!!');
                }
                window.document.title = 'jp:'+$scope.mmmm.element.innerText; // not jpro:

                //tinyMCE.activeEditor.setContent($scope.inputbind);

                // had trouble with the set on mce - killed it for now
                //var x = tinyMCE.get('idTinyMceTextArea').getContent();;
                //O.o('current mce :' + x )
                //tinyMCE.get('idTinyMceTextArea').setContent($scope.inputbind);;


                //var x = document.getElementById('idInput0TypeText').innerText

                //O.o('in onKeyUp2 set title to ============ ['+x + ']');


                //O.o('in onKeyUp:'+$scope.count)
                //var inputText = $scope.mmmm.element.innerText; // medium
                ////console.log ('inkey onKeyUp index t [' + t + ']' );
                //
                //if (inputText.length > 1)
                //{
                //    if (inputText[inputText.length-1].charCodeAt(0) === 10)
                //    {
                //        //alert       ('enter detected');
                //        $scope.searchhk(inputText);
                //    }
                //    //console.log('t-1:' + t[t.length-1])
                //    //console.log('t-1:' + t[t.length-1].charCodeAt(0))
                //    //console.log('t-2:' + t[t.length-2])
                //    //console.log('t-2:' + t[t.length-2].charCodeAt(0))
                //    //console.log('a:' + $scope.mmmm.element.innerHTML);
                //}
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

            } catch (e) {
                alert ('e:' + e);
            }

        };





        //alert ('defined medium');

        console.log ('000000000000000000000000000000 in ustodos.client.controller init');

        //tinymce.init({
        //    selector: 'textarea'
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

        //jQuery('#edit').on('keyup', function() {
        //    alert ('hi');
        //    //$this = $(this);
        //    //$this.scrollTop(0);
        //
        //    //var contentOuterHeight = 0;
        //    //var line_height = 18;
        //    //
        //    //$('#edit *').each(function() {
        //    //    $this = $(this);
        //    //    contentOuterHeight += $this.outerHeight(true);
        //    //});
        //    //
        //    //// if (contentOuterHeight == 0) {
        //    //// when there are no elements, just text, add one line-height
        //    //contentOuterHeight += line_height;
        //    //// }
        //    //$('#edit').height(contentOuterHeight);
        //    //
        //    //$('#edit_container').scrollTop(0);
        //});

        var o = O.o;

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
            this.searchhk(this.commandFromInputBox);
        };

        $scope.eventMouseoverRow = function(i) {
            //console.log ('in eventMouseoverRow ' + i);
            var x = document.getElementById('ustodorow'+i);
            //var x = angular.element('ustodorow'+i);
            //console.log ('in eventMouseoverRow x.innerText:' + x.innerText);
            $scope.commandFromInputBox = x.innerText;
            //elem.contentEditable = false;
            //console.log ('in eventMouseoverRow set this.commandFromInputBox :' + x.innerText);
        };

        // set text shown for mouseover
        $scope.setTextInShowingEditor = function(e) {
            try {
                switch($scope.whichInputIsInFocus())
                {
                    case $scope.ns.Input.INPUT_0_TEXT:
                        document.getElementById('idInput0TypeText').value = e.innerText;
                        break;
                    case $scope.ns.Input.INPUT_1_MEDIUM:
                        $scope.mmmm.element.innerHTML = e.innerHTML;
                        break;
                    case $scope.ns.Input.INPUT_2_CKE:
                        CKEDITOR.instances.idCkeEditorTextarea.setData(e.innerHTML);
                        break;
                    default:
                        alert ('era - bad input resolution');
                }
            } catch (e) {
                alert ('era:' + e);
            }
        };

        $scope.eventMouseoverRow2 = function(i) {
            //console.log('A in eventMouseoverRow2 i:' + i);

            var x = document.getElementById('ustodorow'+i);

            $scope.setTextInShowingEditor(x);


            //console.log ('B in eventMouseoverRow x.innerText:' + x.innerText);
            //$scope.commandFromInputBox = x.innerText;
            //$scope.mmmm.element.innerHTML =  x.innerHTML;
            //tinyMCE.get('idTinyMceTextArea').setContent(x.innerHTML);

            //console.log('C in eventMouseoverRow2 i:' + i);
        };

        //$scope.buttonClickSearchClear = function() {
        //    this.commandFromInputBox = '';
        //}

        // selectId
        $scope.yyutdact = function() {
            alert ('yyutdact');
            $scope.mmmm.element.focus();
            window.getSelection().setPosition(0);
            console.log ('doneit');
        };

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
                //var finalUrl = selectedCommandUrl.replace(/%s/, this.commandFromInputBox); // change %s
                var finalUrl = selectedCommandUrl.replace(/%s/, $scope.currentValueAfterBlurText); // change %s
                //alert('going for ['+finalUrl + ']');

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
        //    if(!confirm('Are you sure you want to leave this page?')) {
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

                //'ustodorow1'
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
        //        gateway.open('GET',evt.data.load_url,true);
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
        //var html = '<div ng-repeat='m in model'>{{m.name}}</div>';
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



        //$scope.htmlString = '<a ng-href='http://hkon.net' target='_blank'>hkon.net</a>';
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
            //return 'hklinkyrtn:' + client.replace(exp,'<a href='$1'>$1</a>');
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

        $scope.searchhk = function(searchInputCommand)
        {
            $scope.searchedFor = searchInputCommand.trim();
            O.o ('in searchhk [' + searchInputCommand + ']');
            $scope.callCountSearch++;
            //o ('in search 0 this.commandFromInputBox:' + this.commandFromInputBox);
            //if (false)
            //{
            //    if ($scope.mmmm) {
            //        //var t = $scope.mmmm.element.innerText;
            //        //var t =  tinyMCE.get('idTinyMceTextArea').getContent({format : 'text'});
            //        var xText = document.getElementById('idInput0TypeText').value;
            //        //  alert ('search for :' + t)
            //        $scope.ustodos  = Ustodos.query ({q: xText});
            //        $location.search('q', xText);       // yoo bar foo bar baz
            //        window.document.title = 'jp:'+xText; // not jpro:
            //    }
            //} else
            {
                O.o ('start search');
                //this.commandFromInputBox = resolveFinalCommandBetweenUrlAndInputBox
                //    //( $location.search.q  , this.commandFromInputBox);
                //( $location.$$search.q, this.commandFromInputBox);
                //o ('in search 1 $location.$$search.q:' +  $location.$$search.q);

                //o ('in search 2 this.commandFromInputBox:' + this.commandFromInputBox);
                //window.document.title = 'jps:'+$location.$$search.q; // not jpro:
                window.document.title = 'jps:'+searchInputCommand; // not jpro:
                //alert ('$location.$$search.q:'+$location.$$search.q);
                //$location.path('/'+this.commandFromInputBox)
            //$location.search('q', this.commandFromInputBox);       // yoo bar foo bar baz
            //$scope.ustodos  = Ustodos.query ({q: this.commandFromInputBox});
            //O.o  ('completed search');
                $location.search('q', searchInputCommand);       // yoo bar foo bar baz
                $scope.ustodos  = Ustodos.query ({q: searchInputCommand});
                O.o  ('completed search');
            }

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
            //$location.skipReload().path('/newpath').replace(); // https://github.com/angular-ui/ui-router/issues/427
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

        $scope.searchhk('*');
        //O.a ('sssa2');






// <select> element displays its options on mousedown, not click.
        //        $scope.showSelectDropdown = function () { // WORKS
        //            var event;
        //            event = document.createEvent('MouseEvents');
        //            event.initMouseEvent('mousedown', true, true, window);
        //            document.getElementById('selectId').dispatchEvent(event);
        //        };
        //
// This isn't magic.
        //http://jsfiddle.net/fz2sY/39/
        $scope.runThis = function () {
        };





        //alert ('defining medium');
        $scope.mmmm = new Medium({
            element: document.getElementById('idMediumEditor'),
            modifier: 'auto',
            placeholder: '',
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
        //alert ('done defining medium');

        //
        //$scope.init =function() {
        //    tinyMCE.get('idTinyMceTextArea').setContent('<span>some1</span> html');
        //}
        //



    }
]).directive('myCustomer', function() {
    return {
        //templateUrl: function(elem, attr){
        //    return 'customer-'+attr.type+'.html';
        template: function(elem, attr){

            console.log ('in mycustomer directive ==================================');
            //return 'ggggggggggghhhhhhhhhhhhhh';
            return 'ustodo text: <a href=>';
            //http:\/\/applex.com' target='_blank'>http:\/\/applex.com<\/a>';

        }
};})

    .directive('autoFocus', function($timeout) {
        console.log('fffffffffffffffffffffffffff');
        return {
            restrict: 'AC',
            link: function(_scope, _element) {
                $timeout(function(){
                    _element[0].focus();
                }, 0);
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
    //        //    template: 'this is home. go to <a href='/about'/>about</a>'
    //        //});
    //        //$routeProvider.when('/about', {
    //        //    template: 'this is about. go to <a href='/'/>home</a'
    //        //});
    //    }
    //])
    ////.config(function($locationProvider ) {
    ////    $locationProvider.html5Mode(true);
    ////    //$routeProvider.otherwise({redirectTo: '/home', controller: HomeCtrl});
    ////})
    .directive('onFinishRender', function ($timeout) {
        O.a('sss2');
        alert ('done onload');
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
        };
    });

//window.onload = function()
//{
    //alert ('onload ');
    //CKEDITOR.replace( 'editor1' );
    //CKEDITOR.instances.editor1.on('blur', function() {
    //    alert('onblur fired');
    //});
//};


//alert ('done onload');




/**
 * Created by henryms on 4/4/2015.
 */

//var UtilClientEditorResolver = require('C:/utd/141213UtdV6/public/util/client/UtilClientEditorResolver.js');
//
//var setTextInShowingEditor = function(e) {
//    try {
//
//
//        switch($scope.whichInputIsInFocus())
//        {
//            case $scope.ns.Input.INPUT_0_TEXT:
//                if (UtilJsTypeDetect.isString(e))
//                    document.getElementById('idInput0TypeText').value = e;
//                else
//                    document.getElementById('idInput0TypeText').value = e.innerText;
//                break;
//            case $scope.ns.Input.INPUT_1_MEDIUM:
//                if (UtilJsTypeDetect.isString(e))
//                    alert('logic error - setting Medium rich editor with string [' + e + '] leaving at prior value');
//                else
//                    $scope.mmmm.element.innerHTML = e.innerHTML;
//                break;
//            case $scope.ns.Input.INPUT_2_CKE:
//                if (UtilJsTypeDetect.isString(e))
//                    alert('logic error - setting CKE rich editor with string [' + e + '] leaving at prior value');
//                else
//                    CKEDITOR.instances.idCkeEditorTextarea.setData(e.innerHTML);
//                break;
//            default:
//                alert ('era - bad input resolution');
//        }
//    } catch (e) {
//        alert ('era:' + e);
//    }
//};
//
//
//if (typeof exports !== 'undefined') {
//    exports.setTextInShowingEditor = setTextInShowingEditor;
//}
//

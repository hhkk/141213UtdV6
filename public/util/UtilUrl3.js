'use strict';
'use strict';

/**
 * UtilUrl -
 * 1) get titles from url
 */
/**
 * Created with IntelliJ IDEA.
 * User: hkon
 * Date: 3/3/13
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */
//var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var unirest = require('unirest');

var request = unirest.get('http://www.jpro.co');
request.timeout(1000);
request.end(function (res) {

    //O.o ('res:' + res.body)
    var title = findTitle_htmlParse(res.body);
    O.o ('title:' + title)


});


var findTitle_htmlParse = function(html) {
    //O.o ('search for title in [' + html + ']')
    var titletag = "<title>"
    var iTitle = html.toLowerCase().indexOf(titletag)
    var iTitleEnd = html.toLowerCase().indexOf("</title>")
    var title = null;
    if (iTitle === -1 || iTitleEnd === -1)
    {
        return null;
    }
    else
    {
        //O.o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
        return html.slice(iTitle+7,iTitleEnd).trim();
    }
}




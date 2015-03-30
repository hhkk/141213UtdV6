
//var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
var UtilHtmlHref = require('C:/utd/141213UtdV6/public/util/UtilHtmlHref.js');

var fixUrlsInTextIncludingTitleFetchFromWeb = function(command)
{
    var commandOriAndToReplaceIn = command;
    command = command.replaceAll("\t", " ")
    command = command.replaceAll("\r", " ")
    command = command.replaceAll("\n", " ")
    var arrSpaceDelim = command.split(" ")
    for (var i = 0; i < arrSpaceDelim .length; i++)
    {
        if ((arrSpaceDelim [i].indexOf(".") >= 0||
                arrSpaceDelim [i].indexOf(".") >= 0) &&
                    UtilHtmlHref.isUrl(arrSpaceDelim [i], true))
        {
            //O.o("found url:" + arr[i])
            var url = arrSpaceDelim[i].trim();
            if (!url.toLowerCase().indexOf("http") == 0)
                url = "http://" + url
            var title = UtilUrl.getUrlTitle(url);
            commandOriAndToReplaceIn = commandOriAndToReplaceIn.replace(url, "[" + title + "] " +  url)
        }
    }
    return commandOriAndToReplaceIn;
}

var UtilString = require('C:/utd/141213UtdV6/public/util/UtilString.js');
console.log ('xxxx:' + fixUrlsInTextIncludingTitleFetchFromWeb ('xi there hk http://www.apple.com '));


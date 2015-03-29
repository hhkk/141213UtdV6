
        //https://www.npmjs.com/package/xmlhttprequest


var o = function(s) {
    console.log ('s:' + s)
}

var getUrlTitle = function(url) {

    try {
        // XMLHttpRequest populate responseXML
        var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();
        o ('111111111111111');
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                o ('2222222222222a');
                //o('xmlhttp.responseText:' + xmlhttp.responseText);

                o('xmlhttp.responseXML:' + xmlhttp.responseXML);
                //o('xmlDoc:' + xmlDoc);
                var html = xmlhttp.responseText;
                var titletag = "<title>"
                var iTitle = html.toLowerCase().indexOf(titletag)
                var iTitleEnd = html.toLowerCase().indexOf("</title>")
                if (iTitle === -1 || iTitleEnd === -1) {
                    return "no title"
                }
                else {
                    o ('html.slice(iTitle+7,iTitleEnd-1).trim() ['+html.slice(iTitle+7,iTitleEnd-1).trim() + ']');
                    return html.slice(iTitle+7,iTitleEnd).trim();
                }
                o('html[iTitle+7..iTitleEnd-1].trim():'+ html[iTitle+7..iTitleEnd-1].trim());
                return html[iTitle+7..iTitleEnd-1].trim();

                //var parser = new DOMParser();
                //var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
            } else {
                o ('2222222222222b');
            }
        }
        o ('33333333333');
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        o ('444444444444');
        o('xmlhttp.responseText [' + xmlhttp.responseText + ']');
        return xmlhttp.responseText;
        //return ('xmlHttp.responseText:'+xmlhttp.responseText);
    } catch (e) {
        o('erra:' + e);
    }
}


try
{
    o ('aaaaaaaaaaaaa');
    var t = getUrlTitle("http://www.ibm.com/us/en/");
    o ('bbbbbbbbbbbbbbb');
    //var t = getUrl("127.0.0.1:3000/hk/150327HttpHtmlUrlReadContentTest/150327HttpHtmlUrlReadContentTest.html");
    //var t = getUrl("jpro.co/hk/150327HttpHtmlUrlReadContentTest/150327HttpHtmlUrlReadContentTest.html");
    o (t);
    o ('cccccccccccc');

    //var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open("GET", 'http://www.ibm.com/us/en/', false);
    //xmlHttp.send(null);
    ////xmlHttp.responseText;
    ////this.responseXML && this.responseXML.title
    ////setTimeout(function(){ console.log ('x:'+xmlHttp.responseText); }, 3000);
    //console.log ('\r\n\r\n1 xmlHttp.responseText:'+xmlHttp.responseText);
    //console.log ('\r\n\r\n2 xmlHttp.responseXML:'+xmlHttp.responseXML);
    //console.log ('\r\n\r\n3 xmlHttp.responseXML.title:'+xmlHttp.responseXML.title);
    //
    //xmlHttp.onreadystatechange = function() {
    //    console.log ('xxxxxx');
    //    //if (this.readyState == 4 && !done) {
    //    //    done = true;
    //    //    callback(!!(this.responseXML && this.responseXML.title && this.responseXML.title == "&&<"));
    //    //}
    //}
    //console.log ('x:'+xmlHttp.responseText);
    //console.log('xmlHttp.responseText:' + x);
} catch (e) {
    console.log ('err:' + e);
}
console.log('done');

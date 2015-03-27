'use strict';

exports.get = function(req, res)
{

    console.log ('req.q:' + req.q);

    var urlStruct = {};
    urlStruct.title = "hihk2";
    res.jsonp(urlStruct);

}



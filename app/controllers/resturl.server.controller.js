'use strict';

exports.get = function(req, res)
{

    console.log ('>>>>>>>>>>>>>>>>>> req.query.q:' + req.query.q);
    var UtilUrl = require('C:/utd/141213UtdV6/public/util/UtilUrl.js');
    var O = require('C:/utd/141213UtdV6/public/util/O.js');
    //
    //
    //
    //
    //
    //
    //if (err) {
    //    return res.status(400).send({
    //        message: errorHandler.getErrorMessage(err)
    //    });
    //} else {
    //    res.jsonp(rawrecords);
    //}
    //
    //
    //
    //
    //
    //

    var title = UtilUrl.getUrlTitle(req.query.q, res)

}



'use strict';


// var ustodos.controller.helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');
//processCommandReadPortion

var HrefThisText = require('C:/utd/141213UtdV6/public/util/HrefThisText.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');

exports.processCommandReadPortion = function(Ustodo, querystringTrimmed, req, errorHandler, res) {

    O.o (' in processCommandReadPortion ');

    //var regexp = new RegExp(query.querystring);
    var regexp = new RegExp(querystringTrimmed.toLowerCase(), 'i');

    //console.log ('UtilClass.getClass(regexp):'+ UtilClass.getClass(regexp));
    var querymongo = {text:regexp};

    //var querymongo = {text:'/'+query.querystring+'/'};
    //{ "$regex": '/europe/', "$options": 'i'}

    var hklimit = 100; // 50 100 200 500 1000
    var countResult = 0;
    var x = [];

    console.log ('step: querymongo') ;
    //Ustodo.find().exec(function(err, ustodos) {
    Ustodo.find(querymongo).sort('-datelastmod').limit(hklimit).populate('user', 'displayName').exec(function(err, ustodos) {
        //Ustodo.find(querymongo).populate('user', 'displayName').exec(function(err, ustodos) {
        if (err) {
            console.log ('!!!!!!!! err.toString():' + err.toString());
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)

            });
        } else {
            //if (query.querystring === '')
            //var x = ustodos.slice[0,20]
            for (var k = 0; k < (ustodos.length); k++)
            {
                //console.log ('in result loop');
                countResult = countResult + 1;
                //ustodos[k].text = 'svr2,' + ustodos[k].text;
                ustodos[k].text = HrefThisText.hrefThisText(ustodos[k].text);
                x.push(ustodos[k]);

            }
            //console.log('pushed:'+ustodos[k]._doc.datelastmod + "." + +ustodos[k]._doc.datelastmod);
            console.log('for query [' + req.query.q + '] countResult [' + countResult + '] req._passport.session.user id [' + req._passport.session.user + ']');
            res.jsonp(x);

            //res.jsonp(ustodos);
            //else
            //res.jsonp(ustodos.slice[0,20]);
        }
    });

};

'use strict';


// var ustodos.controller.helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');
//processCommandReadPortion

var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');


var parseUserInputStringCreateMongoQuery = function(querystringTrimmed)
{
    var queryTokens = (querystringTrimmed.toLowerCase()).split(/\s+/); //input.split(/(\s*,?\s*)+/)

    O.o ('########## queryTokens.length:' + queryTokens.length);

    var querymongo = null;
    if (queryTokens.length > 2) {
        O.o ('########## queryTokens threeup [0]:' + queryTokens[0]);
        O.o ('########## queryTokens threeup [1]:' + queryTokens[1]);
        O.o ('########## queryTokens threeup [2]:' + queryTokens[2]);
        var re0 = new RegExp(queryTokens[0], 'i');
        var re1 = new RegExp(queryTokens[1], 'i');
        var re2 = new RegExp(queryTokens[2], 'i');
        querymongo = {$or: [{text:re0}, {text:re1}, {text:re2}]};
    }
    else if (queryTokens.length > 1) {
        O.o ('########## queryTokens two case [0]:' + queryTokens[0]);
        O.o ('########## queryTokens two case [1]:' + queryTokens[1]);
        var rea = new RegExp(queryTokens[0], 'i');
        var reb = new RegExp(queryTokens[1], 'i');
        querymongo = {$or: [{text:rea}, {text:reb}]};
    }
    else {
        O.o ('########## queryTokens one case [0]:' + queryTokens[0]);
        //var rex = new RegExp(queryTokens[0], "i");
        //querymongo = {text:rex};
        //var sClassrex = UtilClass.getClass(rex);
        //O.o ('sClassHK rex :' + sClassrex);

        querymongo = {text:new RegExp(queryTokens[0], 'i')};    // works but not case ins
        //querymongo = {text:queryTokens[0]}; // no work as case or substring
        //querymongo = {text:/queryTokens[0]/}; // no work at all
        //querymongo = {text:/queryTokens[0]/}; // no work
        //querymongo = {text:/queryTokens[0]/i}; // no work

        // {$regex: new RegExp('^' + username.toLowerCase(), 'i')}

    }

    //console.log ('UtilClass.getClass(regexp):'+ UtilClass.getClass(regexp));

    //var querymongo = {text:'/'+query.querystring+'/'};
    //{ "$regex": '/europe/', "$options": 'i'}

    O.o ('@@@@@@@@@@@@@ JSON.stringify(querymongo) querystringTrimmed [' + querystringTrimmed + '] [' + JSON.stringify(querymongo) + ']');
    return querymongo;

}







exports.processCommandReadPortion = function(Ustodo, querystringTrimmed, req, errorHandler, res) {

    O.o (' in processCommandReadPortion ');

    //var regexp = new RegExp(query.querystring);
    //var regexp = new RegExp(querystringTrimmed.toLowerCase(), 'i');
    //var querymongo = {text:regexp};

    //var queryTokens = (querystringTrimmed.toLowerCase()).split(' '); //

    var queryTokens = (querystringTrimmed.toLowerCase()).split(/\s+/); //input.split(/(\s*,?\s*)+/)
    var querymongo = parseUserInputStringCreateMongoQuery(querystringTrimmed);

    var hklimit = 100; // 50 100 200 500 1000
    var countResult = 0;
    var x = [];

    O.o('step: querymongo:' + querymongo) ;
    //Ustodo.find().exec(function(err, ustodos) {
    var sClass = UtilClass.getClass(Ustodo);
    O.o ('sClassHK ustodo:' + sClass);
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
            for (var k = 0; k < (ustodos.length) && x.length < hklimit; k++)
            {
                //console.log ('in result loop');
                countResult = countResult + 1;
                //ustodos[k].text = 'svr2,' + ustodos[k].text;
                var tt = UtilHrefThisText.hrefThisText(ustodos[k].text);
                var keeper = true;
                for (var i = 0; i < queryTokens.length; i++) {
                    if (tt.indexOf(queryTokens[i]) < 0) {
                        keeper = false;
                        break;
                    }
                }
                if (keeper) {
                    // convert to HREFs
                    ustodos[k].text = UtilHrefThisText.hrefThisText(ustodos[k].text);
                        x.push(ustodos[k]);
                }
            }
            //console.log('pushed:'+ustodos[k]._doc.datelastmod + "." + +ustodos[k]._doc.datelastmod);
            O.o ('for query [' + req.query.q + '] countResult [' + countResult + '] req._passport.session.user id [' + req._passport.session.user + ']');
            res.jsonp(x);

            //res.jsonp(ustodos);
            //else
            //res.jsonp(ustodos.slice[0,20]);
        }
    });

};

var test = false;
if (test) {
    parseUserInputStringCreateMongoQuery  ('hi mom');
}

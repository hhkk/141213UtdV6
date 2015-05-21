'use strict';


// var ustodos.controller.helper = require('C:/utd/141213UtdV6/app/controllers/helpers/ustodos.controller.helper.js');
//processCommandReadPortion

var UtilHrefThisText = require('C:/utd/141213UtdV6/public/util/UtilHrefThisText.js');
var O = require('C:/utd/141213UtdV6/public/util/O.js');
var UtilClass = require('C:/utd/141213UtdV6/public/util/UtilClass.js');


var parseUserInputStringCreateMongoQuery = function(querystringTrimmed)
{
    var queryTokens = (querystringTrimmed.toLowerCase()).split(/\s+/); //input.split(/(\s*,?\s*)+/)

    //O.o ('########## queryTokens.length:' + queryTokens.length);

    var querymongo = null;

    var arrRegExpsToOr = [];
    for (var i = 0; i < queryTokens.length; i++)
    {

        try {
            var re = new RegExp(queryTokens[0], 'i')
            arrRegExpsToOr.push ({text:re});
            //[{text:rea}, {text:reb}]
        } catch (e) {

        }
        if (arrRegExpsToOr.length > 4) // keep only n for the mongo query, the rest we will constrain for
            break;
    }

    querymongo = {$or: arrRegExpsToOr};

    //var rex = new RegExp(queryTokens[0], "i");
    //querymongo = {text:rex};
    //var sClassrex = UtilClass.getClass(rex);
    //O.o ('sClassHK rex :' + sClassrex);

    // 1
    //var  yhk = new RegExp(queryTokens[0], 'i');
    //querymongo = {text:yhk};    // works but not case ins

    //var y = new RegExp(queryTokens[0], 'i');

    //var t = 'thorx';
    //var v = 'thorx';
    //if (t === v) {
    //    console.log ('11&&&&&&&&&&&&&&&&&& same hk u:' + u);
    //}  else {
    //    console.log ('11&&&&&&&&&&&&&&&&&& not same hku:' + u);
    //}
    //var u = queryTokens[0];
    //if (t === u) {
    //    console.log ('22&&&&&&&&&&&&&&&&&& same hk u:' + u);
    //}  else {
    //    console.log ('22&&&&&&&&&&&&&&&&&& not same hku:' + u);
    //}
    //
    //var y = new RegExp(t, 'i');


    // 2 etc
    //querymongo = {text:y};    // works but not case ins



    //var w = 'thorx'
    //var w = queryTokens[0];
    //var wp = new RegExp(w, 'i');
    //var queryw = {text:wp}; // works


    // 3 etc
    //querymongo = {text:queryTokens[0]}; // no work as case or substring
    //querymongo = {text:/queryTokens[0]/}; // no work at all
    //querymongo = {text:/queryTokens[0]/}; // no work
    //querymongo = {text:/queryTokens[0]/i}; // no work

    // {$regex: new RegExp('^' + username.toLowerCase(), 'i')}

    //console.log ('UtilClass.getClass(regexp):'+ UtilClass.getClass(regexp));

    //var querymongo = {text:'/'+query.querystring+'/'};
    //{ "$regex": '/europe/', "$options": 'i'}

    O.o ('@@@@@@@@@@@@@ JSON.stringify(querymongo) querystringTrimmed [' + querystringTrimmed + '] [' + JSON.stringify(querymongo) + ']');
    //return querymongo;
    return querymongo ;

}







exports.processCommandReadPortion = function(Ustodo, querystringTrimmed, req, errorHandler, res) {

    O.o (' in processCommandReadPortion ');

    //var regexp = new RegExp(query.querystring);
    //var regexp = new RegExp(querystringTrimmed.toLowerCase(), 'i');
    //var querymongo = {text:regexp};

    //var queryTokens = (querystringTrimmed.toLowerCase()).split(' '); //

    var queryTokens = (querystringTrimmed.toLowerCase()).split(/\s+/); //input.split(/(\s*,?\s*)+/)
    var querymongo = parseUserInputStringCreateMongoQuery(querystringTrimmed);

    var hklimit = 500; // 50 100 200 500 1000
    var countResult = 0;
    var x = [];

    //O.o('step: querymongo:' + querymongo) ;
    //Ustodo.find().exec(function(err, ustodos) {
    //var sClass = UtilClass.getClass('Ustodo', Ustodo);
    //O.o ('sClassHK ustodo:' + sClass);
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
            // console.log ('&&&&&&&&&&&&&&&&&&& pre result loop');
            for (var k = 0; k < (ustodos.length) && x.length < hklimit; k++)
            {
                //console.log ('&&&&&&&&&&&&&&&&&&& in result loop');
                countResult = countResult + 1;
                //ustodos[k].text = 'svr2,' + ustodos[k].text;
                var tt = UtilHrefThisText.hrefThisText(ustodos[k].text);
                var keeper = true;
                for (var i = 0; i < queryTokens.length; i++) {
                    //console.log ('&&&&&&&&&&&&&&&&&&& in result loop tt [' + tt + '] queryTokens[i] [' + queryTokens[i] + ']');
                    if (tt.toLowerCase().indexOf(queryTokens[i]) < 0) {
                        keeper = false;
                        break;
                    }
                }
                if (keeper) {
                    //O.o ('&&&&&&&&&&&&&&&&&&& in result loop a keeper' );
                    // convert to HREFs
                    ustodos[k].text = UtilHrefThisText.hrefThisText(ustodos[k].text);
                        x.push(ustodos[k]);
                } else {
                    O.o ('&&&&&&&&&&&&&&&&&&& in result loop NOT a keeper' );

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

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Session = Package.session.Session;
var _ = Package.underscore._;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var EJSON = Package.ejson.EJSON;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var check = Package.check.check;
var Match = Package.check.Match;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Style, Collection;

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/clinical_extended-api/packages/clinical_extended-api.js        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/clinical:extended-api/client/session-extended-api.js     //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
/**                                                                  // 1  // 9
 * @summary Toggles a boolean session variable true/false.           // 2  // 10
 * @locus Client                                                     // 3  // 11
 * @memberOf Session                                                 // 4  // 12
 * @name toggle                                                      // 5  // 13
 * @version 1.2.3                                                    // 6  // 14
 * @example                                                          // 7  // 15
 * ```js                                                             // 8  // 16
 *   Session.toggle('isSidebarVisible');                             // 9  // 17
 * ```                                                               // 10
 */                                                                  // 11
                                                                     // 12
Session.toggle = function (session_variable) {                       // 13
  if (Session.get(session_variable) === undefined) {                 // 14
    Session.set(session_variable, undefined);                        // 15
  } else if (Session.get(session_variable) === null) {               // 16
    Session.set(session_variable, null);                             // 17
  } else if (Session.get(session_variable) === true) {               // 18
    Session.set(session_variable, false);                            // 19
  } else if (Session.get(session_variable) === false) {              // 20
    Session.set(session_variable, true);                             // 21
  }                                                                  // 22
  return true;                                                       // 23
};                                                                   // 24
                                                                     // 25
/**                                                                  // 26
 * @summary Clears a session variable.                               // 27
 * @locus Client                                                     // 28
 * @memberOf Session                                                 // 29
 * @name clear                                                       // 30
 * @version 1.2.3                                                    // 31
 * @example                                                          // 32
 * ```js                                                             // 33
 *   Session.clear('activePatient');                                 // 34
 * ```                                                               // 35
 */                                                                  // 36
                                                                     // 37
Session.clear = function (session_variable) {                        // 38
  Session.set(session_variable, null);                               // 39
  return true;                                                       // 40
};                                                                   // 41
Session.remove = function (session_variable) {                       // 42
  Session.set(session_variable, undefined);                          // 43
  return true;                                                       // 44
};                                                                   // 45
                                                                     // 46
Session.setAll = function (object) {                                 // 47
  console.log('object', object);                                     // 48
                                                                     // 49
  for (var key in object) {                                          // 50
    if (object.hasOwnProperty(key)) {                                // 51
      console.log(key + " = " + object[key]);                        // 52
      Session.set(key, object[key]);                                 // 53
    }                                                                // 54
  }                                                                  // 55
  return true;                                                       // 56
};                                                                   // 57
                                                                     // 58
///////////////////////////////////////////////////////////////////////    // 67
                                                                           // 68
}).call(this);                                                             // 69
                                                                           // 70
                                                                           // 71
                                                                           // 72
                                                                           // 73
                                                                           // 74
                                                                           // 75
(function () {                                                             // 76
                                                                           // 77
///////////////////////////////////////////////////////////////////////    // 78
//                                                                   //    // 79
// packages/clinical:extended-api/lib/Style.js                       //    // 80
//                                                                   //    // 81
///////////////////////////////////////////////////////////////////////    // 82
                                                                     //    // 83
Style = {};                                                          // 1  // 84
                                                                     // 2  // 85
                                                                     // 3  // 86
/**                                                                  // 4  // 87
 * @summary Serializes a json object into a text string.             // 5  // 88
 * @locus Anywhere                                                   // 6  // 89
 * @memberOf Style                                                   // 7  // 90
 * @return {String}                                                  // 8  // 91
 * @name parse                                                       // 9  // 92
 * @example                                                          // 10
 * Template.foo.helpers({                                            // 11
 *   getPageWidth: function(){                                       // 12
 *     return Style.parse({                                          // 13
 *       "width": "80%",                                             // 14
 *       "padding-left": "80%",                                      // 15
 *       "padding-right": "80%"                                      // 16
 *     });                                                           // 17
 *   }                                                               // 18
 * });                                                               // 19
 */                                                                  // 20
                                                                     // 21
                                                                     // 22
Style.parse = function (json) {                                      // 23
  var result = "";                                                   // 24
  $.each(json, function (key, val, index) {                          // 25
    result = result + key + ":" + val;                               // 26
    if (index !== 0) {                                               // 27
      result = result + ";";                                         // 28
    }                                                                // 29
  });                                                                // 30
  return result;                                                     // 31
};                                                                   // 32
                                                                     // 33
///////////////////////////////////////////////////////////////////////    // 117
                                                                           // 118
}).call(this);                                                             // 119
                                                                           // 120
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:extended-api'] = {}, {
  Session: Session,
  Collection: Collection,
  Style: Style
});

})();

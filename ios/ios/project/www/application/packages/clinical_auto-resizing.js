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
var Template = Package.templating.Template;
var Session = Package.session.Session;
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
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/clinical_auto-resizing/packages/clinical_auto-resizing.js      //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/clinical:auto-resizing/lib/resizing.js                   //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
Session.setDefault('resize', new Date());                            // 1  // 9
Session.setDefault('appHeight', $(window).height());                 // 2  // 10
Session.setDefault('appWidth', $(window).width());                   // 3  // 11
                                                                     // 4  // 12
Meteor.startup(function () {                                         // 5  // 13
  window.addEventListener('resize', function () {                    // 6  // 14
    Session.set("resize", new Date());                               // 7  // 15
    Session.set("appHeight", $(window).height());                    // 8  // 16
    Session.set("appWidth", $(window).width());                      // 9  // 17
  });                                                                // 10
});                                                                  // 11
                                                                     // 12
                                                                     // 13
Template.registerHelper('resize', function () {                      // 14
  return Session.get('resize');                                      // 15
});                                                                  // 16
Template.registerHelper('isPortrait', function () {                  // 17
  if (Session.get('appHeight') > Session.get('appWidth')) {          // 18
    return true;                                                     // 19
  } else {                                                           // 20
    return false;                                                    // 21
  }                                                                  // 22
});                                                                  // 23
Template.registerHelper('isLandscape', function () {                 // 24
  if (Session.get('appHeight') < Session.get('appWidth')) {          // 25
    return true;                                                     // 26
  } else {                                                           // 27
    return false;                                                    // 28
  }                                                                  // 29
});                                                                  // 30
                                                                     // 31
///////////////////////////////////////////////////////////////////////    // 40
                                                                           // 41
}).call(this);                                                             // 42
                                                                           // 43
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['clinical:auto-resizing'] = {};

})();

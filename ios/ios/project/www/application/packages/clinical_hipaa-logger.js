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
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
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

/* Package-scope variables */
var HipaaLog, HipaaLogger;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/clinical_hipaa-logger/packages/clinical_hipaa-logger.js  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/clinical:hipaa-logger/lib/HipaaLog.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
HipaaLog = new Mongo.Collection("HipaaLog");                                                                           // 2
                                                                                                                       // 3
HipaaLog.allow({                                                                                                       // 4
  insert: function (userId, doc) {                                                                                     // 5
    // we can only write to the audit log if we're logged in                                                           // 6
    if (userId) {                                                                                                      // 7
      return true;                                                                                                     // 8
    } else {                                                                                                           // 9
      return false;                                                                                                    // 10
    }                                                                                                                  // 11
  },                                                                                                                   // 12
  update: function (userId, doc, fields, modifier) {                                                                   // 13
    // the audit log is write-only                                                                                     // 14
    return false;                                                                                                      // 15
  },                                                                                                                   // 16
  remove: function (userId, doc) {                                                                                     // 17
    // the audit log is write-only                                                                                     // 18
    return false;                                                                                                      // 19
  }                                                                                                                    // 20
  // fetch: function(userId){                                                                                          // 21
  //   return true;                                                                                                    // 22
  // }                                                                                                                 // 23
});                                                                                                                    // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 35
}).call(this);                                                       // 36
                                                                     // 37
                                                                     // 38
                                                                     // 39
                                                                     // 40
                                                                     // 41
                                                                     // 42
(function () {                                                       // 43
                                                                     // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/clinical:hipaa-logger/lib/HipaaLogger.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
var hipaaEvent = {                                                                                                     // 2
  eventType: "",                                                                                                       // 3
  userId: "",                                                                                                          // 4
  userName: "",                                                                                                        // 5
  collectionName: "",                                                                                                  // 6
  recordId: "",                                                                                                        // 7
  patientId: "",                                                                                                       // 8
  patientName: "",                                                                                                     // 9
  message: ""                                                                                                          // 10
};                                                                                                                     // 11
*/                                                                                                                     // 12
                                                                                                                       // 13
                                                                                                                       // 14
HipaaLogger = {                                                                                                        // 15
                                                                                                                       // 16
  /**                                                                                                                  // 17
  * @summary Detects if a specific environment variable was exposed from the server.                                   // 18
  * @locus Client                                                                                                      // 19
  * @memberOf HipaaLogger                                                                                              // 20
  * @name logEvent                                                                                                     // 21
  * @param hipaaEvent.eventType                                                                                        // 22
  * @param hipaaEvent.userId                                                                                           // 23
  * @param hipaaEvent.userName                                                                                         // 24
  * @param hipaaEvent.collectionName                                                                                   // 25
  * @param hipaaEvent.recordId                                                                                         // 26
  * @param hipaaEvent.patientId                                                                                        // 27
  * @param hipaaEvent.patientName                                                                                      // 28
  * @param hipaaEvent.message                                                                                          // 29
  * @version 1.2.3                                                                                                     // 30
  * @example                                                                                                           // 31
  * ```js                                                                                                              // 32
  * var hipaaEvent = {                                                                                                 // 33
  *   eventType: "modified",                                                                                           // 34
  *   userId: Meteor.userId(),                                                                                         // 35
  *   userName: Meteor.user().profile.fullName,                                                                        // 36
  *   collectionName: "Medications",                                                                                   // 37
  *   recordId: Random.id(),                                                                                           // 38
  *   patientId: Session.get('currentPatientId'),                                                                      // 39
  *   patientName: Session.get('currentPatientName')                                                                   // 40
  * };                                                                                                                 // 41
  * HipaaLogger.logEvent(hipaaEvent);                                                                                  // 42
  * ```                                                                                                                // 43
  */                                                                                                                   // 44
  logEvent: function(hipaaEvent, userId, userName, collectionName, recordId, patientId, patientName, message){         // 45
    //console.log('logEvent', eventType, userId, userName, collectionName, recordId, patientId, patientName, message); // 46
                                                                                                                       // 47
    var newHipaaRecord = {};                                                                                           // 48
    var hipaaRecordId = null;                                                                                          // 49
                                                                                                                       // 50
    if( typeof hipaaEvent === 'object'){                                                                               // 51
      newHipaaRecord = hipaaEvent;                                                                                     // 52
    }else{                                                                                                             // 53
      newHipaaRecord.eventType = hipaaEvent;                                                                           // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    //if(Meteor.isServer){                                                                                             // 57
      newHipaaRecord.timestamp = new Date();                                                                           // 58
    //}                                                                                                                // 59
                                                                                                                       // 60
    if(userId){                                                                                                        // 61
      newHipaaRecord.userId = userId;                                                                                  // 62
    }                                                                                                                  // 63
    if(userName){                                                                                                      // 64
      newHipaaRecord.userName = userName;                                                                              // 65
    }                                                                                                                  // 66
    if(recordId){                                                                                                      // 67
      newHipaaRecord.recordId = recordId;                                                                              // 68
    }                                                                                                                  // 69
    if(collectionName){                                                                                                // 70
      newHipaaRecord.collectionName = collectionName;                                                                  // 71
    }                                                                                                                  // 72
    if(message){                                                                                                       // 73
      newHipaaRecord.message = message;                                                                                // 74
    }                                                                                                                  // 75
    if(patientId){                                                                                                     // 76
      newHipaaRecord.patientId = patientId;                                                                            // 77
    }                                                                                                                  // 78
    if(patientName){                                                                                                   // 79
      newHipaaRecord.patientName = patientName;                                                                        // 80
    }                                                                                                                  // 81
                                                                                                                       // 82
    return Meteor.call("logEvent", newHipaaRecord, function (error, result){                                           // 83
      if (error){                                                                                                      // 84
        console.log("error", error);                                                                                   // 85
      }                                                                                                                // 86
      if (result){                                                                                                     // 87
         return result                                                                                                 // 88
      }                                                                                                                // 89
    });                                                                                                                // 90
  }                                                                                                                    // 91
};                                                                                                                     // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 145
}).call(this);                                                       // 146
                                                                     // 147
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:hipaa-logger'] = {}, {
  HipaaLogger: HipaaLogger,
  HipaaLog: HipaaLog
});

})();

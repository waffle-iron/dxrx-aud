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
var Mongo = Package.mongo.Mongo;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var oAuth2Server = Package['prime8consulting:meteor-oauth2-server'].oAuth2Server;
var BaseModel = Package['clinical:base-model'].BaseModel;
var AddressSchema = Package['clinical:hl7-resource-datatypes'].AddressSchema;
var AnnotationSchema = Package['clinical:hl7-resource-datatypes'].AnnotationSchema;
var AttachmentSchema = Package['clinical:hl7-resource-datatypes'].AttachmentSchema;
var Code = Package['clinical:hl7-resource-datatypes'].Code;
var QuantitySchema = Package['clinical:hl7-resource-datatypes'].QuantitySchema;
var HumanNameSchema = Package['clinical:hl7-resource-datatypes'].HumanNameSchema;
var ReferenceSchema = Package['clinical:hl7-resource-datatypes'].ReferenceSchema;
var PeriodSchema = Package['clinical:hl7-resource-datatypes'].PeriodSchema;
var CodingSchema = Package['clinical:hl7-resource-datatypes'].CodingSchema;
var CodeableConceptSchema = Package['clinical:hl7-resource-datatypes'].CodeableConceptSchema;
var IdentifierSchema = Package['clinical:hl7-resource-datatypes'].IdentifierSchema;
var ContactPointSchema = Package['clinical:hl7-resource-datatypes'].ContactPointSchema;
var GroupSchema = Package['clinical:hl7-resource-datatypes'].GroupSchema;
var ConformanceSchema = Package['clinical:hl7-resource-datatypes'].ConformanceSchema;
var RangeSchema = Package['clinical:hl7-resource-datatypes'].RangeSchema;
var RatioSchema = Package['clinical:hl7-resource-datatypes'].RatioSchema;
var SampledDataSchema = Package['clinical:hl7-resource-datatypes'].SampledDataSchema;
var SignatureSchema = Package['clinical:hl7-resource-datatypes'].SignatureSchema;
var TimingSchema = Package['clinical:hl7-resource-datatypes'].TimingSchema;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
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
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Practitioner, Practitioners, PractitionerSchema;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/clinical_hl7-resource-practitioner/lib/hl7-resource-practitioner.js                 //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
                                                                                                // 1
// create the object using our BaseModel                                                        // 2
Practitioner = BaseModel.extend();                                                              // 3
                                                                                                // 4
                                                                                                // 5
//Assign a collection so the object knows how to perform CRUD operations                        // 6
Practitioner.prototype._collection = Practitioners;                                             // 7
                                                                                                // 8
// Create a persistent data store for addresses to be stored.                                   // 9
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');                     // 10
Practitioners = new Mongo.Collection('Practitioners');                                          // 11
                                                                                                // 12
//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Practitioners._transform = function (document) {                                                // 14
  return new Practitioner(document);                                                            // 15
};                                                                                              // 16
                                                                                                // 17
                                                                                                // 18
if (Meteor.isClient){                                                                           // 19
  Meteor.subscribe("Practitioners");                                                            // 20
}                                                                                               // 21
                                                                                                // 22
if (Meteor.isServer){                                                                           // 23
  Meteor.publish("Practitioners", function (argument){                                          // 24
    if (this.userId) {                                                                          // 25
      return Practitioners.find();                                                              // 26
    } else {                                                                                    // 27
      return [];                                                                                // 28
    }                                                                                           // 29
  });                                                                                           // 30
}                                                                                               // 31
                                                                                                // 32
                                                                                                // 33
                                                                                                // 34
PractitionerSchema = new SimpleSchema({                                                         // 35
  "resourceType" : {                                                                            // 36
    type: String,                                                                               // 37
    defaultValue: "Practitioner"                                                                // 38
  },                                                                                            // 39
  "identifier" : {                                                                              // 40
    optional: true,                                                                             // 41
    type: [ IdentifierSchema ]                                                                  // 42
  },                                                                                            // 43
  "active" : {                                                                                  // 44
    optional: true,                                                                             // 45
    type: Boolean                                                                               // 46
  },                                                                                            // 47
  "name" : {                                                                                    // 48
    optional: true,                                                                             // 49
    type:  HumanNameSchema                                                                      // 50
  },                                                                                            // 51
  "telecom" : {                                                                                 // 52
    optional: true,                                                                             // 53
    type: [ ContactPointSchema ]                                                                // 54
  },                                                                                            // 55
  "address" : {                                                                                 // 56
    optional: true,                                                                             // 57
    type: [ AddressSchema ]                                                                     // 58
  },                                                                                            // 59
  "gender" : {                                                                                  // 60
    optional: true,                                                                             // 61
    type: String                                                                                // 62
  },                                                                                            // 63
  "birthDate" : {                                                                               // 64
    optional: true,                                                                             // 65
    type: Date                                                                                  // 66
  },                                                                                            // 67
  "photo" : {                                                                                   // 68
    optional: true,                                                                             // 69
    type: [ AttachmentSchema ]                                                                  // 70
  },                                                                                            // 71
  "practitionerRole.$.managingOrganization" : {                                                 // 72
    optional: true,                                                                             // 73
    type: ReferenceSchema //(Organization)                                                      // 74
  },                                                                                            // 75
  "practitionerRole.$.role" : {                                                                 // 76
    optional: true,                                                                             // 77
    type: CodeableConceptSchema                                                                 // 78
  },                                                                                            // 79
  "practitionerRole.$.specialty" : {                                                            // 80
    optional: true,                                                                             // 81
    type: [ CodeableConceptSchema ]                                                             // 82
  },                                                                                            // 83
  "practitionerRole.$.period" : {                                                               // 84
    optional: true,                                                                             // 85
    type: PeriodSchema                                                                          // 86
  },                                                                                            // 87
  "practitionerRole.$.location" : {                                                             // 88
    optional: true,                                                                             // 89
    type: [ ReferenceSchema ]                                                                   // 90
  }, // (Location) ],                                                                           // 91
  "practitionerRole.$.healthcareService" : {                                                    // 92
    optional: true,                                                                             // 93
    type: [ ReferenceSchema ]                                                                   // 94
  }, //(HealthcareService) }]                                                                   // 95
  "qualification.$.identifier" : {                                                              // 96
    optional: true,                                                                             // 97
    type: [ IdentifierSchema ]                                                                  // 98
  },                                                                                            // 99
  "qualification.$.code" : {                                                                    // 100
    optional: true,                                                                             // 101
    type: CodeableConceptSchema                                                                 // 102
  },                                                                                            // 103
  "qualification.$.period" : {                                                                  // 104
    optional: true,                                                                             // 105
    type: PeriodSchema                                                                          // 106
  },                                                                                            // 107
  "qualification.$.issuer" : {                                                                  // 108
    optional: true,                                                                             // 109
    type: ReferenceSchema                                                                       // 110
  }, // Organization)                                                                           // 111
  "communication" : {                                                                           // 112
    optional: true,                                                                             // 113
    type: [ CodeableConceptSchema ]                                                             // 114
  }                                                                                             // 115
});                                                                                             // 116
Practitioners.attachSchema(PractitionerSchema);                                                 // 117
                                                                                                // 118
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:hl7-resource-practitioner'] = {}, {
  Practitioners: Practitioners,
  PractitionerSchema: PractitionerSchema
});

})();

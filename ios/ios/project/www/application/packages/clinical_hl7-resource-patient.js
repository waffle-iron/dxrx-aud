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
var Session = Package.session.Session;
var Collection = Package['clinical:extended-api'].Collection;
var Style = Package['clinical:extended-api'].Style;
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
var Patient, Patients, PatientSchema;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/clinical_hl7-resource-patient/lib/Patients.js                                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
                                                                                                // 1
/**                                                                                             // 2
 * @summary Represents a Patient; typically documented by a clinician.  A Clinical Impression can be self-assigned, in which case it may be considered a Status or ReportedCondition.
 * @class Patient                                                                               // 4
 * @param {Object} document An object representing an impression, ususally a Mongo document.    // 5
 * @example                                                                                     // 6
newPatient = new Patient({                                                                      // 7
  name: {                                                                                       // 8
    given: "Jane",                                                                              // 9
    family: "Doe"                                                                               // 10
  },                                                                                            // 11
  gender: "female",                                                                             // 12
  identifier: "12345"                                                                           // 13
});                                                                                             // 14
                                                                                                // 15
                                                                                                // 16
newPatient.clean();                                                                             // 17
newPatient.validate();                                                                          // 18
newPatient.save();                                                                              // 19
 */                                                                                             // 20
                                                                                                // 21
                                                                                                // 22
// create the object using our BaseModel                                                        // 23
Patient = BaseModel.extend();                                                                   // 24
                                                                                                // 25
                                                                                                // 26
//Assign a collection so the object knows how to perform CRUD operations                        // 27
Patient.prototype._collection = Patients;                                                       // 28
                                                                                                // 29
// Create a persistent data store for addresses to be stored.                                   // 30
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');                     // 31
Patients = new Mongo.Collection('Patients');                                                    // 32
Patients.allow({                                                                                // 33
  insert: function () {                                                                         // 34
    return true;                                                                                // 35
  },                                                                                            // 36
  update: function () {                                                                         // 37
    return true;                                                                                // 38
  },                                                                                            // 39
  remove: function () {                                                                         // 40
    return true;                                                                                // 41
  }                                                                                             // 42
});                                                                                             // 43
                                                                                                // 44
//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Patients._transform = function (document) {                                                     // 46
  return new Patient(document);                                                                 // 47
};                                                                                              // 48
                                                                                                // 49
                                                                                                // 50
if (Meteor.isClient){                                                                           // 51
  Meteor.subscribe("Patients");                                                                 // 52
}                                                                                               // 53
                                                                                                // 54
if (Meteor.isServer){                                                                           // 55
  Meteor.publish("Patients", function (argument){                                               // 56
    return Patients.find();                                                                     // 57
  });                                                                                           // 58
}                                                                                               // 59
                                                                                                // 60
                                                                                                // 61
PatientSchema = new SimpleSchema({                                                              // 62
  "resourceType" : {                                                                            // 63
    type: String,                                                                               // 64
    defaultValue: "Patient"                                                                     // 65
  },                                                                                            // 66
  "identifier" : {                                                                              // 67
    optional: true,                                                                             // 68
    type: [ IdentifierSchema ]                                                                  // 69
    },                                                                                          // 70
  "active" : {                                                                                  // 71
    type: Boolean,                                                                              // 72
    defaultValue: true                                                                          // 73
    },                                                                                          // 74
  "name" : {                                                                                    // 75
    type: [ HumanNameSchema ]                                                                   // 76
    },                                                                                          // 77
  "telecom" : {                                                                                 // 78
    optional: true,                                                                             // 79
    type: [ ContactPointSchema ]                                                                // 80
    },                                                                                          // 81
  "gender" : {                                                                                  // 82
    optional: true,                                                                             // 83
    type: String                                                                                // 84
    },                                                                                          // 85
  "birthDate" : {                                                                               // 86
    optional: true,                                                                             // 87
    type: Date                                                                                  // 88
    },                                                                                          // 89
  "deceasedBoolean" : {                                                                         // 90
    optional: true,                                                                             // 91
    type: Boolean                                                                               // 92
    },                                                                                          // 93
  "deceasedDateTime" : {                                                                        // 94
    optional: true,                                                                             // 95
    type: Date                                                                                  // 96
    },                                                                                          // 97
  "address" : {                                                                                 // 98
    optional: true,                                                                             // 99
    type: [ String ]                                                                            // 100
    },                                                                                          // 101
  "maritalStatus" : {                                                                           // 102
    optional: true,                                                                             // 103
    type: CodeableConceptSchema                                                                 // 104
    },                                                                                          // 105
  "multipleBirthBoolean" : {                                                                    // 106
    optional: true,                                                                             // 107
    type: Boolean                                                                               // 108
    },                                                                                          // 109
  "multipleBirthInteger" : {                                                                    // 110
    optional: true,                                                                             // 111
    type: Number                                                                                // 112
    },                                                                                          // 113
  "photo" : {                                                                                   // 114
    optional: true,                                                                             // 115
    type: [ AttachmentSchema ]                                                                  // 116
    },                                                                                          // 117
  "contact.$.relationship" : {                                                                  // 118
    optional: true,                                                                             // 119
    type: [ String ]                                                                            // 120
    },                                                                                          // 121
  "contact.$.name" : {                                                                          // 122
    optional: true,                                                                             // 123
    type: HumanNameSchema                                                                       // 124
    },                                                                                          // 125
  "contact.$.telecom" : {                                                                       // 126
    optional: true,                                                                             // 127
    type: [ ContactPointSchema ]                                                                // 128
    },                                                                                          // 129
  "contact.$.address" : {                                                                       // 130
    optional: true,                                                                             // 131
    type: AddressSchema                                                                         // 132
    },                                                                                          // 133
  "contact.$.gender" : {                                                                        // 134
    optional: true,                                                                             // 135
    type: String                                                                                // 136
    },                                                                                          // 137
  "contact.$.organization" : {                                                                  // 138
    optional: true,                                                                             // 139
    type: String                                                                                // 140
    },                                                                                          // 141
  "contact.$.period" : {                                                                        // 142
    optional: true,                                                                             // 143
    type: PeriodSchema                                                                          // 144
    },                                                                                          // 145
  "animal.species" : {                                                                          // 146
    optional: true,                                                                             // 147
    type: String                                                                                // 148
    //type: CodeableConceptSchema                                                               // 149
    },                                                                                          // 150
  "animal.breed" : {                                                                            // 151
    optional: true,                                                                             // 152
    type: CodeableConceptSchema                                                                 // 153
    },                                                                                          // 154
  "animal.genderStatus" : {                                                                     // 155
    optional: true,                                                                             // 156
    type: CodeableConceptSchema                                                                 // 157
    },                                                                                          // 158
  "communication.$.language" : {                                                                // 159
    optional: true,                                                                             // 160
    type: CodeableConceptSchema                                                                 // 161
    },                                                                                          // 162
  "communication.$.preferred" : {                                                               // 163
    optional: true,                                                                             // 164
    type: Boolean                                                                               // 165
    },                                                                                          // 166
  "careProvider" : {                                                                            // 167
    optional: true,                                                                             // 168
    type: [ ReferenceSchema ]                                                                   // 169
    },                                                                                          // 170
  "managingOrganization" : {                                                                    // 171
    optional: true,                                                                             // 172
    type: String                                                                                // 173
    },                                                                                          // 174
  "link.$.other" : {                                                                            // 175
    optional: true,                                                                             // 176
    type: String                                                                                // 177
    },                                                                                          // 178
  "link.$.type" : {                                                                             // 179
    optional: true,                                                                             // 180
    type: String                                                                                // 181
    }                                                                                           // 182
});                                                                                             // 183
Patients.attachSchema(PatientSchema);                                                           // 184
                                                                                                // 185
//================================================================                              // 186
                                                                                                // 187
                                                                                                // 188
                                                                                                // 189
                                                                                                // 190
                                                                                                // 191
/**                                                                                             // 192
 * @summary The displayed name of the patient.                                                  // 193
 * @memberOf Patient                                                                            // 194
 * @name displayName                                                                            // 195
 * @version 1.2.3                                                                               // 196
 * @returns {Boolean}                                                                           // 197
 * @example                                                                                     // 198
 * ```js                                                                                        // 199
 * ```                                                                                          // 200
 */                                                                                             // 201
                                                                                                // 202
Patient.prototype.displayName = function () {                                                   // 203
                                                                                                // 204
};                                                                                              // 205
                                                                                                // 206
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:hl7-resource-patient'] = {}, {
  Patient: Patient,
  Patients: Patients,
  PatientSchema: PatientSchema
});

})();

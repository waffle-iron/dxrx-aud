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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;

/* Package-scope variables */
var AddressSchema, AnnotationSchema, AttachmentSchema, Code, CodingSchema, CodeableConceptSchema, ContactPointSchema, ConformanceSchema, GroupSchema, HumanNameSchema, IdentifierSchema, PeriodSchema, QuantitySchema, RangeSchema, ReferenceSchema, RatioSchema, SampledDataSchema, SignatureSchema, TimingSchema;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Address.js                                                  //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
/**                                                                                                         // 1
 * @summary Represents an Address                                                                           // 2
 * @class Address                                                                                           // 3
 * @param {Object} document An object representing an address, ususally a Mongo document.                   // 4
 * @example                                                                                                 // 5
                                                                                                            // 6
 // Validate an object against the schema                                                                   // 7
obj = {address: "444 Somewhere St.", zip: "13456"};                                                         // 8
                                                                                                            // 9
isValid = AddressSchema.namedContext("AddressValidator").validate(obj);                                     // 10
// OR                                                                                                       // 11
isValid = AddressSchema.namedContext("AddressValidator").validateOne(obj, "keyToValidate");                 // 12
// OR                                                                                                       // 13
isValid = Match.test(obj, AddressSchema);                                                                   // 14
                                                                                                            // 15
 patientAddress = new Address({                                                                             // 16
 use: "home",                                                                                               // 17
 text: "123 Main Street",                                                                                   // 18
 city: "Somewhere",                                                                                         // 19
 state: "Indiana",                                                                                          // 20
 postalCode: "12345"                                                                                        // 21
});                                                                                                         // 22
patientAddress.clean();                                                                                     // 23
patientAddress.validate();                                                                                  // 24
patientAddress.save();                                                                                      // 25
 */                                                                                                         // 26
                                                                                                            // 27
                                                                                                            // 28
// //Address = BaseModel.extendAndSetupCollection('HL7.DataTypes.Addresses');                               // 29
// Address = BaseModel.extend();                                                                            // 30
//                                                                                                          // 31
//                                                                                                          // 32
// //Assign a reference from Meteor.users to User.prototype._collection so BaseModel knows how to access it
// Address.prototype._collection = HL7.DataTypes.Addresses;                                                 // 34
//                                                                                                          // 35
// // Create a persistent data store for addresses to be stored.                                            // 36
// HL7.DataTypes.Addresses = new Mongo.Collection('HL7.DataTypes.Addresses');                               // 37
//                                                                                                          // 38
// //Add the transform to the collection since Meteor.users is pre-defined by the accounts package          // 39
// HL7.DataTypes.Addresses._transform = function (document) {                                               // 40
//   return new Address(document);                                                                          // 41
// };                                                                                                       // 42
                                                                                                            // 43
                                                                                                            // 44
// Add  the schema for a collection                                                                         // 45
AddressSchema = new SimpleSchema({                                                                          // 46
  "resourceType" : {                                                                                        // 47
    type: String,                                                                                           // 48
    defaultValue: "Address"                                                                                 // 49
    },                                                                                                      // 50
  "use" : {                                                                                                 // 51
    type: Code                                                                                              // 52
    },                                                                                                      // 53
  "type" : {                                                                                                // 54
    type: Code                                                                                              // 55
    },                                                                                                      // 56
  "text" : {                                                                                                // 57
    type: String                                                                                            // 58
    },                                                                                                      // 59
  "line" : {                                                                                                // 60
    type: [String]                                                                                          // 61
    },                                                                                                      // 62
  "city" : {                                                                                                // 63
    type: String                                                                                            // 64
    },                                                                                                      // 65
  "district" : {                                                                                            // 66
    type: String                                                                                            // 67
    },                                                                                                      // 68
  "state" : {                                                                                               // 69
    type: String                                                                                            // 70
    },                                                                                                      // 71
  "postalCode" : {                                                                                          // 72
    type: String                                                                                            // 73
    },                                                                                                      // 74
  "country" : {                                                                                             // 75
    type: String                                                                                            // 76
    },                                                                                                      // 77
  "period" : {                                                                                              // 78
    type: PeriodSchema                                                                                      // 79
    }                                                                                                       // 80
});                                                                                                         // 81
// AddressValidator = AddressSchema.namedContext("AddressValidator");                                       // 82
// HL7.DataTypes.Addresses.attachSchema(AddressSchema);                                                     // 83
                                                                                                            // 84
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Annotation.js                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
                                                                                                            // 2
AnnotationSchema = new SimpleSchema({                                                                       // 3
  "authorReference" : {                                                                                     // 4
    type: ReferenceSchema                                                                                   // 5
    },                                                                                                      // 6
  "authorString" : {                                                                                        // 7
    type: String                                                                                            // 8
    },                                                                                                      // 9
  "time" : {                                                                                                // 10
    type: Date                                                                                              // 11
    },                                                                                                      // 12
  "text" : {                                                                                                // 13
    type: String                                                                                            // 14
    }                                                                                                       // 15
});                                                                                                         // 16
                                                                                                            // 17
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Attachment.js                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
AttachmentSchema = new SimpleSchema({                                                                       // 1
  "contentType" : {                                                                                         // 2
    optional: true,                                                                                         // 3
    type: Code                                                                                              // 4
    },                                                                                                      // 5
  "language" : {                                                                                            // 6
    optional: true,                                                                                         // 7
    type: Code                                                                                              // 8
    },                                                                                                      // 9
  "data" : {                                                                                                // 10
    optional: true,                                                                                         // 11
    type: String // Base64Binary                                                                            // 12
    },                                                                                                      // 13
  "url" : {                                                                                                 // 14
    optional: true,                                                                                         // 15
    type: String // Uri                                                                                     // 16
    },                                                                                                      // 17
  "size" : {                                                                                                // 18
    optional: true,                                                                                         // 19
    type: String // UnsignedInt                                                                             // 20
    },                                                                                                      // 21
  "hash" : {                                                                                                // 22
    optional: true,                                                                                         // 23
    type: String // Base64Binary                                                                            // 24
    },                                                                                                      // 25
  "title" : {                                                                                               // 26
    optional: true,                                                                                         // 27
    type: String                                                                                            // 28
    },                                                                                                      // 29
  "creation" : {                                                                                            // 30
    optional: true,                                                                                         // 31
    type: Date                                                                                              // 32
    }                                                                                                       // 33
});                                                                                                         // 34
                                                                                                            // 35
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Code.js                                                     //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Code = new String();                                                                                        // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Coding.js                                                   //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
                                                                                                            // 2
CodingSchema = new SimpleSchema({                                                                           // 3
  "system" : {                                                                                              // 4
    type: String                                                                                            // 5
    },                                                                                                      // 6
  "code" : {                                                                                                // 7
    type: String                                                                                            // 8
    },                                                                                                      // 9
  "version" : {                                                                                             // 10
    optional: true,                                                                                         // 11
    type: String                                                                                            // 12
    },                                                                                                      // 13
  "display" : {                                                                                             // 14
    optional: true,                                                                                         // 15
    type: String                                                                                            // 16
    },                                                                                                      // 17
  "userSelected" : {                                                                                        // 18
    optional: true,                                                                                         // 19
    type: Boolean                                                                                           // 20
    }                                                                                                       // 21
});                                                                                                         // 22
                                                                                                            // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/CodableConcept.js                                           //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
                                                                                                            // 2
CodeableConceptSchema = new SimpleSchema({                                                                  // 3
  "coding" : {                                                                                              // 4
    type: [ CodingSchema ]                                                                                  // 5
  },                                                                                                        // 6
  "text" : {                                                                                                // 7
    type: String                                                                                            // 8
    }                                                                                                       // 9
});                                                                                                         // 10
                                                                                                            // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/ContactPoint.js                                             //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
ContactPointSchema = new SimpleSchema({                                                                     // 1
  "resourceType" : {                                                                                        // 2
    type: String,                                                                                           // 3
    defaultValue: "ContactPoint",                                                                           // 4
    },                                                                                                      // 5
  "system" : {                                                                                              // 6
    optional: true,                                                                                         // 7
    type: Code                                                                                              // 8
    },                                                                                                      // 9
  "value" : {                                                                                               // 10
    optional: true,                                                                                         // 11
    type: String                                                                                            // 12
    },                                                                                                      // 13
  "use" : {                                                                                                 // 14
    optional: true,                                                                                         // 15
    type: Code                                                                                              // 16
    },                                                                                                      // 17
  "rank" : {                                                                                                // 18
    optional: true,                                                                                         // 19
    type: Number // PositiveInt                                                                             // 20
    },                                                                                                      // 21
  "period" : {                                                                                              // 22
    optional: true,                                                                                         // 23
    type: PeriodSchema                                                                                      // 24
    }                                                                                                       // 25
});                                                                                                         // 26
                                                                                                            // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Conformance.js                                              //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
ConformanceSchema = new SimpleSchema({                                                                      // 1
  "resourceType" : {                                                                                        // 2
    type: "Conformance",                                                                                    // 3
    // from Resource: id, meta, implicitRules, and language                                                 // 4
    // from DomainResource: text, contained, extension, and modifierExtension                               // 5
  },                                                                                                        // 6
  "url" : {                                                                                                 // 7
    optional: true,                                                                                         // 8
    type: String  // Logical uri to reference this statement                                                // 9
  },                                                                                                        // 10
  "version" : {                                                                                             // 11
    optional: true,                                                                                         // 12
    type: String // Logical id for this version of the statement                                            // 13
  },                                                                                                        // 14
  "name" : {                                                                                                // 15
    optional: true,                                                                                         // 16
    type: String // Informal name for this conformance statement                                            // 17
  },                                                                                                        // 18
  "status" : {                                                                                              // 19
    optional: true,                                                                                         // 20
    type: Code // draft | active | retired                                                                  // 21
  },                                                                                                        // 22
  "experimental" : {                                                                                        // 23
    optional: true,                                                                                         // 24
    type: Boolean // If for testing purposes, not real usage                                                // 25
  },                                                                                                        // 26
  "publisher" : {                                                                                           // 27
    optional: true,                                                                                         // 28
    type: String // Name of the publisher (Organization or individual)                                      // 29
  },                                                                                                        // 30
  "contact.$.name" : {                                                                                      // 31
    optional: true,                                                                                         // 32
    type: String // Name of a individual to contact                                                         // 33
  },                                                                                                        // 34
  // "contact.$.telecom" : {                                                                                // 35
  //   optional: true,                                                                                      // 36
  //   type: [ ContactPoint ] // Contact details for individual or publisher                                // 37
  // },                                                                                                     // 38
  "date" : {                                                                                                // 39
    optional: true,                                                                                         // 40
    type: Date // R!  Publication Date(/time)                                                               // 41
  },                                                                                                        // 42
  "description" : {                                                                                         // 43
    optional: true,                                                                                         // 44
    type: String // C? Human description of the conformance statement                                       // 45
  },                                                                                                        // 46
  "requirements" : {                                                                                        // 47
    optional: true,                                                                                         // 48
    type: String // Why is this needed?                                                                     // 49
  },                                                                                                        // 50
  "copyright" : {                                                                                           // 51
    optional: true,                                                                                         // 52
    type: String // Use and/or publishing restrictions                                                      // 53
  },                                                                                                        // 54
  "kind" : {                                                                                                // 55
    optional: true,                                                                                         // 56
    type: Code // R!  instance | capability | requirements                                                  // 57
  },                                                                                                        // 58
  "software.name" : {                                                                                       // 59
    optional: true,                                                                                         // 60
    type: String // R!  A name the software is known by                                                     // 61
  },                                                                                                        // 62
  "software.version" : {                                                                                    // 63
    optional: true,                                                                                         // 64
    type: String // Version covered by this statement                                                       // 65
  },                                                                                                        // 66
  "software.releaseDate" : {                                                                                // 67
    optional: true,                                                                                         // 68
    type: Date // Date this version released                                                                // 69
  },                                                                                                        // 70
  "implementation.description" : {                                                                          // 71
    optional: true,                                                                                         // 72
    type: String // R!  Describes this specific instance                                                    // 73
  },                                                                                                        // 74
  "implementation.url" : {                                                                                  // 75
    optional: true,                                                                                         // 76
    type: String // Base URL for the installation                                                           // 77
  },                                                                                                        // 78
  "fhirVersion" : {                                                                                         // 79
    optional: true,                                                                                         // 80
    type: String // R!  FHIR Version the system uses                                                        // 81
  },                                                                                                        // 82
  "acceptUnknown" : {                                                                                       // 83
    optional: true,                                                                                         // 84
    type: Code // R!  no | extensions | elements | both                                                     // 85
  },                                                                                                        // 86
  "format" : {                                                                                              // 87
    optional: true,                                                                                         // 88
    type: [Code] // R!  formats supported (xml | json | mime type)                                          // 89
  },                                                                                                        // 90
  "profile" : {                                                                                             // 91
    optional: true,                                                                                         // 92
    type: [ ReferenceSchema ] // (StructureDefinition) Profiles for use cases supported                     // 93
  },                                                                                                        // 94
  "rest.$.mode" : {                                                                                         // 95
    optional: true,                                                                                         // 96
    type: Code // R!  client | server                                                                       // 97
  },                                                                                                        // 98
  "rest.$.documentation" : {                                                                                // 99
    optional: true,                                                                                         // 100
    type: String // General description of implementation                                                   // 101
  },                                                                                                        // 102
  "rest.$.security.cors" : {                                                                                // 103
    optional: true,                                                                                         // 104
    type:Boolean // Adds CORS Headers (http://enable-cors.org/)                                             // 105
  },                                                                                                        // 106
  "rest.$.security.service" : {                                                                             // 107
    optional: true,                                                                                         // 108
    type: [ CodeableConceptSchema ] // OAuth | SMART-on-FHIR | NTLM | Basic | Kerberos | Certificates       // 109
  },                                                                                                        // 110
  "rest.$.security.description" : {                                                                         // 111
    optional: true,                                                                                         // 112
    type: String // General description of how security works                                               // 113
  },                                                                                                        // 114
  "rest.$.security.certificate.$.type" : {                                                                  // 115
    optional: true,                                                                                         // 116
    type: Code // Mime type for certificate                                                                 // 117
  },                                                                                                        // 118
  //"rest.$.security.certificate.$.blob" : "<base64Binary>" // Actual certificate                           // 119
  "rest.$.resource.$.type" : {                                                                              // 120
    optional: true,                                                                                         // 121
    type: Code // R!  A resource type that is supported                                                     // 122
  },                                                                                                        // 123
  "rest.$.resource.$.profile" : {                                                                           // 124
    optional: true,                                                                                         // 125
    type:  ReferenceSchema  // (StructureDefinition) Base System profile for all uses of resource           // 126
  },                                                                                                        // 127
  "rest.$.resource.$.interaction.$.code" : {                                                                // 128
    optional: true,                                                                                         // 129
    type: Code // R!  read | vread | update | delete | history-instance | validate | history-type | create | search-type
  },                                                                                                        // 131
  "rest.$.resource.$.interaction.$.documentation" : {                                                       // 132
    optional: true,                                                                                         // 133
    type: String // Anything special about operation behavior                                               // 134
  },                                                                                                        // 135
  "rest.$.resource.$.versioning" : {                                                                        // 136
    optional: true,                                                                                         // 137
    type: Code // no-version | versioned | versioned-update                                                 // 138
  },                                                                                                        // 139
  "rest.$.resource.$.readHistory" : {                                                                       // 140
    optional: true,                                                                                         // 141
    type: Boolean // Whether vRead can return past versions                                                 // 142
  },                                                                                                        // 143
  "rest.$.resource.$.updateCreate" : {                                                                      // 144
    optional: true,                                                                                         // 145
    type: Boolean // If update can commit to a new identity                                                 // 146
  },                                                                                                        // 147
  "rest.$.resource.$.conditionalCreate" : {                                                                 // 148
    optional: true,                                                                                         // 149
    type: Boolean // If allows/uses conditional create                                                      // 150
  },                                                                                                        // 151
  "rest.$.resource.$.conditionalUpdate" : {                                                                 // 152
    optional: true,                                                                                         // 153
    type: Boolean // If allows/uses conditional update                                                      // 154
  },                                                                                                        // 155
  "rest.$.resource.$.conditionalDelete" : {                                                                 // 156
    optional: true,                                                                                         // 157
    type: Code // not-supported | single | multiple - how conditional delete is supported                   // 158
  },                                                                                                        // 159
  "rest.$.resource.$.searchInclude" : {                                                                     // 160
    optional: true,                                                                                         // 161
    type: [String] // _include values supported by the server                                               // 162
  },                                                                                                        // 163
  "rest.$.resource.$.searchRevInclude" : {                                                                  // 164
    optional: true,                                                                                         // 165
    type: [String] // _revinclude values supported by the server                                            // 166
  },                                                                                                        // 167
  "rest.$.resource.$.searchParam.$.name" : {                                                                // 168
    optional: true,                                                                                         // 169
    type:  String // R!  Name of search parameter                                                           // 170
  },                                                                                                        // 171
  "rest.$.resource.$.searchParam.$.definition" : {                                                          // 172
    optional: true,                                                                                         // 173
    type: String // Source of definition for parameter                                                      // 174
  },                                                                                                        // 175
  "rest.$.resource.$.searchParam.$.type" : {                                                                // 176
    optional: true,                                                                                         // 177
    type: Code // R!  number | date | string | token | reference | composite | quantity | uri               // 178
  },                                                                                                        // 179
  "rest.$.resource.$.searchParam.$.documentation" : {                                                       // 180
    optional: true,                                                                                         // 181
    type: String // Server-specific usage                                                                   // 182
  },                                                                                                        // 183
  "rest.$.resource.$.searchParam.$.target" : {                                                              // 184
    optional: true,                                                                                         // 185
    type: [Code] // Types of resource (if a resource reference)                                             // 186
  },                                                                                                        // 187
  "rest.$.resource.$.searchParam.$.modifier" : {                                                            // 188
    optional: true,                                                                                         // 189
    type: [Code] // missing | exact | contains | not | text | in | not-in | below | above | type            // 190
  },                                                                                                        // 191
  "rest.$.resource.$.searchParam.$.chain" : {                                                               // 192
    optional: true,                                                                                         // 193
    type: [String] // Chained names supported                                                               // 194
  },                                                                                                        // 195
  "rest.$.code" : {                                                                                         // 196
    optional: true,                                                                                         // 197
    type: Code // R!  transaction | search-system | history-system                                          // 198
  },                                                                                                        // 199
  "rest.$.documentation" : {                                                                                // 200
    optional: true,                                                                                         // 201
    type: String // Anything special about operation behavior                                               // 202
  },                                                                                                        // 203
  "rest.transactionMode" : {                                                                                // 204
    optional: true,                                                                                         // 205
    type: Code // not-supported | batch | transaction | both                                                // 206
  },                                                                                                        // 207
  "rest.searchParam" : {                                                                                    // 208
    optional: true,                                                                                         // 209
    blackbox: true,                                                                                         // 210
    type: [ Object ] // Search params for searching all resources                                           // 211
  },                                                                                                        // 212
  "rest.operation.$.name" : {                                                                               // 213
    optional: true,                                                                                         // 214
    type: String // R!  Name by which the operation/query is invoked                                        // 215
  },                                                                                                        // 216
  "rest.operation.$.definition" : {                                                                         // 217
    optional: true,                                                                                         // 218
    type: ReferenceSchema  // (OperationDefinition) R!  The defined operation/query                         // 219
  },                                                                                                        // 220
  "rest.compartment" : {                                                                                    // 221
    optional: true,                                                                                         // 222
    type: [String] // Compartments served/used by system                                                    // 223
  },                                                                                                        // 224
  "messaging.$.endpoint.$.protocol" : {                                                                     // 225
    optional: true,                                                                                         // 226
    type: CodingSchema  // R!  http | ftp | mllp +                                                          // 227
  },                                                                                                        // 228
  "messaging.$.endpoint.$.address" : {                                                                      // 229
    optional: true,                                                                                         // 230
    type: String // R!  Address of end-point                                                                // 231
  //"messaging.$.reliableCache" : "<unsignedInt>" // Reliable Message Cache Length (min)                    // 232
  },                                                                                                        // 233
  "messaging.$.documentation" : {                                                                           // 234
    optional: true,                                                                                         // 235
    type: String // Messaging interface behavior details                                                    // 236
  },                                                                                                        // 237
  "messaging.$.event.$.code" : {                                                                            // 238
    optional: true,                                                                                         // 239
    type: CodingSchema  // R!  Event type                                                                   // 240
  },                                                                                                        // 241
  "messaging.$.event.$.category" : {                                                                        // 242
    optional: true,                                                                                         // 243
    type: Code // Consequence | Currency | Notification                                                     // 244
  },                                                                                                        // 245
  "messaging.$.event.$.mode" : {                                                                            // 246
    optional: true,                                                                                         // 247
    type: Code // R!  sender | receiver                                                                     // 248
  },                                                                                                        // 249
  "messaging.$.event.$.focus" : {                                                                           // 250
    optional: true,                                                                                         // 251
    type: Code // R!  Resource that's focus of message                                                      // 252
  },                                                                                                        // 253
  "messaging.$.event.$.request" : {                                                                         // 254
    optional: true,                                                                                         // 255
    type: ReferenceSchema  // (StructureDefinition) R!  Profile that describes the request                  // 256
  },                                                                                                        // 257
  "messaging.$.event.$.response" : {                                                                        // 258
    optional: true,                                                                                         // 259
    type: ReferenceSchema  // (StructureDefinition) R!  Profile that describes the response                 // 260
  },                                                                                                        // 261
  "messaging.$.event.$.documentation" : {                                                                   // 262
    optional: true,                                                                                         // 263
    type:  String // Endpoint-specific event documentation                                                  // 264
  },                                                                                                        // 265
  "document.$.mode" : {                                                                                     // 266
    optional: true,                                                                                         // 267
    type: Code // R!  producer | consumer                                                                   // 268
  },                                                                                                        // 269
  "document.$.documentation" : {                                                                            // 270
    optional: true,                                                                                         // 271
    type: String // Description of document support                                                         // 272
  },                                                                                                        // 273
  "document.$.profile" : {                                                                                  // 274
    optional: true,                                                                                         // 275
    type: ReferenceSchema  // (StructureDefinition) R!  Constraint on a resource used in the document       // 276
  }                                                                                                         // 277
});                                                                                                         // 278
                                                                                                            // 279
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Group.js                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
GroupSchema = new SimpleSchema({                                                                            // 1
  "linkId" : {                                                                                              // 2
    optional: true,                                                                                         // 3
    type: String                                                                                            // 4
    },                                                                                                      // 5
  "title" : {                                                                                               // 6
    optional: true,                                                                                         // 7
    type: String                                                                                            // 8
    },                                                                                                      // 9
  "concept" : {                                                                                             // 10
    optional: true,                                                                                         // 11
    type: [ CodingSchema ]                                                                                  // 12
    },                                                                                                      // 13
  "text" : {                                                                                                // 14
    optional: true,                                                                                         // 15
    type: String                                                                                            // 16
    },                                                                                                      // 17
  "required" : {                                                                                            // 18
    optional: true,                                                                                         // 19
    type: Boolean                                                                                           // 20
    },                                                                                                      // 21
  "repeats" : {                                                                                             // 22
    optional: true,                                                                                         // 23
    type: Boolean                                                                                           // 24
    },                                                                                                      // 25
  "group" : {                                                                                               // 26
    optional: true,                                                                                         // 27
    blackbox: true,                                                                                         // 28
    type: GroupSchema                                                                                       // 29
    },                                                                                                      // 30
  "question.$.linkId" : {                                                                                   // 31
    optional: true,                                                                                         // 32
    type: String                                                                                            // 33
    },                                                                                                      // 34
  "question.$.concept" : {                                                                                  // 35
    optional: true,                                                                                         // 36
    type: [ CodingSchema ]                                                                                  // 37
    },                                                                                                      // 38
  "question.$.text" : {                                                                                     // 39
    optional: true,                                                                                         // 40
    type: String                                                                                            // 41
    },                                                                                                      // 42
  "question.$.type" : {                                                                                     // 43
    optional: true,                                                                                         // 44
    type: String                                                                                            // 45
    },                                                                                                      // 46
  "question.$.required" : {                                                                                 // 47
    optional: true,                                                                                         // 48
    type: Boolean                                                                                           // 49
    },                                                                                                      // 50
  "question.$.repeats" : {                                                                                  // 51
    optional: true,                                                                                         // 52
    type: Boolean                                                                                           // 53
    },                                                                                                      // 54
  "question.$.options" : {                                                                                  // 55
    optional: true,                                                                                         // 56
    type: ReferenceSchema //(ValueSet)                                                                      // 57
    },                                                                                                      // 58
  "question.$.option" : {                                                                                   // 59
    optional: true,                                                                                         // 60
    type: [ CodingSchema ]                                                                                  // 61
    },                                                                                                      // 62
  "question.$.group" : {                                                                                    // 63
    optional: true,                                                                                         // 64
    blackbox: true,                                                                                         // 65
    type: GroupSchema                                                                                       // 66
    },                                                                                                      // 67
});                                                                                                         // 68
                                                                                                            // 69
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/HumanName.js                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
HumanNameSchema = new SimpleSchema({                                                                        // 1
  "resourceType" : {                                                                                        // 2
    type: String,                                                                                           // 3
    defaultValue: "HumanName"                                                                               // 4
    },                                                                                                      // 5
  "use" : {                                                                                                 // 6
    optional: true,                                                                                         // 7
    type: Code                                                                                              // 8
    },                                                                                                      // 9
  "text" : {                                                                                                // 10
    optional: true,                                                                                         // 11
    type: String                                                                                            // 12
    },                                                                                                      // 13
  "family" : {                                                                                              // 14
    optional: true,                                                                                         // 15
    type: [String]                                                                                          // 16
    },                                                                                                      // 17
  "given" : {                                                                                               // 18
    optional: true,                                                                                         // 19
    type: [String]                                                                                          // 20
    },                                                                                                      // 21
  "prefix" : {                                                                                              // 22
    optional: true,                                                                                         // 23
    type: [String]                                                                                          // 24
    },                                                                                                      // 25
  "suffix" : {                                                                                              // 26
    optional: true,                                                                                         // 27
    type: [String]                                                                                          // 28
    },                                                                                                      // 29
  "preferred" : {                                                                                           // 30
    optional: true,                                                                                         // 31
    type: [String]                                                                                          // 32
    },                                                                                                      // 33
  "period" : {                                                                                              // 34
    optional: true,                                                                                         // 35
    type: PeriodSchema                                                                                      // 36
    }                                                                                                       // 37
});                                                                                                         // 38
                                                                                                            // 39
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Identifier.js                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
IdentifierSchema = new SimpleSchema({                                                                       // 1
  "use" : {                                                                                                 // 2
    optional: true,                                                                                         // 3
    type: String                                                                                            // 4
    },                                                                                                      // 5
  "type" : {                                                                                                // 6
    optional: true,                                                                                         // 7
    type: CodeableConceptSchema                                                                             // 8
    },                                                                                                      // 9
  "system" : {                                                                                              // 10
    optional: true,                                                                                         // 11
    type: String                                                                                            // 12
    },                                                                                                      // 13
  "value" : {                                                                                               // 14
    optional: true,                                                                                         // 15
    type: String                                                                                            // 16
    },                                                                                                      // 17
  "period" : {                                                                                              // 18
    optional: true,                                                                                         // 19
    type: PeriodSchema                                                                                      // 20
    },                                                                                                      // 21
  "assigner" : {                                                                                            // 22
    optional: true,                                                                                         // 23
    type: ReferenceSchema                                                                                   // 24
    }                                                                                                       // 25
});                                                                                                         // 26
                                                                                                            // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Period.js                                                   //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
PeriodSchema = new SimpleSchema({                                                                           // 1
  "start" : {                                                                                               // 2
    type : Date                                                                                             // 3
    },                                                                                                      // 4
  "end" : {                                                                                                 // 5
    type : Date                                                                                             // 6
    }                                                                                                       // 7
});                                                                                                         // 8
                                                                                                            // 9
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Quantity.js                                                 //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
                                                                                                            // 2
// EXAMPLE                                                                                                  // 3
// whenRange: {                                                                                             // 4
//   "low": {                                                                                               // 5
//     "value": 40,                                                                                         // 6
//     "unit": "years",                                                                                     // 7
//     "system": "http://unitsofmeasure.org",                                                               // 8
//     "code": "a"                                                                                          // 9
//   },                                                                                                     // 10
//   "high": {                                                                                              // 11
//     "value": 90,                                                                                         // 12
//     "unit": "years",                                                                                     // 13
//     "system": "http://unitsofmeasure.org",                                                               // 14
//     "code": "a"                                                                                          // 15
//   }                                                                                                      // 16
// }                                                                                                        // 17
                                                                                                            // 18
QuantitySchema = new SimpleSchema({                                                                         // 19
  "value" : {                                                                                               // 20
    type : Number // Decimal                                                                                // 21
    },                                                                                                      // 22
  "comparator": {                                                                                           // 23
    optional: true,                                                                                         // 24
    type: Code                                                                                              // 25
    },                                                                                                      // 26
  "unit" : {                                                                                                // 27
    type : String                                                                                           // 28
    },                                                                                                      // 29
  "system" : {                                                                                              // 30
    type : String // Uri                                                                                    // 31
    },                                                                                                      // 32
  "code" : {                                                                                                // 33
    type : Code                                                                                             // 34
    }                                                                                                       // 35
});                                                                                                         // 36
                                                                                                            // 37
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Range.js                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
                                                                                                            // 2
RangeSchema = new SimpleSchema({                                                                            // 3
  "low" : {                                                                                                 // 4
    type: QuantitySchema                                                                                    // 5
    },                                                                                                      // 6
  "high" : {                                                                                                // 7
    type: QuantitySchema                                                                                    // 8
    }                                                                                                       // 9
});                                                                                                         // 10
                                                                                                            // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Reference.js                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
ReferenceSchema = new SimpleSchema({                                                                        // 1
  "reference" : {                                                                                           // 2
    optional: true,                                                                                         // 3
    type: String                                                                                            // 4
    },                                                                                                      // 5
  "display" : {                                                                                             // 6
    optional: true,                                                                                         // 7
    type: String                                                                                            // 8
    }                                                                                                       // 9
});                                                                                                         // 10
                                                                                                            // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Ratio.js                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
RatioSchema = new SimpleSchema({                                                                            // 1
  "numerator" : {                                                                                           // 2
    type: QuantitySchema                                                                                    // 3
    },                                                                                                      // 4
  "denominator" : {                                                                                         // 5
    type: QuantitySchema                                                                                    // 6
    }                                                                                                       // 7
});                                                                                                         // 8
                                                                                                            // 9
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/SampledData.js                                              //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
SampledDataSchema = new SimpleSchema({                                                                      // 1
  "origin" : {                                                                                              // 2
    type: QuantitySchema                                                                                    // 3
    },                                                                                                      // 4
  "period" : {                                                                                              // 5
    type: Number                                                                                            // 6
    },                                                                                                      // 7
  "factor" : {                                                                                              // 8
    type: Number                                                                                            // 9
    },                                                                                                      // 10
  "lowerLimit" : {                                                                                          // 11
    type: Number                                                                                            // 12
    },                                                                                                      // 13
  "upperLimit" : {                                                                                          // 14
    type: Number                                                                                            // 15
    },                                                                                                      // 16
  "dimensions" : {                                                                                          // 17
    type: Number                                                                                            // 18
    },                                                                                                      // 19
  "data" : {                                                                                                // 20
    type: String                                                                                            // 21
    }                                                                                                       // 22
});                                                                                                         // 23
                                                                                                            // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Signature.js                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
SignatureSchema = new SimpleSchema({                                                                        // 1
  "type" : {                                                                                                // 2
    type: [ CodingSchema ]                                                                                  // 3
    },                                                                                                      // 4
  "when" : {                                                                                                // 5
    type: Date                                                                                              // 6
    },                                                                                                      // 7
  "whoUri" : {                                                                                              // 8
    type: String                                                                                            // 9
    },                                                                                                      // 10
  "whoReference" : {                                                                                        // 11
    type: ReferenceSchema                                                                                   // 12
    },                                                                                                      // 13
  "contentType" : {                                                                                         // 14
    type: String                                                                                            // 15
    }                                                                                                       // 16
});                                                                                                         // 17
                                                                                                            // 18
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_hl7-resource-datatypes/lib/Timing.js                                                   //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
TimingSchema = new SimpleSchema({                                                                           // 1
  "resourceType": {                                                                                         // 2
    type: String,                                                                                           // 3
    defaultValue: "Timing"                                                                                  // 4
  },                                                                                                        // 5
  "event": {                                                                                                // 6
    optional: true,                                                                                         // 7
    type: [ Date ]                                                                                          // 8
  },                                                                                                        // 9
  "repeat.boundsQuantity": {                                                                                // 10
    optional: true,                                                                                         // 11
    type: QuantitySchema                                                                                    // 12
  },                                                                                                        // 13
  "repeat.boundsRange": {                                                                                   // 14
    optional: true,                                                                                         // 15
    type: RangeSchema                                                                                       // 16
  },                                                                                                        // 17
  "repeat.boundsPeriod": {                                                                                  // 18
    optional: true,                                                                                         // 19
    type: PeriodSchema                                                                                      // 20
  },                                                                                                        // 21
  "repeat.count": {                                                                                         // 22
    optional: true,                                                                                         // 23
    type: Number                                                                                            // 24
  },                                                                                                        // 25
  "repeat.duration": {                                                                                      // 26
    optional: true,                                                                                         // 27
    type: Number                                                                                            // 28
  },                                                                                                        // 29
  "repeat.durationMax": {                                                                                   // 30
    optional: true,                                                                                         // 31
    type: Number                                                                                            // 32
  },                                                                                                        // 33
  "repeat.durationUnits": {                                                                                 // 34
    optional: true,                                                                                         // 35
    type: Code                                                                                              // 36
  },                                                                                                        // 37
  "repeat.frequency": {                                                                                     // 38
    optional: true,                                                                                         // 39
    type: Number                                                                                            // 40
  },                                                                                                        // 41
  "repeat.frequencyMax": {                                                                                  // 42
    optional: true,                                                                                         // 43
    type: Number                                                                                            // 44
  },                                                                                                        // 45
  "repeat.period": {                                                                                        // 46
    optional: true,                                                                                         // 47
    type: Number                                                                                            // 48
  },                                                                                                        // 49
  "repeat.periodMax": {                                                                                     // 50
    optional: true,                                                                                         // 51
    type: Number                                                                                            // 52
  },                                                                                                        // 53
  "repeat.periodUnits": {                                                                                   // 54
    optional: true,                                                                                         // 55
    type: Code                                                                                              // 56
  },                                                                                                        // 57
  "repeat.when": {                                                                                          // 58
    optional: true,                                                                                         // 59
    type: Code                                                                                              // 60
  }                                                                                                         // 61
});                                                                                                         // 62
                                                                                                            // 63
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:hl7-resource-datatypes'] = {}, {
  AddressSchema: AddressSchema,
  AnnotationSchema: AnnotationSchema,
  AttachmentSchema: AttachmentSchema,
  Code: Code,
  QuantitySchema: QuantitySchema,
  HumanNameSchema: HumanNameSchema,
  ReferenceSchema: ReferenceSchema,
  PeriodSchema: PeriodSchema,
  CodingSchema: CodingSchema,
  CodeableConceptSchema: CodeableConceptSchema,
  IdentifierSchema: IdentifierSchema,
  ContactPointSchema: ContactPointSchema,
  GroupSchema: GroupSchema,
  ConformanceSchema: ConformanceSchema,
  RangeSchema: RangeSchema,
  RatioSchema: RatioSchema,
  SampledDataSchema: SampledDataSchema,
  SignatureSchema: SignatureSchema,
  TimingSchema: TimingSchema
});

})();

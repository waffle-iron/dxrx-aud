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
var Accounts = Package['accounts-base'].Accounts;
var BaseModel = Package['clinical:base-model'].BaseModel;
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
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var HTML = Package.htmljs.HTML;
var Collection2 = Package['aldeed:collection2-core'].Collection2;

/* Package-scope variables */
var User;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/clinical_user-model/client/template.helpers.js                                               //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
/**                                                                                                      // 1
 * @summary Gets the full name of the user.                                                              // 2
 * @memberOf User                                                                                        // 3
 * @name {{fullName}}                                                                                    // 4
 * @version 1.2.3                                                                                        // 5
 * @returns {String}                                                                                     // 6
 * @example                                                                                              // 7
 * ```html                                                                                               // 8
 * <div>{{fullName}}</div>                                                                               // 9
 * ```                                                                                                   // 10
 */                                                                                                      // 11
 Template.registerHelper("fullName", function (argument){                                                // 12
   if (Meteor.user()) {                                                                                  // 13
     return Meteor.user().fullName();                                                                    // 14
   } else {                                                                                              // 15
     return "Log In";                                                                                    // 16
   }                                                                                                     // 17
});                                                                                                      // 18
                                                                                                         // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/clinical_user-model/lib/user-model.js                                                        //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
/**                                                                                                      // 1
 * @summary Represents a User                                                                            // 2
 * @class User                                                                                           // 3
 * @param {Object} document An object representing a conversation ususally a Mongo document              // 4
 */                                                                                                      // 5
User = BaseModel.extend();                                                                               // 6
                                                                                                         // 7
//Assign a reference from Meteor.users to User.prototype._collection so BaseModel knows how to access it
User.prototype._collection = Meteor.users;                                                               // 9
                                                                                                         // 10
//Add the transform to the collection since Meteor.users is pre-defined by the accounts package          // 11
Meteor.users._transform = function (document) {                                                          // 12
  return new User(document);                                                                             // 13
};                                                                                                       // 14
                                                                                                         // 15
                                                                                                         // 16
                                                                                                         // 17
                                                                                                         // 18
/**                                                                                                      // 19
 * @summary The personal name of the user account.                                                       // 20
 * @memberOf User                                                                                        // 21
 * @name displayName                                                                                     // 22
 * @version 1.2.3                                                                                        // 23
 * @returns {String} A name representation of the user account                                           // 24
 * @example                                                                                              // 25
 * ```js                                                                                                 // 26
 * var selectedUser = Meteor.users.findOne({username: "janedoe"});                                       // 27
 * console.log(selectedUser.displayName());                                                              // 28
 * ```                                                                                                   // 29
 */                                                                                                      // 30
                                                                                                         // 31
User.prototype.displayName = function () {                                                               // 32
  return this.isSelf() ? "You" : this.username;                                                          // 33
};                                                                                                       // 34
                                                                                                         // 35
                                                                                                         // 36
User.prototype.isTrue = function () {                                                                    // 37
  return true;                                                                                           // 38
};                                                                                                       // 39
                                                                                                         // 40
                                                                                                         // 41
User.prototype.isAlive = function () {                                                                   // 42
  return true;                                                                                           // 43
};                                                                                                       // 44
                                                                                                         // 45
/**                                                                                                      // 46
 * Check if the this user is the current logged in user or the specified user                            // 47
 * @method isSelf                                                                                        // 48
 * @param   {Object}  user The user to check against                                                     // 49
 * @returns {Boolean} Whether or not this user is the same as the specified user                         // 50
 */                                                                                                      // 51
                                                                                                         // 52
/**                                                                                                      // 53
 * @summary Check if the this user is the current logged in user or the specified user.                  // 54
 * @memberOf User                                                                                        // 55
 * @name isSelf                                                                                          // 56
 * @version 1.2.3                                                                                        // 57
 * @returns {String}                                                                                     // 58
 */                                                                                                      // 59
                                                                                                         // 60
User.prototype.isSelf = function (user) {                                                                // 61
  var userId = user && user._id || Meteor.userId();                                                      // 62
                                                                                                         // 63
  if (this._id === userId) {                                                                             // 64
    return true;                                                                                         // 65
  }                                                                                                      // 66
};                                                                                                       // 67
                                                                                                         // 68
                                                                                                         // 69
                                                                                                         // 70
                                                                                                         // 71
                                                                                                         // 72
/**                                                                                                      // 73
 * @summary Gets the full name of the user.                                                              // 74
 * @memberOf User                                                                                        // 75
 * @name fullName                                                                                        // 76
 * @version 1.2.3                                                                                        // 77
 * @returns {String}                                                                                     // 78
 * @example                                                                                              // 79
 * ```js                                                                                                 // 80
 * var selectedUser = Meteor.users.findOne({username: "janedoe"});                                       // 81
 * console.log(selectedUser.fullName());                                                                 // 82
 * ```                                                                                                   // 83
 */                                                                                                      // 84
User.prototype.fullName = function () {                                                                  // 85
    // if we're using Auth0                                                                              // 86
  if (this.services && this.services.auth0) {                                                            // 87
    return this.services.auth0.name;                                                                     // 88
                                                                                                         // 89
    // if we're using an HL7 FHIR HumanName resource                                                     // 90
  } else if (this.profile && this.profile.name && this.profile.name.text){                               // 91
    // the following assumes a Person, RelatedPerson, or Practitioner resource                           // 92
    // which only has a single name specified                                                            // 93
    return this.profile.name.text;                                                                       // 94
  } else if (this.profile && this.profile.name){                                                         // 95
    // the following assumes a Patient resource                                                          // 96
    // where multiple names and aliases may be specified                                                 // 97
    return this.profile.name[0].text;                                                                    // 98
                                                                                                         // 99
    // if we're using traditional Meteor naming convention                                               // 100
  } else if (this.profile && this.profile.fullName){                                                     // 101
    return this.profile.fullName;                                                                        // 102
  } else {                                                                                               // 103
    return "---";                                                                                        // 104
  }                                                                                                      // 105
};                                                                                                       // 106
                                                                                                         // 107
                                                                                                         // 108
/**                                                                                                      // 109
 * @summary Gets the given (first) name of the user.                                                     // 110
 * @memberOf User                                                                                        // 111
 * @name givenName                                                                                       // 112
 * @version 1.2.3                                                                                        // 113
 * @returns {String}                                                                                     // 114
 * @example                                                                                              // 115
 * ```js                                                                                                 // 116
 * var selectedUser = Meteor.users.findOne({username: "janedoe"});                                       // 117
 * console.log(selectedUser.givenName());                                                                // 118
 * ```                                                                                                   // 119
 */                                                                                                      // 120
User.prototype.givenName = function () {                                                                 // 121
  if(this.profile && this.profile.name){                                                                 // 122
    // if we're using an HL7 FHIR HumanName resource                                                     // 123
    return this.profile.name[0].given;                                                                   // 124
  } else if (this.profile && this.profile.fullName){                                                     // 125
    // if we're using traditional Meteor naming convention                                               // 126
    var names = this.profile.fullName.split(" ");                                                        // 127
    return names[0];                                                                                     // 128
  } else {                                                                                               // 129
    return "";                                                                                           // 130
  }                                                                                                      // 131
};                                                                                                       // 132
                                                                                                         // 133
                                                                                                         // 134
/**                                                                                                      // 135
 * @summary Gets the family (last) name of the user.                                                     // 136
 * @memberOf User                                                                                        // 137
 * @name familyName                                                                                      // 138
 * @version 1.2.3                                                                                        // 139
 * @returns {String}                                                                                     // 140
 * @example                                                                                              // 141
 * ```js                                                                                                 // 142
 * var selectedUser = Meteor.users.findOne({username: "janedoe"});                                       // 143
 * console.log(selectedUser.familyName());                                                               // 144
 * ```                                                                                                   // 145
 */                                                                                                      // 146
User.prototype.familyName = function () {                                                                // 147
  if (this.profile && this.profile.name) {                                                               // 148
    // if we're using an HL7 FHIR HumanName resource                                                     // 149
    return this.profile.name[0].family;                                                                  // 150
  } else if (this.profile && this.profile.fullName){                                                     // 151
    // if we're using traditional Meteor naming convention                                               // 152
    var names = this.profile.fullName.split(" ");                                                        // 153
    return names[names.length - 1];                                                                      // 154
  } else {                                                                                               // 155
    return "---";                                                                                        // 156
  }                                                                                                      // 157
};                                                                                                       // 158
                                                                                                         // 159
/**                                                                                                      // 160
 * @summary Gets the default email that an account is associated.  Defined as the first verified email in the emails array.
 * @memberOf User                                                                                        // 162
 * @name defaultEmail                                                                                    // 163
 * @version 1.2.3                                                                                        // 164
 * @returns {String}                                                                                     // 165
 * @example                                                                                              // 166
 * ```js                                                                                                 // 167
 * var selectedUser = Meteor.users.findOne({username: "janedoe"});                                       // 168
 * console.log(selectedUser.defaultEmail());                                                             // 169
 * ```                                                                                                   // 170
 */                                                                                                      // 171
User.prototype.defaultEmail = function () {                                                              // 172
  return this.emails && this.emails[0].address;                                                          // 173
};                                                                                                       // 174
                                                                                                         // 175
/**                                                                                                      // 176
 * Get the default email address for the user                                                            // 177
 * @method defaultEmail                                                                                  // 178
 * @returns {String} The users default email address                                                     // 179
 */                                                                                                      // 180
User.prototype.getEmails = function () {                                                                 // 181
                                                                                                         // 182
  var result = [];                                                                                       // 183
                                                                                                         // 184
  if (this && this.emails) {                                                                             // 185
    this.emails.forEach(function (email) {                                                               // 186
      result.push(email.address);                                                                        // 187
    });                                                                                                  // 188
  }                                                                                                      // 189
                                                                                                         // 190
  if (this.services && this.services.google && this.services.google.email) {                             // 191
    result.push(this.services.google.email);                                                             // 192
  }                                                                                                      // 193
                                                                                                         // 194
  if (result.length > 0){                                                                                // 195
    return result;                                                                                       // 196
  } else {                                                                                               // 197
    return [];                                                                                           // 198
  }                                                                                                      // 199
};                                                                                                       // 200
                                                                                                         // 201
                                                                                                         // 202
User.prototype.getPrimaryEmail = function () {                                                           // 203
  if (this.emails) {                                                                                     // 204
    return this.emails[0].address;                                                                       // 205
  } else {                                                                                               // 206
    return "---";                                                                                        // 207
  }                                                                                                      // 208
};                                                                                                       // 209
                                                                                                         // 210
                                                                                                         // 211
                                                                                                         // 212
if (Meteor.isServer) {                                                                                   // 213
  Meteor.methods({                                                                                       // 214
    /**                                                                                                  // 215
     * @summary Write all the User collaborations to the server console log.                             // 216
     * @locus Server                                                                                     // 217
     * @memberOf User                                                                                    // 218
     * @name /testGetCollaborations                                                                      // 219
     * @version 1.2.3                                                                                    // 220
     * @returns {Array}                                                                                  // 221
     * @example                                                                                          // 222
     * ```js                                                                                             // 223
     * Meteor.call('testGetCollaborations');                                                             // 224
     * ```                                                                                               // 225
     */                                                                                                  // 226
    testGetCollaborations:function (user){                                                               // 227
       console.log('testGetCollaborations');                                                             // 228
       var user = Meteor.users.findOne({_id: user._id});                                                 // 229
      //  console.log('isAlive', user.isAlive());                                                        // 230
       console.log('getAllCollaborations', user.getAllCollaborations(user));                             // 231
       //user.getAllCollaborations(user);                                                                // 232
    }                                                                                                    // 233
  });                                                                                                    // 234
                                                                                                         // 235
  // refreshUserProfileCollaborations = function (){                                                     // 236
  //   User.getAllCollaborations().forEach(function(collaboration){                                      // 237
  //                                                                                                     // 238
  //   })                                                                                                // 239
  // }                                                                                                   // 240
}                                                                                                        // 241
                                                                                                         // 242
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:user-model'] = {}, {
  User: User
});

})();

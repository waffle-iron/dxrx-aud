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
var _ = Package.underscore._;
var ServerTime = Package['socialize:server-time'].ServerTime;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var BaseModel;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/clinical_base-model/packages/clinical_base-model.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function () {                                                                                                       // 1
                                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                            //     // 4
// packages/clinical:base-model/lib/BaseModel.js                                                              //     // 5
//                                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                              //     // 8
if (typeof Object.create !== 'function') {                                                                    // 1   // 9
  Object.create = (function () {                                                                              // 2   // 10
    var thing = function () {};                                                                               // 3   // 11
    return function (prototype) {                                                                             // 4   // 12
      if (arguments.length > 1) {                                                                             // 5   // 13
        throw Error('Second argument not supported');                                                         // 6   // 14
      }                                                                                                       // 7   // 15
      if (typeof prototype !== 'object') {                                                                    // 8   // 16
        throw TypeError('Argument must be an object');                                                        // 9   // 17
      }                                                                                                       // 10  // 18
      thing.prototype = prototype;                                                                            // 11  // 19
      var result = new thing();                                                                               // 12  // 20
      thing.prototype = null;                                                                                 // 13  // 21
      return result;                                                                                          // 14  // 22
    };                                                                                                        // 15  // 23
  })();                                                                                                       // 16  // 24
}                                                                                                             // 17  // 25
                                                                                                              // 18  // 26
var diff = function (a, b) {                                                                                  // 19  // 27
  var keys = _.map(a, function (v, k) {                                                                       // 20  // 28
    if (b[k] === v) {                                                                                         // 21  // 29
      return k;                                                                                               // 22  // 30
    }                                                                                                         // 23  // 31
  });                                                                                                         // 24  // 32
  return _.omit(a, keys);                                                                                     // 25  // 33
};                                                                                                            // 26  // 34
                                                                                                              // 27  // 35
                                                                                                              // 28  // 36
                                                                                                              // 29  // 37
/*globals BaseModel:true*/                                                                                    // 30  // 38
                                                                                                              // 31  // 39
BaseModel = function () {};                                                                                   // 32  // 40
                                                                                                              // 33  // 41
BaseModel.createEmpty = function (_id) {                                                                      // 34  // 42
  return new this({                                                                                           // 35  // 43
    _id: _id                                                                                                  // 36  // 44
  });                                                                                                         // 37  // 45
};                                                                                                            // 38  // 46
                                                                                                              // 39  // 47
BaseModel.extend = function () {                                                                              // 40  // 48
  var child = function (document) {                                                                           // 41  // 49
    _.extend(this, document);                                                                                 // 42  // 50
    this._document = document;                                                                                // 43  // 51
  };                                                                                                          // 44  // 52
                                                                                                              // 45  // 53
  //add Static properties and methods                                                                         // 46  // 54
  _.extend(child, this);                                                                                      // 47  // 55
                                                                                                              // 48  // 56
  //prototypal inheritence                                                                                    // 49  // 57
  child.prototype = Object.create(this.prototype);                                                            // 50  // 58
  child.prototype.constructor = child;                                                                        // 51  // 59
                                                                                                              // 52  // 60
  //access to parent                                                                                          // 53  // 61
  child.prototype._parent_ = this;                                                                            // 54  // 62
  child.prototype._super_ = this.prototype;                                                                   // 55  // 63
                                                                                                              // 56  // 64
  return child;                                                                                               // 57  // 65
};                                                                                                            // 58  // 66
                                                                                                              // 59  // 67
BaseModel.extendAndSetupCollection = function (collectionName) {                                              // 60  // 68
  var model = this.extend();                                                                                  // 61  // 69
                                                                                                              // 62  // 70
  model.collection = model.prototype._collection = new Mongo.Collection(collectionName, {                     // 63  // 71
    transform: function (document) {                                                                          // 64  // 72
      return new model(document);                                                                             // 65  // 73
    }                                                                                                         // 66  // 74
  });                                                                                                         // 67  // 75
                                                                                                              // 68  // 76
  Meteor[collectionName] = model.collection;                                                                  // 69  // 77
                                                                                                              // 70  // 78
  return model;                                                                                               // 71  // 79
};                                                                                                            // 72  // 80
                                                                                                              // 73  // 81
BaseModel.appendSchema = function (schemaObject) {                                                            // 74  // 82
  var schema = new SimpleSchema(schemaObject);                                                                // 75  // 83
  var collection = this.prototype._collection;                                                                // 76  // 84
                                                                                                              // 77  // 85
  if (collection) {                                                                                           // 78  // 86
    collection.attachSchema(schema);                                                                          // 79  // 87
    this.prototype._validator = schema.newContext();                                                          // 80  // 88
  } else {                                                                                                    // 81  // 89
    throw new Error(                                                                                          // 82  // 90
      "Can't append schema to non existent collection. Either use extendAndSetupCollection() or assign a collection to Model.prototype._collection"
    );                                                                                                        // 84  // 92
  }                                                                                                           // 85  // 93
};                                                                                                            // 86  // 94
                                                                                                              // 87  // 95
BaseModel.methods = function (methodMap) {                                                                    // 88  // 96
  var self = this;                                                                                            // 89  // 97
  if (_.isObject(methodMap)) {                                                                                // 90  // 98
    _.each(methodMap, function (method, name) {                                                               // 91  // 99
      if (_.isFunction(method)) {                                                                             // 92  // 100
        if (!self.prototype[name]) {                                                                          // 93  // 101
          self.prototype[name] = method;                                                                      // 94  // 102
        } else {                                                                                              // 95  // 103
          throw new Meteor.Error("existent-method", "The method " + name + " already exists.");               // 96  // 104
        }                                                                                                     // 97  // 105
      }                                                                                                       // 98  // 106
    });                                                                                                       // 99  // 107
  }                                                                                                           // 100
};                                                                                                            // 101
                                                                                                              // 102
BaseModel.prototype._getSchema = function () {                                                                // 103
  return this._collection._c2._simpleSchema;                                                                  // 104
};                                                                                                            // 105
                                                                                                              // 106
BaseModel.prototype._checkCollectionExists = function () {                                                    // 107
  if (!this._collection) {                                                                                    // 108
    throw new Error(                                                                                          // 109
      "No collection found. Either use extendAndSetupCollection() or assign a collection to Model.prototype._collection"
    );                                                                                                        // 111
  }                                                                                                           // 112
};                                                                                                            // 113
                                                                                                              // 114
BaseModel.prototype.getCollectionName = function () {                                                         // 115
  this._checkCollectionExists();                                                                              // 116
  return this._collection._name;                                                                              // 117
};                                                                                                            // 118
                                                                                                              // 119
BaseModel.prototype.checkOwnership = function () {                                                            // 120
  return this.userId === Meteor.userId();                                                                     // 121
};                                                                                                            // 122
                                                                                                              // 123
// ===============================================                                                            // 124
// crud/persistence functions                                                                                 // 125
                                                                                                              // 126
BaseModel.prototype.save = function (callback) {                                                              // 127
  this._checkCollectionExists();                                                                              // 128
  var obj = {};                                                                                               // 129
  var schema = this._getSchema();                                                                             // 130
                                                                                                              // 131
  _.each(this, function (value, key) {                                                                        // 132
    if (key !== "_document") {                                                                                // 133
      obj[key] = value;                                                                                       // 134
    }                                                                                                         // 135
  });                                                                                                         // 136
                                                                                                              // 137
                                                                                                              // 138
  if (this._id) {                                                                                             // 139
    obj = diff(obj, this._document);                                                                          // 140
    console.log(obj);                                                                                         // 141
    this._collection.update(this._id, {                                                                       // 142
      $set: obj                                                                                               // 143
    }, callback);                                                                                             // 144
  } else {                                                                                                    // 145
    if (Meteor.isClient && schema) {                                                                          // 146
      obj = schema.clean(obj);                                                                                // 147
    }                                                                                                         // 148
    this._id = this._collection.insert(obj, callback);                                                        // 149
  }                                                                                                           // 150
                                                                                                              // 151
  return this;                                                                                                // 152
};                                                                                                            // 153
                                                                                                              // 154
BaseModel.prototype.update = function (modifier) {                                                            // 155
  if (this._id) {                                                                                             // 156
    this._checkCollectionExists();                                                                            // 157
                                                                                                              // 158
    this._collection.update(this._id, modifier);                                                              // 159
  }                                                                                                           // 160
};                                                                                                            // 161
                                                                                                              // 162
BaseModel.prototype._updateLocal = function (modifier) {                                                      // 163
  this._collection._collection.update(this._id, modifier);                                                    // 164
};                                                                                                            // 165
                                                                                                              // 166
BaseModel.prototype.set = function (key, value) {                                                             // 167
  var obj = {};                                                                                               // 168
  obj[key] = value;                                                                                           // 169
  this[key] = value;                                                                                          // 170
  this._id && this._updateLocal({                                                                             // 171
    $set: obj                                                                                                 // 172
  });                                                                                                         // 173
  return this;                                                                                                // 174
};                                                                                                            // 175
                                                                                                              // 176
BaseModel.prototype.remove = function () {                                                                    // 177
  if (this._id) {                                                                                             // 178
    this._checkCollectionExists();                                                                            // 179
                                                                                                              // 180
    this._collection.remove({                                                                                 // 181
      _id: this._id                                                                                           // 182
    });                                                                                                       // 183
  }                                                                                                           // 184
};                                                                                                            // 185
                                                                                                              // 186
// ===============================================                                                            // 187
// validation functions                                                                                       // 188
                                                                                                              // 189
BaseModel.prototype.clean = function () {                                                                     // 190
  if(this._collection._c2._simpleSchema){                                                                     // 191
    return this._collection._c2._simpleSchema.clean(this._document);                                          // 192
  }                                                                                                           // 193
};                                                                                                            // 194
                                                                                                              // 195
BaseModel.prototype.validate = function (options) {                                                           // 196
  var validator = this.prototype._validator;                                                                  // 197
                                                                                                              // 198
  if (validator) {                                                                                            // 199
    validator.validate(this, options)                                                                         // 200
  } else {                                                                                                    // 201
    throw new Error(                                                                                          // 202
      "Can't validate document when object doesn't have a schema and validation context. Use .appendSchema()" // 203
      );                                                                                                      // 204
  }                                                                                                           // 205
};                                                                                                            // 206
                                                                                                              // 207
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 216
                                                                                                                     // 217
}).call(this);                                                                                                       // 218
                                                                                                                     // 219
                                                                                                                     // 220
                                                                                                                     // 221
                                                                                                                     // 222
                                                                                                                     // 223
                                                                                                                     // 224
(function () {                                                                                                       // 225
                                                                                                                     // 226
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 227
//                                                                                                            //     // 228
// packages/clinical:base-model/lib/security.js                                                               //     // 229
//                                                                                                            //     // 230
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 231
                                                                                                              //     // 232
SimpleSchema.messages({Untrusted: "Inserts/Updates from untrusted code not supported"});                      // 1   // 233
                                                                                                              // 2   // 234
SimpleSchema.denyUntrusted = function() {                                                                     // 3   // 235
    if(this.isSet){                                                                                           // 4   // 236
        var autoValue = this.definition.autoValue && this.definition.autoValue.call(this);                    // 5   // 237
        var defaultValue = this.definition.defaultValue;                                                      // 6   // 238
                                                                                                              // 7   // 239
        if(this.value != defaultValue && this.value != autoValue && !this.isFromTrustedCode){                 // 8   // 240
            return "Untrusted";                                                                               // 9   // 241
        }                                                                                                     // 10  // 242
    }                                                                                                         // 11  // 243
};                                                                                                            // 12  // 244
                                                                                                              // 13  // 245
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 246
                                                                                                                     // 247
}).call(this);                                                                                                       // 248
                                                                                                                     // 249
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:base-model'] = {}, {
  BaseModel: BaseModel
});

})();

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
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;
var Random = Package.random.Random;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Factory;

var require = meteorInstall({"node_modules":{"meteor":{"dburles:factory":{"factory.js":["babel-runtime/helpers/classCallCheck",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/dburles_factory/factory.js                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
/* global LocalCollection */                                                                      //
/* global Factory:true */                                                                         //
                                                                                                  //
var factories = {};                                                                               // 4
                                                                                                  //
Factory = function () {                                                                           // 6
  function Factory(name, collection, attributes) {                                                // 7
    (0, _classCallCheck3['default'])(this, Factory);                                              // 7
                                                                                                  //
    this.name = name;                                                                             // 8
    this.collection = collection;                                                                 // 9
    this.attributes = attributes;                                                                 // 10
    this.afterHooks = [];                                                                         // 11
    this.sequence = 0;                                                                            // 12
  }                                                                                               // 13
                                                                                                  //
  Factory.prototype.after = function after(fn) {                                                  // 6
    this.afterHooks.push(fn);                                                                     // 16
    return this;                                                                                  // 17
  };                                                                                              // 18
                                                                                                  //
  return Factory;                                                                                 // 6
}();                                                                                              // 6
                                                                                                  //
Factory.define = function (name, collection, attributes) {                                        // 21
  factories[name] = new Factory(name, collection, attributes);                                    // 22
  return factories[name];                                                                         // 23
};                                                                                                // 24
                                                                                                  //
Factory.get = function (name) {                                                                   // 26
  var factory = factories[name];                                                                  // 27
  if (!factory) {                                                                                 // 28
    throw new Error("Factory: There is no factory named " + name);                                // 29
  }                                                                                               // 30
  return factory;                                                                                 // 31
};                                                                                                // 32
                                                                                                  //
Factory.build = function (name) {                                                                 // 34
  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];       // 34
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];          // 34
                                                                                                  //
  var factory = Factory.get(name);                                                                // 35
  var result = {};                                                                                // 36
                                                                                                  //
  // "raw" attributes without functions evaluated, or dotted properties resolved                  //
  var extendedAttributes = _.extend({}, factory.attributes, attributes);                          // 39
                                                                                                  //
  // either create a new factory and return its _id                                               //
  // or return a 'fake' _id (since we're not inserting anything)                                  //
  var makeRelation = function makeRelation(relName) {                                             // 43
    if (options.insert) {                                                                         // 44
      return Factory.create(relName)._id;                                                         // 45
    }                                                                                             // 46
    if (options.tree) {                                                                           // 47
      return Factory.build(relName, {}, { tree: true });                                          // 48
    }                                                                                             // 49
    // fake an id on build                                                                        //
    return Random.id();                                                                           // 51
  };                                                                                              // 52
                                                                                                  //
  var getValue = function getValue(value) {                                                       // 54
    return value instanceof Factory ? makeRelation(value.name) : value;                           // 55
  };                                                                                              // 56
                                                                                                  //
  var getValueFromFunction = function getValueFromFunction(func) {                                // 58
    var api = {                                                                                   // 59
      sequence: function sequence(fn) {                                                           // 60
        return fn(factory.sequence);                                                              // 60
      }                                                                                           // 60
    };                                                                                            // 59
    var fnRes = func.call(result, api);                                                           // 62
    return getValue(fnRes);                                                                       // 63
  };                                                                                              // 64
                                                                                                  //
  factory.sequence += 1;                                                                          // 66
                                                                                                  //
  var walk = function walk(record, object) {                                                      // 68
    _.each(object, function (value, key) {                                                        // 69
      var newValue = value;                                                                       // 70
      // is this a Factory instance?                                                              //
      if (value instanceof Factory) {                                                             // 72
        newValue = makeRelation(value.name);                                                      // 73
      } else if (_.isArray(value)) {                                                              // 74
        newValue = value.map(function (element) {                                                 // 75
          if (_.isFunction(element)) {                                                            // 76
            return getValueFromFunction(element);                                                 // 77
          }                                                                                       // 78
          return getValue(element);                                                               // 79
        });                                                                                       // 80
      } else if (_.isFunction(value)) {                                                           // 81
        newValue = getValueFromFunction(value);                                                   // 82
        // if an object literal is passed in, traverse deeper into it                             //
      } else if (Object.prototype.toString.call(value) === '[object Object]') {                   // 84
          record[key] = record[key] || {};                                                        // 85
          return walk(record[key], value);                                                        // 86
        }                                                                                         // 87
                                                                                                  //
      var modifier = { $set: {} };                                                                // 89
                                                                                                  //
      if (key !== '_id') {                                                                        // 91
        modifier.$set[key] = newValue;                                                            // 92
      }                                                                                           // 93
                                                                                                  //
      LocalCollection._modify(record, modifier);                                                  // 95
    });                                                                                           // 96
  };                                                                                              // 97
                                                                                                  //
  walk(result, extendedAttributes);                                                               // 99
                                                                                                  //
  if (!options.tree) {                                                                            // 101
    result._id = extendedAttributes._id || Random.id();                                           // 102
  }                                                                                               // 103
  return result;                                                                                  // 104
};                                                                                                // 105
                                                                                                  //
Factory.tree = function (name, attributes) {                                                      // 107
  return Factory.build(name, attributes, { tree: true });                                         // 108
};                                                                                                // 109
                                                                                                  //
Factory._create = function (name, doc) {                                                          // 111
  var collection = Factory.get(name).collection;                                                  // 112
  var insertId = collection.insert(doc);                                                          // 113
  var record = collection.findOne(insertId);                                                      // 114
  return record;                                                                                  // 115
};                                                                                                // 116
                                                                                                  //
Factory.create = function (name) {                                                                // 118
  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];       // 118
                                                                                                  //
  var doc = Factory.build(name, attributes, { insert: true });                                    // 119
  var record = Factory._create(name, doc);                                                        // 120
                                                                                                  //
  Factory.get(name).afterHooks.forEach(function (cb) {                                            // 122
    return cb(record);                                                                            // 122
  });                                                                                             // 122
                                                                                                  //
  return record;                                                                                  // 124
};                                                                                                // 125
                                                                                                  //
Factory.extend = function (name) {                                                                // 127
  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];       // 127
                                                                                                  //
  return _.extend(_.clone(Factory.get(name).attributes), attributes);                             // 128
};                                                                                                // 129
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/dburles:factory/factory.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['dburles:factory'] = {}, {
  Factory: Factory
});

})();

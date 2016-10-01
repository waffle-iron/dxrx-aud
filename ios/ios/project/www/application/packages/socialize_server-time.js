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

/* Package-scope variables */
var ServerTime;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/socialize_server-time/packages/socialize_server-time.js                              //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
(function () {                                                                                   // 1
                                                                                                 // 2
/////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                         //    // 4
// packages/socialize:server-time/common/server-time.js                                    //    // 5
//                                                                                         //    // 6
/////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                           //    // 8
ServerTime = {                                                                             // 1  // 9
    _timeDifference: 0                                                                     // 2  // 10
};                                                                                         // 3  // 11
                                                                                           // 4  // 12
ServerTime.now = function () {                                                             // 5  // 13
    return Date.now() + this._timeDifference;                                              // 6  // 14
};                                                                                         // 7  // 15
                                                                                           // 8  // 16
ServerTime.date = function() {                                                             // 9  // 17
    return new Date(this.now());                                                           // 10
};                                                                                         // 11
/////////////////////////////////////////////////////////////////////////////////////////////    // 20
                                                                                                 // 21
}).call(this);                                                                                   // 22
                                                                                                 // 23
                                                                                                 // 24
                                                                                                 // 25
                                                                                                 // 26
                                                                                                 // 27
                                                                                                 // 28
(function () {                                                                                   // 29
                                                                                                 // 30
/////////////////////////////////////////////////////////////////////////////////////////////    // 31
//                                                                                         //    // 32
// packages/socialize:server-time/client/server-time.js                                    //    // 33
//                                                                                         //    // 34
/////////////////////////////////////////////////////////////////////////////////////////////    // 35
                                                                                           //    // 36
ServerTime.init = function() {                                                             // 1  // 37
    ServerTime._diffStart = Date.now();                                                    // 2  // 38
                                                                                           // 3  // 39
    Meteor.call("socialize:getServerTime", function(error,serverTimeStamp){                // 4  // 40
        if(!error){                                                                        // 5  // 41
            var now = Date.now();                                                          // 6  // 42
            var latency = now - ServerTime._diffStart;                                     // 7  // 43
                                                                                           // 8  // 44
            ServerTime._timeDifference = serverTimeStamp + latency - now;                  // 9  // 45
        }else{                                                                             // 10
            throw(error);                                                                  // 11
        }                                                                                  // 12
    });                                                                                    // 13
};                                                                                         // 14
                                                                                           // 15
//At startup, wait a couple seconds so that we can get a more accurate latency estimation. // 16
//This is far from optimal but should work.                                                // 17
Meteor.startup(function(){                                                                 // 18
    Meteor.setTimeout(function(){                                                          // 19
        ServerTime.init();                                                                 // 20
    }, 2000);                                                                              // 21
});                                                                                        // 22
                                                                                           // 23
/////////////////////////////////////////////////////////////////////////////////////////////    // 60
                                                                                                 // 61
}).call(this);                                                                                   // 62
                                                                                                 // 63
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['socialize:server-time'] = {}, {
  ServerTime: ServerTime
});

})();

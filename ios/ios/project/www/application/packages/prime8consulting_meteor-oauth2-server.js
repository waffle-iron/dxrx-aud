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
var refreshTokensCollection, authCodesCollection, oAuth2Server;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/prime8consulting_meteor-oauth2-server/common.js                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
refreshTokensCollection = new Meteor.Collection('OAuth2RefreshTokens');                                          // 1
refreshTokensCollection.allow({                                                                                  // 2
    insert: function(userId, doc) {                                                                              // 3
        return Meteor.isServer && userId && userId === doc.userId;                                               // 4
    },                                                                                                           // 5
    update: function(userId, doc, fieldNames, modifier) {                                                        // 6
        return false;                                                                                            // 7
    },                                                                                                           // 8
    remove: function(userId, doc) {                                                                              // 9
        return userId && userId === doc.userId;                                                                  // 10
    }                                                                                                            // 11
});                                                                                                              // 12
                                                                                                                 // 13
authCodesCollection = new Meteor.Collection('OAuth2AuthCodes');                                                  // 14
authCodesCollection.allow({                                                                                      // 15
    insert: function(userId, doc) {                                                                              // 16
        return Meteor.isServer && userId && userId === doc.userId;                                               // 17
    },                                                                                                           // 18
    update: function(userId, doc, fieldNames, modifier) {                                                        // 19
        return false;                                                                                            // 20
    },                                                                                                           // 21
    remove: function(userId, doc) {                                                                              // 22
        return userId && userId === doc.userId;                                                                  // 23
    }                                                                                                            // 24
});                                                                                                              // 25
                                                                                                                 // 26
oAuth2Server = {                                                                                                 // 27
    pubSubNames: {                                                                                               // 28
        authCodes: 'oauth2/authCodes',                                                                           // 29
        refreshTokens: 'oauth2/refreshTokens'                                                                    // 30
    },                                                                                                           // 31
    methodNames: {                                                                                               // 32
        authCodeGrant: 'oauth2/authCodeGrant'                                                                    // 33
    },                                                                                                           // 34
    collections: {                                                                                               // 35
        refreshToken: refreshTokensCollection,                                                                   // 36
        authCode: authCodesCollection                                                                            // 37
    }                                                                                                            // 38
};                                                                                                               // 39
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/prime8consulting_meteor-oauth2-server/client.js                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
oAuth2Server.subscribeTo = {                                                                                     // 1
    authCode: function() {                                                                                       // 2
        return Meteor.subscribe(oAuth2Server.pubSubNames.authCodes);                                             // 3
    },                                                                                                           // 4
    refreshTokens: function() {                                                                                  // 5
        return Meteor.subscribe(oAuth2Server.pubSubNames.refreshTokens);                                         // 6
    }                                                                                                            // 7
};                                                                                                               // 8
                                                                                                                 // 9
oAuth2Server.callMethod = {                                                                                      // 10
    /**                                                                                                          // 11
     *                                                                                                           // 12
     * @param client_id : string - The client id.                                                                // 13
     * @param redirect_uri : string - The Uri to goto after processing.                                          // 14
     * @param response_type : string - Oauth response type.                                                      // 15
     * @param scope : string[] - An array of scopes.                                                             // 16
     * @param state : string - A state variable provided by the client. It will be added onto the redirectToUri.
     * @param callback                                                                                           // 18
     */                                                                                                          // 19
    authCodeGrant: function(client_id, redirect_uri, response_type, scope, state, callback) {                    // 20
        Meteor.call(                                                                                             // 21
            oAuth2Server.methodNames.authCodeGrant,                                                              // 22
            client_id,                                                                                           // 23
            redirect_uri,                                                                                        // 24
            response_type,                                                                                       // 25
            scope,                                                                                               // 26
            state,                                                                                               // 27
            callback                                                                                             // 28
        );                                                                                                       // 29
    }                                                                                                            // 30
};                                                                                                               // 31
                                                                                                                 // 32
                                                                                                                 // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['prime8consulting:meteor-oauth2-server'] = {}, {
  oAuth2Server: oAuth2Server
});

})();

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
var parseStyle, keybindingsModal;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/clinical_modals/packages/clinical_modals.js                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
(function () {                                                                                                    // 1
                                                                                                                  // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                          //    // 4
// packages/clinical:modals/client/modals.js                                                                //    // 5
//                                                                                                          //    // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                            //    // 8
                                                                                                            // 1  // 9
                                                                                                            // 2  // 10
Template.registerHelper("getModalPosition", function (argument){                                            // 3  // 11
  return parseStyle({                                                                                       // 4  // 12
    //"left": Session.get('mainPanelLeft') + "px; top: 100px;"                                              // 5  // 13
    "left": Session.get('mainPanelLeft') - 8 + "px; top: 90px;"                                             // 6  // 14
  });                                                                                                       // 7  // 15
});                                                                                                         // 8  // 16
Template.registerHelper("getVerticalModal", function (argument){                                            // 9  // 17
  return parseStyle({                                                                                       // 10
    "left": Session.get('mainPanelLeft') + "px; top: 100px !important; position:absolute; height: " + ($(window).height() - 200) + "px;"
  });                                                                                                       // 12
});                                                                                                         // 13
                                                                                                            // 14
// TODO:  add a dependency to photonic:style package                                                        // 15
// extract this to external object                                                                          // 16
parseStyle= function (json) {                                                                               // 17
  var result = "";                                                                                          // 18
  $.each(json, function (i, val) {                                                                          // 19
    result = result + i + ":" + val + " ";                                                                  // 20
  });                                                                                                       // 21
  return result;                                                                                            // 22
};                                                                                                          // 23
                                                                                                            // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 33
                                                                                                                  // 34
}).call(this);                                                                                                    // 35
                                                                                                                  // 36
                                                                                                                  // 37
                                                                                                                  // 38
                                                                                                                  // 39
                                                                                                                  // 40
                                                                                                                  // 41
(function () {                                                                                                    // 42
                                                                                                                  // 43
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 44
//                                                                                                          //    // 45
// packages/clinical:modals/client/confirmModal/template.confirmModal.js                                    //    // 46
//                                                                                                          //    // 47
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 48
                                                                                                            //    // 49
                                                                                                            // 1  // 50
Template.__checkName("confirmModal");                                                                       // 2  // 51
Template["confirmModal"] = new Template("Template.confirmModal", (function() {                              // 3  // 52
  var view = this;                                                                                          // 4  // 53
  return HTML.DIV({                                                                                         // 5  // 54
    id: "confirmModal",                                                                                     // 6  // 55
    "class": "helveticas modal fade"                                                                        // 7  // 56
  }, "\n    ", HTML.DIV({                                                                                   // 8  // 57
    "class": "modal-dialog"                                                                                 // 9  // 58
  }, "\n      ", HTML.DIV({                                                                                 // 10
    "class": "modal-content"                                                                                // 11
  }, "\n        ", HTML.DIV({                                                                               // 12
    "class": "modal-header"                                                                                 // 13
  }, "\n          ", HTML.Raw('<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->'), "\n          ", HTML.H4({
    id: "confirmModalTitle"                                                                                 // 15
  }, Blaze.View("lookup:getConfirmationTitle", function() {                                                 // 16
    return Spacebars.mustache(view.lookup("getConfirmationTitle"));                                         // 17
  })), "\n        "), "\n        ", HTML.DIV({                                                              // 18
    id: "confirmModalMessage",                                                                              // 19
    "class": "modal-body"                                                                                   // 20
  }, "\n          ", Blaze.View("lookup:getConfirmationMessage", function() {                               // 21
    return Spacebars.mustache(view.lookup("getConfirmationMessage"));                                       // 22
  }), "\n        "), "\n        ", HTML.Raw("<!-- dialog buttons -->"), "\n        ", HTML.Raw('<div class="modal-footer">\n          <button id="modalCancelButton" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n          <button id="modalConfirmButton" type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>\n        </div>'), "\n      "), "\n    "), "\n  ");
}));                                                                                                        // 24
                                                                                                            // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 75
                                                                                                                  // 76
}).call(this);                                                                                                    // 77
                                                                                                                  // 78
                                                                                                                  // 79
                                                                                                                  // 80
                                                                                                                  // 81
                                                                                                                  // 82
                                                                                                                  // 83
(function () {                                                                                                    // 84
                                                                                                                  // 85
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 86
//                                                                                                          //    // 87
// packages/clinical:modals/client/confirmModal/confirmModal.js                                             //    // 88
//                                                                                                          //    // 89
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 90
                                                                                                            //    // 91
Session.setDefault('confirmMessage', 'Penicillin is made from oranges.');                                   // 1  // 92
Session.setDefault('confirmTitle', 'Hello Modal!');                                                         // 2  // 93
Session.setDefault('confirmDialogIsConfirmed', false);                                                      // 3  // 94
                                                                                                            // 4  // 95
Template.confirmModal.helpers({                                                                             // 5  // 96
  getConfirmationMessage: function () {                                                                     // 6  // 97
    return Session.get('confirmMessage');                                                                   // 7  // 98
  },                                                                                                        // 8  // 99
  getConfirmationTitle: function () {                                                                       // 9  // 100
    return Session.get('confirmTitle');                                                                     // 10
  }                                                                                                         // 11
});                                                                                                         // 12
Template.confirmModal.events({                                                                              // 13
  'click #modalConfirmButton': function () {                                                                // 14
    Session.set('inPageAlertType', 'success');                                                              // 15
    Session.set('inPageAlertText', 'success');                                                              // 16
    Session.set('confirmDialogIsConfirmed', true);                                                          // 17
  }                                                                                                         // 18
});                                                                                                         // 19
                                                                                                            // 20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 112
                                                                                                                  // 113
}).call(this);                                                                                                    // 114
                                                                                                                  // 115
                                                                                                                  // 116
                                                                                                                  // 117
                                                                                                                  // 118
                                                                                                                  // 119
                                                                                                                  // 120
(function () {                                                                                                    // 121
                                                                                                                  // 122
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 123
//                                                                                                          //    // 124
// packages/clinical:modals/client/promptModal/template.promptModal.js                                      //    // 125
//                                                                                                          //    // 126
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 127
                                                                                                            //    // 128
                                                                                                            // 1  // 129
Template.__checkName("promptModal");                                                                        // 2  // 130
Template["promptModal"] = new Template("Template.promptModal", (function() {                                // 3  // 131
  var view = this;                                                                                          // 4  // 132
  return HTML.Raw('<div id="promptModal" class="modal fade">\n    <div class="modal-dialog">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal">&times;</button>\n          <h4>Hello Modal!</h4>\n        </div>\n        <div class="modal-body">\n          Penicillin is made from oranges.\n        </div>\n        <!-- dialog buttons -->\n        <div class="modal-footer">\n          <button id="modalOkButton" type="button" class="btn btn-primary" data-dismiss="modal">OK</button>\n        </div>\n      </div>\n    </div>\n  </div>');
}));                                                                                                        // 6  // 134
                                                                                                            // 7  // 135
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 136
                                                                                                                  // 137
}).call(this);                                                                                                    // 138
                                                                                                                  // 139
                                                                                                                  // 140
                                                                                                                  // 141
                                                                                                                  // 142
                                                                                                                  // 143
                                                                                                                  // 144
(function () {                                                                                                    // 145
                                                                                                                  // 146
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 147
//                                                                                                          //    // 148
// packages/clinical:modals/client/promptModal/promptModal.js                                               //    // 149
//                                                                                                          //    // 150
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 151
                                                                                                            //    // 152
Template.promptModal.rendered = function () {                                                               // 1  // 153
  $("#promptModal").modal({ // wire up the actual modal functionality and show the dialog                   // 2  // 154
    "backdrop": "static",                                                                                   // 3  // 155
    "keyboard": true,                                                                                       // 4  // 156
    "show": false // ensure the modal is shown immediately                                                  // 5  // 157
  });                                                                                                       // 6  // 158
                                                                                                            // 7  // 159
  $("#promptModal").on("show", function () { // wire up the OK button to dismiss the modal when shown       // 8  // 160
    $("#promptModal #modalOkButton").on("click", function (e) {                                             // 9  // 161
      console.log("button pressed"); // just as an example...                                               // 10
      $("#promptModal").modal('hide'); // dismiss the dialog                                                // 11
    });                                                                                                     // 12
  });                                                                                                       // 13
                                                                                                            // 14
  $("#promptModal").on("hide", function () { // remove the event listeners when the dialog is dismissed     // 15
    $("#promptModal a.btn").off("click");                                                                   // 16
  });                                                                                                       // 17
                                                                                                            // 18
  $("#promptModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden // 19
    $("#promptModal").remove();                                                                             // 20
  });                                                                                                       // 21
};                                                                                                          // 22
                                                                                                            // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 176
                                                                                                                  // 177
}).call(this);                                                                                                    // 178
                                                                                                                  // 179
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:modals'] = {}, {
  keybindingsModal: keybindingsModal
});

})();

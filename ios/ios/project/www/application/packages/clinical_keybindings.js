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
var keybindingsModal = Package['clinical:modals'].keybindingsModal;
var Mousetrap = Package['mousetrap:mousetrap'].Mousetrap;
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

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/clinical_keybindings/packages/clinical_keybindings.js                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function () {                                                                                 // 1
                                                                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                      //     // 4
// packages/clinical:keybindings/client/components/keybindingsModal/template.keybinding //     // 5
//                                                                                      //     // 6
//////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                        //     // 8
                                                                                        // 1   // 9
Template.__checkName("keybindingsModal");                                               // 2   // 10
Template["keybindingsModal"] = new Template("Template.keybindingsModal", (function() {  // 3   // 11
  var view = this;                                                                      // 4   // 12
  return HTML.DIV({                                                                     // 5   // 13
    id: "keybindingsModal",                                                             // 6   // 14
    "class": function() {                                                               // 7   // 15
      return [ "modal helveticas ", Spacebars.mustache(view.lookup("getVisibility")) ]; // 8   // 16
    },                                                                                  // 9   // 17
    style: function() {                                                                 // 10  // 18
      return Spacebars.mustache(view.lookup("getModalPosition"));                       // 11  // 19
    }                                                                                   // 12  // 20
  }, HTML.Raw('\n    <div class="modal-dialog" data-dismiss="modal">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h2>Keybindings!</h2>\n        </div>\n        <div class="modal-body">\n          <h4>Supporting the following keyboard events:  </h4>\n          <ul>\n            <li><strong>cmd + ctrl + k</strong><span class="description">keybindings panel</span></li>\n            <li><strong>cmd + ctrl + l</strong><span class="description">show/hide inbox and outbox</span></li>\n            <li><strong>cmd + ctrl + r</strong><span class="description">show/hide account cards</span></li>\n            <li><strong>cmd + ctrl + n</strong><span class="description">show/hide navbars</span></li>\n            <li><strong>cmd + ctrl + s</strong><span class="description">show/hide searchbar</span></li>\n            <li><strong>cmd + ctrl + c</strong><span class="description">page/card</span></li>\n          </ul>\n        </div>\n        <div class="modal-footer">\n          <button id="modalOkButton" type="button" class="btn btn-primary">OK</button>\n        </div>\n      </div>\n    </div>\n  '));
}));                                                                                    // 14  // 22
                                                                                        // 15  // 23
//////////////////////////////////////////////////////////////////////////////////////////     // 24
                                                                                               // 25
}).call(this);                                                                                 // 26
                                                                                               // 27
                                                                                               // 28
                                                                                               // 29
                                                                                               // 30
                                                                                               // 31
                                                                                               // 32
(function () {                                                                                 // 33
                                                                                               // 34
//////////////////////////////////////////////////////////////////////////////////////////     // 35
//                                                                                      //     // 36
// packages/clinical:keybindings/client/components/keybindingsModal/keybindingsModal.js //     // 37
//                                                                                      //     // 38
//////////////////////////////////////////////////////////////////////////////////////////     // 39
                                                                                        //     // 40
                                                                                        // 1   // 41
Template.keybindingsModal.events({                                                      // 2   // 42
  "click #modalOkButton": function (event, template) {                                  // 3   // 43
    Session.set('show_keybindings', false);                                             // 4   // 44
    Session.set('showReactiveOverlay', false);                                          // 5   // 45
  }                                                                                     // 6   // 46
});                                                                                     // 7   // 47
                                                                                        // 8   // 48
Template.keybindingsModal.helpers({                                                     // 9   // 49
  getVisibility: function () {                                                          // 10  // 50
    if (Session.get('show_keybindings')) {                                              // 11  // 51
      return "visible";                                                                 // 12  // 52
    } else {                                                                            // 13  // 53
      return "fade";                                                                    // 14  // 54
    }                                                                                   // 15  // 55
  }                                                                                     // 16  // 56
});                                                                                     // 17  // 57
                                                                                        // 18  // 58
//////////////////////////////////////////////////////////////////////////////////////////     // 59
                                                                                               // 60
}).call(this);                                                                                 // 61
                                                                                               // 62
                                                                                               // 63
                                                                                               // 64
                                                                                               // 65
                                                                                               // 66
                                                                                               // 67
(function () {                                                                                 // 68
                                                                                               // 69
//////////////////////////////////////////////////////////////////////////////////////////     // 70
//                                                                                      //     // 71
// packages/clinical:keybindings/client/keybindings.js                                  //     // 72
//                                                                                      //     // 73
//////////////////////////////////////////////////////////////////////////////////////////     // 74
                                                                                        //     // 75
Meteor.startup(function () {                                                            // 1   // 76
  //console.log('Configuring keybindings...');                                          // 2   // 77
                                                                                        // 3   // 78
  Session.setDefault('show_keybindings', false);                                        // 4   // 79
  Session.setDefault('mainPanelIsCard', true);                                          // 5   // 80
                                                                                        // 6   // 81
  Session.setDefault('showSearchbar', false);                                           // 7   // 82
  Session.setDefault('showNavbars', true);                                              // 8   // 83
  Session.setDefault('showSidebar', false);                                             // 9   // 84
                                                                                        // 10  // 85
  Session.setDefault('showAccountCard', false);                                         // 11  // 86
  Session.setDefault('showRightCard', false);                                           // 12  // 87
                                                                                        // 13  // 88
  Session.setDefault('useHierarchicalLayout', false);                                   // 14  // 89
                                                                                        // 15  // 90
  Session.setDefault('hasPageVerticalPadding', true);                                   // 16  // 91
  Session.setDefault("hasFooterPadding", false);                                        // 17  // 92
  Session.setDefault("wideSecondPanel", false);                                         // 18  // 93
                                                                                        // 19  // 94
  Session.setDefault('zoom', 100);                                                      // 20  // 95
                                                                                        // 21  // 96
  Mousetrap.bind('ctrl+command+k', function () {                                        // 22  // 97
    Session.toggle('show_keybindings');                                                 // 23  // 98
    Session.toggle('showReactiveOverlay');                                              // 24  // 99
  });                                                                                   // 25  // 100
  Mousetrap.bind('ctrl+command+l', function () {                                        // 26  // 101
    Session.toggle('showInboxCard');                                                    // 27  // 102
    Session.toggle('showOutboxCard');                                                   // 28  // 103
    Session.toggle('showFormBuilderCard');                                              // 29  // 104
  });                                                                                   // 30  // 105
  Mousetrap.bind('ctrl+command+i', function () {                                        // 31  // 106
    Session.toggle('showInboxCard');                                                    // 32  // 107
  });                                                                                   // 33  // 108
  Mousetrap.bind('ctrl+command+r', function () {                                        // 34  // 109
    Session.toggle('showAccountCard');                                                  // 35  // 110
    Session.toggle('showRightCard');                                                    // 36  // 111
  });                                                                                   // 37  // 112
  Mousetrap.bind('ctrl+command+n', function () {                                        // 38  // 113
    Session.toggle('showNavbars');                                                      // 39  // 114
  });                                                                                   // 40  // 115
  // Mousetrap.bind('ctrl+command+m', function () {                                     // 41  // 116
  //   Session.toggle('showSidebar');                                                   // 42  // 117
  // });                                                                                // 43  // 118
  Mousetrap.bind('ctrl+command+s', function () {                                        // 44  // 119
    Session.toggle('showSearchbar');                                                    // 45  // 120
  });                                                                                   // 46  // 121
  Mousetrap.bind('ctrl+command+a', function () {                                        // 47  // 122
    console.log('ctrl+command+d');                                                      // 48  // 123
    Session.toggle('useHierarchicalLayout');                                            // 49  // 124
  });                                                                                   // 50  // 125
  Mousetrap.bind('ctrl+command+c', function () {                                        // 51  // 126
    Session.toggle('mainPanelIsCard');                                                  // 52  // 127
  });                                                                                   // 53  // 128
  Mousetrap.bind('ctrl+command+w', function () {                                        // 54  // 129
    Session.toggle('wideCard');                                                         // 55  // 130
  });                                                                                   // 56  // 131
                                                                                        // 57  // 132
  Mousetrap.bind('ctrl+command+y', function () {                                        // 58  // 133
    Session.toggle('showOutboxCard');                                                   // 59  // 134
    Session.toggle('outboxCardOpen');                                                   // 60  // 135
  });                                                                                   // 61  // 136
  Mousetrap.bind('ctrl+command+g', function () {                                        // 62  // 137
    Session.toggle('hasPageBorder');                                                    // 63  // 138
  });                                                                                   // 64  // 139
  Mousetrap.bind('ctrl+command+p', function () {                                        // 65  // 140
    Session.toggle('hasPagePadding');                                                   // 66  // 141
  });                                                                                   // 67  // 142
                                                                                        // 68  // 143
                                                                                        // 69  // 144
  Mousetrap.bind('ctrl+command+q', function () {                                        // 70  // 145
    Session.toggle('navIsFullscreen');                                                  // 71  // 146
  });                                                                                   // 72  // 147
  // Mousetrap.bind('ctrl+command+h', function () {                                     // 73  // 148
  //   Session.toggle('pageLeftToWestRule');                                            // 74  // 149
  // });                                                                                // 75  // 150
  Mousetrap.bind('ctrl+command+j', function () {                                        // 76  // 151
    Session.toggle('pageIsWide');                                                       // 77  // 152
  });                                                                                   // 78  // 153
  Mousetrap.bind('ctrl+command+r', function () {                                        // 79  // 154
    Session.toggle('useCardLayout');                                                    // 80  // 155
  });                                                                                   // 81  // 156
  Mousetrap.bind('ctrl+command+m', function () {                                        // 82  // 157
    Session.toggle('hasPageVerticalPadding');                                           // 83  // 158
  });                                                                                   // 84  // 159
  Mousetrap.bind('ctrl+command+v', function () {                                        // 85  // 160
    Session.toggle('useVerticalFences');                                                // 86  // 161
  });                                                                                   // 87  // 162
  Mousetrap.bind('ctrl+command+h', function () {                                        // 88  // 163
    Session.toggle('useHorizontalFences');                                              // 89  // 164
  });                                                                                   // 90  // 165
                                                                                        // 91  // 166
  Mousetrap.bind('ctrl+command+b', function () {                                        // 92  // 167
    Session.toggle('appSurfaceOffset');                                                 // 93  // 168
  });                                                                                   // 94  // 169
  Mousetrap.bind('ctrl+command+e', function () {                                        // 95  // 170
    Session.toggle('useEastFence');                                                     // 96  // 171
  });                                                                                   // 97  // 172
                                                                                        // 98  // 173
  Mousetrap.bind('ctrl+command+z', function () {                                        // 99  // 174
    Session.toggle('hasFooterPadding');                                                 // 100
  });                                                                                   // 101
  Mousetrap.bind('ctrl+command+x', function () {                                        // 102
    Session.toggle('wideSecondPanel');                                                  // 103
  });                                                                                   // 104
                                                                                        // 105
  Mousetrap.bind('ctrl+command+=', function () {                                        // 106
    Session.set('zoom', Session.get('zoom') + 10);                                      // 107
    console.log('zoom', Session.get('zoom') + "%");                                     // 108
  });                                                                                   // 109
  Mousetrap.bind('ctrl+command+-', function () {                                        // 110
    Session.set('zoom', Session.get('zoom') - 10);                                      // 111
    console.log('zoom', Session.get('zoom') + "%");                                     // 112
  });                                                                                   // 113
});                                                                                     // 114
                                                                                        // 115
//////////////////////////////////////////////////////////////////////////////////////////     // 191
                                                                                               // 192
}).call(this);                                                                                 // 193
                                                                                               // 194
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['clinical:keybindings'] = {}, {
  keybindingsModal: keybindingsModal
});

})();

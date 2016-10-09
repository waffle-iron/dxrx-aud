#!/bin/bash
x=`pwd`
git clone https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview
cd webapp
meteor add cordova:cordova-plugin-crosswalk-webview@file://$x/cordova-plugin-crosswalk-webview
meteor add cordova:cordova-plugin-meteor-webapp@https://github.com/meteor/cordova-plugin-meteor-webapp.git#10d4ddbc907b57c70070e7be4eab44a4b069b966
meteor add cordova:cordova-plugin-android-permission@https://github.com/NeoLSN/cordova-plugin-android-permission.git#ea573ee41202359e481b287d4da6cb56932472e4
meteor add cordova:cordova-plugin-camera@https://github.com/apache/cordova-plugin-camera.git#cc1076d3cb82a5185cebadccfafc075d85bdf681
meteor add cordova:cordova-plugin-bactrack@https://github.com/DxRx/cordova-plugin-bactrack.git#406c4ff7344e09b50d7d2a070e622760206668a6

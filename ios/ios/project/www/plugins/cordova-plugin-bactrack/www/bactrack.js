cordova.define("cordova-plugin-bactrack.bactrack", function(require, exports, module) {
bactrackName = "BACTrackPlugin";
bactrack = {
	initWithDelegate: function (successCallback, apiKey, timeoutSeconds) {
	    cordova.exec(successCallback, successCallback, window.bactrackName, "initWithDelegate", [apiKey,timeoutSeconds]);
	},

	connectToNearestBreathalyzer: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "connectToNearestBreathalyzer", []);
	},

	connectBreathalyzer: function  (preferredUuid,timeoutSeconds,successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "connectBreathalyzer", [preferredUuid,timeoutSeconds]);
	},

	connectBreathalyzerAsync: function  (preferredUuid,timeoutSeconds,successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "connectBreathalyzerAsync", [preferredUuid,timeoutSeconds]);
	},

	startScan: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "startScan", []);
	},

	stopScan: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "stopScan", []);
	},

	disconnect: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "disconnect", []);
	},

	startCountdown: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "startCountdown", []);
	},

	getBreathalyzerBatteryLevel: function  (successCallback, errorCallback) {
	    cordova.exec(successCallback, errorCallback, window.bactrackName, "getBreathalyzerBatteryLevel", []);
	}
    }

});

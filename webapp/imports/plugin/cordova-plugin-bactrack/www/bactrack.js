window.bactrackName = "BACTrackPlugin";
export default class BacTrackDevice {
    initWithDelegate (successCallback, apiKey, timeoutSeconds) {
	cordova.exec(successCallback, successCallback, window.bactrackName, "initWithDelegate", [apiKey,timeoutSeconds]);
    };

    connectToNearestBreathalyzer (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "connectToNearestBreathalyzer", []);
    };

    connectBreathalyzer (preferredUuid,timeoutSeconds,successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "connectBreathalyzer", [preferredUuid,timeoutSeconds]);
    };

    startScan (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "startScan", []);
    };

    stopScan (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "stopScan", []);
    };

    disconnect (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "disconnect", []);
    };

    startCountdown (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "startCountdown", []);
    };

    getBreathalyzerBatteryLevel (successCallback, errorCallback) {
	cordova.exec(successCallback, errorCallback, window.bactrackName, "getBreathalyzerBatteryLevel", []);
    };
}

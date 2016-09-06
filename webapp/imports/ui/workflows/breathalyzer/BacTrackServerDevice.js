import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

var _BacTrackServerState = {
    behaviorCursor:0,
    successCallbacks: [],
    errorCallbacks: [],
    plannedBehaviors: []
    };
var _BacTrackServerStateDispatch = {
	sleep: function(index,step,args) {sim_sleep(index,step,args)},
	initWithDelegate: function(index,step,args) {sim_initWithDelegate(index,step,args)},
	connectToNearestBreathalyzer: function(index,step,args) {sim_connectToNearestBreathalyzer(index,step,args)},
	connectBreathalyzer: function(index,step,args) {sim_connectBreathalyzer(index,step,args)},
	startScan: function(index,step,args) {sim_startScan(index,step,args)},
	stopScan: function(index,step,args) {sim_stopScan(index,step,args)},
	disconnect: function(index,step,args) {sim_disconnect(index,step,args)},
	startCountdown: function(index,step,args) {sim_startCountdown(index,step,args)},
	getBreathalyzerBatteryLevel: function(index,step,args) {sim_etBreathalyzerBatteryLevel(index,step,args)},
	BacTrackAPIKeyDeclined: function(index,step,args) {sim_BacTrackAPIKeyDeclined(index,step,args)},
	BacTrackAPIKeyAuthorized: function(index,step,args) {sim_BacTrackAPIKeyAuthorized(index,step,args)},
	BacTrackConnectedOld: function(index,step,args) {sim_BacTrackConnectedOld(index,step,args)},
	BacTrackConnected: function(index,step,args) {sim_BacTrackConnected(index,step,args)},
	BacTrackDisconnected: function(index,step,args) {sim_BacTrackDisconnected(index,step,args)},
	BacTrackCountdown: function(index,step,args) {sim_BacTrackCountdown(index,step,args)},
	BacTrackStart: function(index,step,args) {sim_BacTrackStart(index,step,args)},
	BacTrackBlow: function(index,step,args) {sim_BacTrackBlow(index,step,args)},
	BacTrackAnalyzing: function(index,step,args) {sim_BacTrackAnalyzing(index,step,args)},
	BacTrackResults: function(index,step,args) {sim_BacTrackResults(index,step,args)},
	BacTrackError: function(index,step,args) {sim_BacTrackError(index,step,args)},
	BacTrackConnectTimeout: function(index,step,args) {sim_BacTrackConnectTimeout(index,step,args)},
	BacTrackGetTimeout: function(index,step,args) {sim_BacTrackGetTimeout(index,step,args)},
	BacTrackFoundBreathalyzer: function(index,step,args) {sim_BacTrackFoundBreathalyzer(index,step,args)},
	BacTrackSerial: function(index,step,args) {sim_BacTrackSerial(index,step,args)},
	BacTrackBatteryLevel: function(index,step,args) {sim_BacTrackBatteryLevel(index,step,args)},
    };

function planBehaviors (behaviors) {
    _BacTrackServerState.plannedBehaviors = behaviors;
    behaviorCursor = 0;
}

function nextBehavior (functionName, successCallback, errorCallback, args) {
    for (var i = _BacTrackServerState.behaviorCursor; i < _BacTrackServerState.plannedBehaviors.length; ++i) {
	if (_BacTrackServerState.plannedBehaviors[i].call.equals(functionName)) {
	    _BacTrackServerState.behaviorCursor = i+1;
	    executeBehavior(i, _BacTrackServerState.plannedBehaviors[i], successCallback, errorCallback, args);
	}
    }
}
function executeBehavior (index,plan, successCallback, errorCallback, args) {
    _successCallback[index] = successCallback;
    _errorCallback[index] = errorCallback;
    Meteor.call('bactrackloopback.executeBehaviorAsync',index,plan,args,function(error,result) {
	    if (error) {
		console.log("Async call produced error: " + error);
	    }
	    // Ignore results -- there aren't any interesting synchronous results with the bactrack,
	    // All of the interesting results are passed in callbacks.
	});
}
function  executeBehaviorAsync (index,plan,args) {
    var steps = plan.steps;
    for (var i = 0; i < steps.length; ++i) {
	if (_BacTrackServerStateDispatch[steps[i][0]]) {
	    _BacTrackServerStateDispatch[steps[i][0]](index,steps[i],args);
	} else {
	    console.log("Bad test: " + steps[i][0]);
	}
    }
}
function sim_sleep (index,step,args) {
    Meteor._sleepForMs(step[1]); 
}
function sim_initWithDelegate (index,step,args) {
    if (step[1].equals("fail")) {
	_BacTrackServerState.errorCallbacks[index]("BacTrackAPIKeyDeclined",[]);
    } else {
	_BacTrackServerState.successCallbacks[index]("BacTrackAPIKeyAuthorized",[]);
    }
}
function sim_connectToNearestBreathalyzer (index, step,args) {
    // Do Nothing, test plan should include separate BacTrackConnected
}
function sim_connectBreathalyzer (index, step,args) {
    // Do Nothing, test plan should include separate BacTrackConnected
}
function sim_startScan (index, step,args) {
    // Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
}
function sim_stopScan (index, step,args) {
    // Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
}
function sim_disconnect (index, step,args) {
    // Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
}
function sim_startCountdown (index, step,args) {
    // Do Nothing, test plan should include separate countdown steps.
}
function sim_getBreathalyzerBatteryLevel (index, step,args) {
    // Do Nothing, test plan should include separate batter level
}
function sim_BacTrackAPIKeyDeclined (index, step,args) {
    _BacTrackServerState.errorCallbacks[index]("BacTrackAPIKeyDeclined",[]);
}	

function BacTrackAPIKeyAuthorized (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackAPIKeyAuthorized",step.slice(1));
}
function sim_BacTrackConnectedOld (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackConnectedOld",step.slice(1));
}
function sim_BacTrackConnected (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackConnected",step.slice(1));
}
function sim_BacTrackDisconnected (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackDisconnected",step.slice(1));
}
function sim_BacTrackCountdown (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackCountdown",step.slice(1));
}
function sim_BacTrackStart (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackStart",step.slice(1));
}
function sim_BacTrackBlow (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackBlow",step.slice(1));
}
function sim_BacTrackAnalyzing (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackAnalyzing",step.slice(1));
}
function sim_BacTrackResults (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackResults",step.slice(1));
}
function sim_BacTrackError (index, step,args) {
    _errorCCallbacks[index]("BacTrackError",step.slice(1));
}
function sim_BacTrackConnectTimeout (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackConnectTimeout",step.slice(1));
}
function sim_BacTrackGetTimeout (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackGetTimeout",step.slice(1));
}
function sim_BacTrackFoundBreathalyzer (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackFoundBreathalyzer",step.slice(1));
}
function sim_BacTrackSerial (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackSerial",step.slice(1));
}
function sim_BacTrackBatteryLevel (index, step,args) {
    _BacTrackServerState.successCallbacks[index]("BacTrackBatteryLevel",step.slice(1));
}
export function initWithDelegate (successCallback, apiKey, timeoutSeconds) {
    init();
    console.log("In bactrackloopback initwithdelegate");
    nextBehavior("initWithDelegate", successCallback, successCallback, [apiKey,timeoutSeconds]);
}
export function connectToNearestBreathalyzer (successCallback, errorCallback) {
    nextBehavior("connectToNearestBreathalyzer", successCallback, errorCallback, []);
}
export function connectBreathalyzer (preferredUuid,timeoutSeconds,successCallback, errorCallback) {
    nextBehavior("connectBreathalyzer",successCallback, errorCallback, [preferredUuid,timeoutSeconds]);
}
export function startScan (successCallback, errorCallback) {
    nextBehavior("startScan",successCallback, errorCallback, []);
}
export function stopScan (successCallback, errorCallback) {
    nextBehavior("stopScan",successCallback, errorCallback, []);
}
export function disconnect (successCallback, errorCallback) {
    nextBehavior("disconnect",successCallback, errorCallback, []);
}
export function startCountdown (successCallback, errorCallback) {
    nextBehavior("startCountdown",successCallback, errorCallback, []);
}
export function getBreathalyzerBatteryLevel (successCallback, errorCallback) {
    nextBehavior("getBreathalyzerBatteryLevel",successCallback, errorCallback, []);
}





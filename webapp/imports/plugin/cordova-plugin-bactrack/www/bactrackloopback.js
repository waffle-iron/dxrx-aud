import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

console.log("In bactrackloopback");


export class BacTrackDevice extends React.Component {

    constructor () {
	super();
	_behaviorCursor = 0;
	_successCallbacks = [];
	_errorCallbacks = [];
	_plannedBehaviors = [];
    };

    planbehaviors (behaviors) {
	_plannedBehaviors = behaviors;
	behaviorCursor = 0;
    };

    nextBehavior (functionName, successCallback, errorCallback, args) {
	for (var i = _behaviorCursor; i < _plannedBehaviors.length; ++i) {
	    if (_plannedBehaviors[i].call.equals(functionName)) {
		_behaviorCursor = i+1;
		executeBehavior(i, _plannedBehaviors[i], successCallback, errorCallback, args);
	    }
	}
    };
    executeBehavior (index,plan, successCallback, errorCallback, args) {
	_successCallback[index] = successCallback;
	_errorCallback[index] = errorCallback;
	Meteor.call('bactrackloopback.executeBehaviorAsync',index,plan,args,function(error,result) {
		if (error) {
		    console.log("Async call produced error: " + error);
		}
		// Ignore results -- there aren't any interesting synchronous results with the bactrack,
		// All of the interesting results are passed in callbacks.
	    });
    };
    executeBehaviorAsync (index,plan,args) {
	var steps = plan.steps;
	for (var i = 0; i < steps.length; ++i) {
	    if (dispatch[steps[i][0]]) {
		dispatch[steps[i][0]](index,steps[i],args);
	    } else {
		console.log("Bad test: " + steps[i][0]);
	    }
	}
    };
    sim_sleep (index,step,args) {
	Meteor._sleepForMs(step[1]); 
    };
    sim_initWithDelegate (index,step,args) {
	if (step[1].equals("fail")) {
	    _errorCallbacks[index]("BacTrackAPIKeyDeclined",[]);
	} else {
	    _successCallbacks[index]("BacTrackAPIKeyAuthorized",[]);
	}
    };
    sim_connectToNearestBreathalyzer (index, step,args) {
	// Do Nothing, test plan should include separate BacTrackConnected
    };
    sim_connectBreathalyzer (index, step,args) {
	// Do Nothing, test plan should include separate BacTrackConnected
    };
    sim_startScan (index, step,args) {
	// Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
    };
    sim_stopScan (index, step,args) {
	// Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
    };
    sim_disconnect (index, step,args) {
	// Do Nothing, test plan should include separate BacTrackFoundBreathalyzer
    };
    sim_startCountdown (index, step,args) {
	// Do Nothing, test plan should include separate countdown steps.
    };
    sim_getBreathalyzerBatteryLevel (index, step,args) {
	// Do Nothing, test plan should include separate batter level
    };
    sim_BacTrackAPIKeyDeclined (index, step,args) {
	_errorCallbacks[index]("BacTrackAPIKeyDeclined",[]);
    };	
    BacTrackAPIKeyAuthorized (index, step,args) {
	_successCallbacks[index]("BacTrackAPIKeyAuthorized",step.slice(1));
    };
    sim_BacTrackConnectedOld (index, step,args) {
	_successCallbacks[index]("BacTrackConnectedOld",step.slice(1));
    };
    sim_BacTrackConnected (index, step,args) {
	_successCallbacks[index]("BacTrackConnected",step.slice(1));
    };
    sim_BacTrackDisconnected (index, step,args) {
	_successCallbacks[index]("BacTrackDisconnected",step.slice(1));
    };
    sim_BacTrackCountdown (index, step,args) {
	_successCallbacks[index]("BacTrackCountdown",step.slice(1));
    };
    sim_BacTrackStart (index, step,args) {
	_successCallbacks[index]("BacTrackStart",step.slice(1));
    };
    sim_BacTrackBlow (index, step,args) {
	_successCallbacks[index]("BacTrackBlow",step.slice(1));
    };
    sim_BacTrackAnalyzing (index, step,args) {
	_successCallbacks[index]("BacTrackAnalyzing",step.slice(1));
    };
    sim_BacTrackResults (index, step,args) {
	_successCallbacks[index]("BacTrackResults",step.slice(1));
    };
    sim_BacTrackError (index, step,args) {
	_errorCCallbacks[index]("BacTrackError",step.slice(1));
    };
    sim_BacTrackConnectTimeout (index, step,args) {
	_successCallbacks[index]("BacTrackConnectTimeout",step.slice(1));
    };
    sim_BacTrackGetTimeout (index, step,args) {
	_successCallbacks[index]("BacTrackGetTimeout",step.slice(1));
    };
    sim_BacTrackFoundBreathalyzer (index, step,args) {
	_successCallbacks[index]("BacTrackFoundBreathalyzer",step.slice(1));
    };
    sim_BacTrackSerial (index, step,args) {
	_successCallbacks[index]("BacTrackSerial",step.slice(1));
    };
    sim_BacTrackBatteryLevel (index, step,args) {
	_successCallbacks[index]("BacTrackBatteryLevel",step.slice(1));
    };
    dispatch = {
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
    initWithDelegate(successCallback, apiKey, timeoutSeconds) {
	console.log("In bactrackloopback initwithdelegate");
	nextBehavior("initWithDelegate", successCallback, successCallback, [apiKey,timeoutSeconds]);
    };
    connectToNearestBreathalyzer(successCallback, errorCallback) {
	nextBehavior("connectToNearestBreathalyzer", successCallback, errorCallback, []);
    };
    connectBreathalyzer(preferredUuid,timeoutSeconds,successCallback, errorCallback) {
	nextBehavior("connectBreathalyzer",successCallback, errorCallback, [preferredUuid,timeoutSeconds]);
    };
    startScan(successCallback, errorCallback) {
	nextBehavior("startScan",successCallback, errorCallback, []);
    };
    stopScan(successCallback, errorCallback) {
	nextBehavior("stopScan",successCallback, errorCallback, []);
    };
    disconnect(successCallback, errorCallback) {
	nextBehavior("disconnect",successCallback, errorCallback, []);
    };
    startCountdown(successCallback, errorCallback) {
	nextBehavior("startCountdown",successCallback, errorCallback, []);
    };
    getBreathalyzerBatteryLevel(successCallback, errorCallback) {
	nextBehavior("getBreathalyzerBatteryLevel",successCallback, errorCallback, []);
    };
}



import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { initWithDelegate, connectToNearestBreathalyzer, connectBreathalyzer, startScan, stopScan,disconnect, startCountdown,getBreathalyzerBatteryLevel } from './BacTrackServerDevice';

import DatePicker from 'react-toolbox/lib/date_picker';

Session.setDefault('bacTrackSt', {
	lastBacTrackState: 'noBacTrack',
	    lastMajorBacTrackState: 'noBacTrack',
	    initialized: false,
	    errorMessage: undefined,
	    bac: undefined,
	    isConnected: false,
	    scanStopped: false,
	    connectionFailed: false,
	    countdown: 0,
	    preferreduuid: undefined,
	    deviceType: 0,
	    devicesFound: {},
	    serial: undefined,
	    batteryLevel: undefined,
	    lastnull: undefined
	    });

export default class BacTrack extends React.Component {

    constructor (props) {
	super(props);
	Initialize();
    }
}

export function Initialize () {
    console.log("Setting bacTrackSt");
    Session.set('bacTrackSt', {
	    lastBacTrackState: 'noBacTrack',
		lastMajorBacTrackState: 'noBacTrack',
		errorMessage: undefined,
		initialized: true,
		bac: undefined,
		isConnected: false,
		scanStopped: false,
		connectionFailed: false,
		countdown: 0,
		preferreduuid: undefined,
		deviceType: 0,
		devicesFound: {},
		serial: undefined,
		batteryLevel: undefined,
		lastnull: undefined
		});
    console.log("After setting bacTrackSt");

    if (Meteor.isCordova) {
	console.log("Initializing for Cordova");
	window.bactrack.initWithDelegate(handler,'fe3e2e6c52e04b2ba7b11cd7385481', 8);;
	console.log("After initializing for Cordova");
    } else {
	console.log("Initializing for Sim");
	initWithDelegate(handler,'fe3e2e6c52e04b2ba7b11cd7385481', 8);;
	console.log("After initializing for Sim");
    }
}

function handler (results) {
    var bacTrackSt = Session.get('bacTrackSt');
    if (! results) {
	bacTrackSt.lastnull = true;
    } else {
	var call = results.call;
	var arg1 = results.arg1;
	var arg2 = results.arg2;
	var arg3 = results.arg3;
	bacTrackSt.lastnull = false;
	bacTrackSt.lastBacTrackState = call;
	switch (call) {
	case 'BacTrackAPIKeyDeclined':
	    bacTrackSt.isConnected = false;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackAPIKeyAuthorized':
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackConnectedOld':
	    // Deprecated, should not be called (but it is!)
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = 'BacTrackConnected';
	    if (Meteor.isCordova) {
		window.bactrack.startCountdown(handler,errHandler);
	    } else {
		startCountdown(handler,errHandler);
	    }
	    break;
	case 'BacTrackConnected':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.deviceType = arg1;
	    bacTrackSt.lastMajorBacTrackState = call;
	    if (Meteor.isCordova) {
		window.bactrack.startCountdown(handler,errHandler);
	    } else {
		startCountdown(handler,errHandler);
	    }
	    break;
	case 'BacTrackDisconnected':
	    bacTrackSt.isConnected = false;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackCountdown':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = 'BacTrackCountdown';
	    bacTrackSt.countdown = arg1;
	    bacTrackSt.errorMessage = arg2;
	    break;
	case 'BacTrackStart':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackBlow':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackAnalyzing':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackResults':
	    bacTrackSt.isConnected = true;
	    bacTrackSt.lastMajorBacTrackState = call;
	    bacTrackSt.bac = arg1;
	    break;
	case 'BacTrackError':
	    bacTrackSt.isConnected = false;
	    bacTrackSt.lastMajorBacTrackState = call;
	    bacTrackSt.errorMessage = arg1;
	    break;
	case 'BacTrackConnectTimeout':
	    bacTrackSt.isConnected = false;
	    bacTrackSt.connectionFailed = true;
	    bacTrackSt.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackGetTimeout':
	    // No args, right now timeout is set at startup in the client
	    break;
	case 'BacTrackFoundBreathalyzer':
	    console.log("In foundbreathalyzer with " + arg1 + ", " + arg2);
	    bacTrackSt.isConnected = false;
	    bacTrackSt.devicesFound[arg1]=arg2;
	    console.log("Found device " + arg1 + ", " + arg2 + "; " + Object.keys(bacTrackSt.devicesFound).length);
	    if (arg1 == bacTrackSt.preferreduuid) {
		if (Meteor.isCordova) {
		    window.bactrack.stopScan(handler,errHandler);
		    window.bactrack.connectBreathalyzer(arg1,10,handler,errHandler);
		    window.bactrack.startCountdown(handler,errHandler);
		} else {
		    stopScan(handler,errHandler);
		    connectBreathalyzer(arg1,10,handler,errHandler);
		    startCountdown(handler,errHandler);
		}
	    }
	    break;
	case 'BacTrackSerial':
	    // Arg1 = serial number.
	    bacTrackSt.isConnected = true;
	    bacTrackSt.uuid = arg1;
	    break;
	case 'BacTrackBatteryLevel':
	    // Arg1 = battery level.
	    bacTrackSt.isConnected = true;
	    bacTrackSt.batteryLevel = arg1;
	    break;
	default:
	    break;
	}
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

function errHandler (results) {
    var bacTrackSt = Session.get('bacTrackSt');
    if (! results) {
	bacTrackSt.errorMessage = "";
    } else {
	bacTrackSt.errorMessage = results;
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

export function StartCountdown () {
    var bacTrackSt = Session.get('bacTrackSt');
    if (Meteor.isCordova) {
	window.bactrack.startCountdown(handler,errHandler);
    } else {
	startCountdown(handler,errHandler);
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

export function Connect (preferredUuid) {
    var bacTrackSt = Session.get('bacTrackSt');
    bacTrackSt.preferredUuid = preferredUuid;
    console.log("Connecting to " + preferredUuid);
    bacTrackSt.lastMajorBacTrackState = "BacTrackConnecting";
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
    if (Meteor.isCordova) {
	console.log("Cordova connection " + preferredUuid);
	window.bactrack.connectBreathalyzer(bacTrackSt.preferredUuid,10,handler,errHandler);
    } else {
	console.log("Simulated connection " + preferredUuid);
	connectBreathalyzer(bacTrackSt.preferredUuid,10,handler,errHandler);
    }
    console.log("Initiated connection process " + preferredUuid);
}

export function ScanAndConnect (preferredUuid) {
    var bacTrackSt = Session.get('bacTrackSt');
    bacTrackSt.preferredUuid = preferredUuid;
    bacTrackSt.scanStopped = false;
    if (Meteor.isCordova) {
	window.bactrack.startScan(handler,errHandler);
    } else {
	startScan(handler,errHandler);
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

export function Disconnect () {
    var bacTrackSt = Session.get('bacTrackSt');
    bacTrackSt.isConnected = false;
    if (Meteor.isCordova) {
	window.bactrack.disconnect();
    } else {
	disconnect();
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

export function StopScan () {
    var bacTrackSt = Session.get('bacTrackSt');
    bacTrackSt.scanStopped = true;
    if (Meteor.isCordova) {
	window.bactrack.stopScan();
    } else {
	stopScan();
    }
    Session.set('bacTrackSt',shallowCopy(bacTrackSt));
}

function shallowCopy( original ) {
    var clone = {};
    var key;
    for ( key in original ) {
	clone[ key ] = original[ key ] ;
    }
    if (clone.devicesFound.length > 0) clone.devicesFound = shallowCopy(clone.devicesFound);
    return clone;
}
BacTrack.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BacTrack.prototype, ReactMeteorData);

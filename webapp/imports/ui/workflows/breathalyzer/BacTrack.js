import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { initWithDelegate, connectToNearestBreathalyzer, connectBreathalyzer, startScan, stopScan,disconnect, startCountdown,getBreathalyzerBatteryLevel } from './BacTrackServerDevice';

import DatePicker from 'react-toolbox/lib/date_picker';

Session.setDefault('BacTrackState', {
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
    console.log("Setting BacTrackState");
    Session.set('BacTrackState', {
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
    console.log("After setting BacTrackState");

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
    var BacTrackState = Session.get('BacTrackState');
    if (! results) {
	BacTrackState.lastnull = true;
    } else {
	var call = results.call;
	var arg1 = results.arg1;
	var arg2 = results.arg2;
	var arg3 = results.arg3;
	BacTrackState.lastnull = false;
	BacTrackState.lastBacTrackState = call;
	switch (call) {
	case 'BacTrackAPIKeyDeclined':
	    BacTrackState.isConnected = false;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackAPIKeyAuthorized':
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackConnectedOld':
	    // Deprecated, should not be called (but it is!)
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = 'BacTrackConnected';
	    if (Meteor.isCordova) {
		window.bactrack.startCountdown(handler,errHandler);
	    } else {
		startCountdown(handler,errHandler);
	    }
	    break;
	case 'BacTrackConnected':
	    BacTrackState.isConnected = true;
	    BacTrackState.deviceType = arg1;
	    BacTrackState.lastMajorBacTrackState = call;
	    if (Meteor.isCordova) {
		window.bactrack.startCountdown(handler,errHandler);
	    } else {
		startCountdown(handler,errHandler);
	    }
	    break;
	case 'BacTrackDisconnected':
	    BacTrackState.isConnected = false;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackCountdown':
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = 'BacTrackCountdown';
	    BacTrackState.countdown = arg1;
	    BacTrackState.errorMessage = arg2;
	    break;
	case 'BacTrackStart':
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackBlow':
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackAnalyzing':
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackResults':
	    BacTrackState.isConnected = true;
	    BacTrackState.lastMajorBacTrackState = call;
	    BacTrackState.bac = arg1;
	    break;
	case 'BacTrackError':
	    BacTrackState.isConnected = false;
	    BacTrackState.lastMajorBacTrackState = call;
	    BacTrackState.errorMessage = arg1;
	    break;
	case 'BacTrackConnectTimeout':
	    BacTrackState.isConnected = false;
	    BacTrackState.connectionFailed = true;
	    BacTrackState.lastMajorBacTrackState = call;
	    break;
	case 'BacTrackGetTimeout':
	    // No args, right now timeout is set at startup in the client
	    break;
	case 'BacTrackFoundBreathalyzer':
	    console.log("In foundbreathalyzer with " + arg1 + ", " + arg2);
	    BacTrackState.isConnected = false;
	    BacTrackState.devicesFound[arg1]=arg2;
	    console.log("Found device " + arg1 + ", " + arg2 + "; " + Object.keys(BacTrackState.devicesFound).length);
	    if (arg1 == BacTrackState.preferreduuid) {
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
	    BacTrackState.isConnected = true;
	    BacTrackState.uuid = arg1;
	    break;
	case 'BacTrackBatteryLevel':
	    // Arg1 = battery level.
	    BacTrackState.isConnected = true;
	    BacTrackState.batteryLevel = arg1;
	    break;
	default:
	    break;
	}
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
}

function errHandler (results) {
    var BacTrackState = Session.get('BacTrackState');
    if (! results) {
	BacTrackState.errorMessage = "";
    } else {
	BacTrackState.errorMessage = results;
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
}

export function StartCountdown () {
    var BacTrackState = Session.get('BacTrackState');
    if (Meteor.isCordova) {
	window.bactrack.startCountdown(handler,errHandler);
    } else {
	startCountdown(handler,errHandler);
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
}

export function Connect (preferredUuid) {
    var BacTrackState = Session.get('BacTrackState');
    BacTrackState.preferredUuid = preferredUuid;
    console.log("Connecting to " + preferredUuid);
    BacTrackState.lastMajorBacTrackState = "BacTrackConnecting";
    Session.set('BacTrackState',shallowCopy(BacTrackState));
    if (Meteor.isCordova) {
	console.log("Cordova connection " + preferredUuid);
	window.bactrack.connectBreathalyzer(BacTrackState.preferredUuid,10,handler,errHandler);
    } else {
	console.log("Simulated connection " + preferredUuid);
	connectBreathalyzer(BacTrackState.preferredUuid,10,handler,errHandler);
    }
    console.log("Initiated connection process " + preferredUuid);
}

export function ScanAndConnect (preferredUuid) {
    var BacTrackState = Session.get('BacTrackState');
    BacTrackState.preferredUuid = preferredUuid;
    BacTrackState.scanStopped = false;
    if (Meteor.isCordova) {
	window.bactrack.startScan(handler,errHandler);
    } else {
	startScan(handler,errHandler);
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
}

export function Disconnect () {
    var BacTrackState = Session.get('BacTrackState');
    BacTrackState.isConnected = false;
    if (Meteor.isCordova) {
	window.bactrack.disconnect();
    } else {
	disconnect();
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
}

export function StopScan () {
    var BacTrackState = Session.get('BacTrackState');
    BacTrackState.scanStopped = true;
    if (Meteor.isCordova) {
	window.bactrack.stopScan();
    } else {
	stopScan();
    }
    Session.set('BacTrackState',shallowCopy(BacTrackState));
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

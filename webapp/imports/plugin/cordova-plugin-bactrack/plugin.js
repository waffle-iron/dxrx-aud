import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
//import { BacTrackDevice } from './www/bactrackloopback';

import DatePicker from 'react-toolbox/lib/date_picker';

Session.setDefault('bacTrackSt', {
	lastBacTrackState: 'noBacTrack',
	    lastMajorBacTrackState: 'noBacTrack',
	    errorMessage: undefined,
	    bac: undefined,
	    isConnected: false,
	    countdown: 0,
	    preferreduuid: undefined,
	    deviceType: 0,
	    devicesFound: [],
	    serial: undefined,
	    batteryLevel: undefined,
	    lastnull: undefined
	    });

export class BacTrack extends React.Component {

    Initialize () {
	Session.set('bacTrackSt', {
		lastBacTrackState: 'noBacTrack',
		    lastMajorBacTrackState: 'noBacTrack',
		    errorMessage: undefined,
		    bac: undefined,
		    isConnected: false,
		    countdown: 0,
		    preferreduuid: undefined,
		    deviceType: 0,
		    devicesFound: [],
		    serial: undefined,
		    batteryLevel: undefined,
		    lastnull: undefined
		    });

	window.bactrack.initWithDelegate(handler,'fe3e2e6c52e04b2ba7b11cd7385481', 8);;
    }
    handler (results) {
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
		window.bactrack.startCountdown(handler,errHandler);
		break;
	    case 'BacTrackConnected':
		bacTrackSt.isConnected = true;
		bacTrackSt.deviceType = arg1;
		bacTrackSt.lastMajorBacTrackState = call;
		window.bactrack.startCountdown(handler,errHandler);
		break;
	    case 'BacTrackDisconnected':
		bacTrackSt.isConnected = false;
		bacTrackSt.lastMajorBacTrackState = call;
		break;
	    case 'BacTrackCountdown':
		bacTrackSt.isConnected = true;
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
		bacTrackSt.lastMajorBacTrackState = call;
		break;
	    case 'BacTrackGetTimeout':
		// No args, right now timeout is set at startup in the client
		break;
	    case 'BacTrackFoundBreathalyzer':
		bacTrackSt.isConnected = false;
		bacTrackSt.devicesFound.push({arg1,arg2});
		if (arg1.equals(bacTrackSt.preferreduuid)) {
		    window.bactrack.stopScan(handler,errHandler);
		    window.bactrack.connectBreathalyzer(arg1,bacTrackTimeoutSeconds,handler,errHandler);
		    window.bactrack.startCountdown(handler,errHandler);
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

    errHandler (results) {
	if (! results) {
	    bacTrackSt.errorMessage = "";
	} else {
	    bacTrackSt.errorMessage = results;
	}
	Session.set('bacTrackSt',shallowCopy(bacTrackSt));
    }

    StartCountdown () {
	window.bactrack.startCountdown(handler,errHandler);
    }

    Connect (preferredUuid) {
	var bacTrackSt = Session.get('bacTrackSt');
	bacTrackSt.preferredUuid = preferredUuid;
	window.bactrack.connectBreathalyzer(bacTrackSt.preferredUuid,bacTrackTimeoutSeconds,handler,errHandler);
	Session.set('bacTrackSt',shallowCopy(bacTrackSt));
    }

    StopScan () {
	window.bactrack.stopScan();
    }

    shallowCopy( original ) {
	var clone = {} ;
	var key ;
	for ( key in original ) {
	    clone[ key ] = original[ key ] ;
	}
	clone.devicesFound = clone.devicesFound.slice();
	return clone ;
    }
}
BacTrack.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BacTrack.prototype, ReactMeteorData);

    
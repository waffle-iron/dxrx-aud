import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { initWithDelegate, connectBreathalyzer, startScan, stopScan,disconnect, startCountdown } from './BacTrackServerDevice';
import { shallowCopy } from './Utils.js';
import { checkAndroidPermissions } from './AndroidPermissions.js';

setTimeout(function() {console.log('Calling BacTrack InitializeDevice'); InitializeDevice();},2000);

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
  timeout: false,
  batteryLevel: undefined,
  lastnull: undefined
});

var BacTrackErrorMessages = {1: 'Timeout',
  2: 'Blow Error',
  3: 'Out of Temperature',
  4: 'Low Battery',
  5: 'Calibration failed',
  6: 'Not Calibrated',
  7: 'Com Error',
  8: 'Inflow Error',
  9: 'Solenoid Error',
  10: 'Sensor',
  11: 'BAC Upper Limit'
};

export default class BacTrack extends React.Component {

  constructor (props) {
    super(props);
  }
}

export function Initialize () {
  console.log('Setting BacTrackState');
  Session.set('BacTrackState', {
    lastBacTrackState: 'noBacTrack',
    lastMajorBacTrackState: 'noBacTrack',
    errorMessage: undefined,
    initialized: true,
    bac: undefined,
    bacTimestamp: undefined,
    isConnected: false,
    scanStopped: false,
    connectionFailed: false,
    countdown: 0,
    preferreduuid: undefined,
    deviceType: 0,
    devicesFound: {},
    serial: undefined,
    timeout: false,
    batteryLevel: undefined,
    lastnull: undefined
  });
  InitializeDevice();
}

export function InitializeDevice () {
  if (Meteor.isCordova) {
    console.log('Checking Android Permissions');
    checkAndroidPermissions();
    console.log('Initializing BacTrack');
    window.bactrack.initWithDelegate(handler,'fe3e2e6c52e04b2ba7b11cd7385481', 15);
  } else {
    initWithDelegate(handler,'fe3e2e6c52e04b2ba7b11cd7385481', 15);
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
    BacTrackState.lastnull = false;
    BacTrackState.lastBacTrackState = call;
    switch (call) {
    case 'BacTrackAPIKeyDeclined':
      BacTrackState.isConnected = false;
      BacTrackState.lastMajorBacTrackState = call;
      break;
    case 'BacTrackAPIKeyAuthorized':
      console.log('API Key Authorized');
      break;
    case 'BacTrackConnectedOld':
      // Deprecated, should not be called (but it is!)
      break;
    case 'BacTrackDidConnect':
      BacTrackState.isConnected = true;
      BacTrackState.lastMajorBacTrackState = 'BacTrackConnecting1';
      break;
    case 'BacTrackConnected':
      BacTrackState.isConnected = true;
      BacTrackState.deviceType = arg1;
      BacTrackState.lastMajorBacTrackState = call;
      window.setTimeout(function() {
        if (Meteor.isCordova) {
          console.log('BacTrackConnected: Starting Countdown');
          window.bactrack.startCountdown(handler,errHandler);
          console.log('BacTrackConnected: Returned from starting countdown');
        } else {
          startCountdown(handler,errHandler);
        }
      },500);
      break;
    case 'BacTrackDisconnected':
      BacTrackState.isConnected = false;
      BacTrackState.lastMajorBacTrackState = call;
      break;
    case 'BacTrackCountdown':
      console.log('BacTrackCountdown');
      BacTrackState.isConnected = true;
      BacTrackState.lastMajorBacTrackState = 'BacTrackCountdown';
      BacTrackState.countdown = arg1;
      BacTrackState.errorMessage = arg2;
      break;
    case 'BacTrackStart':
      console.log('BacTrackStart Starting');
      BacTrackState.isConnected = true;
      BacTrackState.lastMajorBacTrackState = call;
      if (! BacTrackState.timeout) {
        BacTrackState.timeout = window.setTimeout(function() {
          console.log('BacTrackStart timed out');
          var t = Session.get('BacTrackState');
          t.timeout = false;
          Session.set('BacTrackState',shallowCopy(t));
          if (t.lastMajorBacTrackState == 'BacTrackStart') {
            Disconnect();
          }}.bind(this), 30000);
      }
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
      console.log('Bac returned is ' + arg1);
      BacTrackState.bac = Math.floor(((arg1+0.0)+0.00099)*1000.0)/1000.0;
      console.log('Bac was truncated to ' + BacTrackState.bac);
      BacTrackState.bacTimestamp = new Date();
      break;
    case 'BacTrackError':
      BacTrackState.isConnected = false;
      BacTrackState.lastMajorBacTrackState = call;
      BacTrackState.errorMessage = BacTrackErrorMessages[arg1];
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
      console.log('In foundbreathalyzer with ' + arg1 + ', ' + arg2);
      BacTrackState.isConnected = false;
      BacTrackState.devicesFound[arg1]=arg2;
      console.log('Found device ' + arg1 + ', ' + arg2 + '; ' + Object.keys(BacTrackState.devicesFound).length);
      if (arg1 == BacTrackState.preferreduuid) {
        if (Meteor.isCordova) {
          window.bactrack.stopScan(handler,errHandler);
          window.bactrack.connectBreathalyzer(arg1,15,handler,errHandler);
        } else {
          stopScan(handler,errHandler);
          connectBreathalyzer(arg1,15,handler,errHandler);
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
      console.log('Unknown BacTrack Command: ' + call);
      break;
    }
  }
  Session.set('BacTrackState',shallowCopy(BacTrackState));
}

function errHandler (results) {
  var BacTrackState = Session.get('BacTrackState');
  if (! results) {
    BacTrackState.errorMessage = '';
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
  console.log('Connecting to ' + preferredUuid);
  BacTrackState.lastMajorBacTrackState = 'BacTrackConnecting';
  Session.set('BacTrackState',shallowCopy(BacTrackState));
  if (! BacTrackState.scanStopped) {
    StopScan();
  }
  if (Meteor.isCordova) {
    console.log('Cordova connection ' + preferredUuid);
    window.bactrack.connectBreathalyzer(BacTrackState.preferredUuid,15,handler,errHandler);
  } else {
    console.log('Simulated connection ' + preferredUuid);
    connectBreathalyzer(BacTrackState.preferredUuid,15,handler,errHandler);
  }
  console.log('Initiated connection process ' + preferredUuid);
}

export function Connecting1 (preferredUuid) {
  var BacTrackState = Session.get('BacTrackState');
  BacTrackState.preferredUuid = preferredUuid;
  console.log('Starting connection process to ' + preferredUuid);
  BacTrackState.lastMajorBacTrackState = 'BacTrackConnecting1';
  Session.set('BacTrackState',shallowCopy(BacTrackState));
  setTimeout(Connect.bind(this,preferredUuid),300);
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
  // BacTrackState.isConnected = false; (Set in a callback)
  if (Meteor.isCordova) {
    window.bactrack.disconnect();
  } else {
    disconnect();
  }
  InitializeDevice();
  Session.set('BacTrackState',shallowCopy(BacTrackState));
}

export function StopScan () {
  var BacTrackState = Session.get('BacTrackState');
  if (BacTrackState.scanStopped) {
    return;
  }
  BacTrackState.scanStopped = true;
  if (Meteor.isCordova) {
    window.bactrack.stopScan();
  } else {
    stopScan();
  }
  Session.set('BacTrackState',shallowCopy(BacTrackState));
}

BacTrack.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(BacTrack.prototype, ReactMeteorData);

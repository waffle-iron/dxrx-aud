import React from 'react';
import ReactMixin from 'react-mixin';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {DynamicSpacer} from '/imports/ui/components/DynamicSpacer';
import {Card,CardHeader,CardText,CardActions} from 'material-ui/Card';

import {Initialize as BACInitialize,ScanAndConnect,Connecting1,StartCountdown,Disconnect, StopScan} from './BacTrack';

Session.setDefault('preferredBreathalyzerUuid', undefined);


export default class BreathalyzerDetail extends React.Component {
  getMeteorData() {
    let data = Session.get('BacTrackState');
    if (typeof data === 'undefined' || typeof data.initialized === 'undefined' || !data.initialized) {
      Initialize();
      data = Session.get('BacTrackState');
    }
    if (typeof data === 'undefined') return {};
    return data;
  }
  render() {
    var haveState = true;
    var b = Session.get('BacTrackState');

    if (typeof b === 'undefined') {
      haveState = false;
    }
    console.log('In breathalyzerdetail render: ' + (haveState ? (' maj state: ' +
             b.lastMajorBacTrackState + ' min state:' + b.lastBacTrackState) : ''));
    if (haveState && !(typeof b.bac === 'undefined')) {
      this.handleDoneButton();
      return (
          <Card>
            <CardHeader title = 'Blood Alcohol Level' / >
              <CardText >
                <div style = {{
                  width: '250px',
                  marginRight: '40px',
                  display: 'inline-block'
                }}>
                  <h2 style = {{marginLeft: '10px'}} >
                    {b.bac}
                  </h2>
                  <h4 style = {{marginLeft: '10px', color: 'gray'}} >
                    Blood Alcohol Level
                  </h4>
                </div>
              </CardText>
              <CardActions >
                <FlatButton
                  label = 'Cancel'
                  disableTouchRipple = {true}
                  disableFocusRipple = {true}
                  onClick = {this.handleCancelButton.bind(this)}
                  />
                <RaisedButton
                  disableTouchRipple = {true}
                  disableFocusRipple = {true}
                  primary = {true}
                  style = {{marginRight: 12}}
                  label = 'Next'
                  onClick = {
                    this.handleDoneButton.bind(this)
                  }
                  />
              </CardActions>
            </Card>
          );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackStart') {
      return (
            <Card >
              <CardHeader title = 'Start Blowing' / >
                <CardActions >
                  <FlatButton
                    label = 'Cancel'
                    disableTouchRipple = {true}
                    disableFocusRipple = {true}
                    onClick = {this.handleCancelButton.bind(this)}
                    />
                </CardActions>
              </Card>
            );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackBlow') {
      return (
              <Card >
                <CardHeader title = 'Keep Blowing' / >
                  <CardActions >
                    <FlatButton
                      label = 'Cancel'
                      disableTouchRipple = {true}
                      disableFocusRipple = {true}
                      onClick = {this.handleCancelButton.bind(this)}
                      />
                  </CardActions>
                </Card>
              );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackAnalyzing') {
      return (
                <Card >
                  <CardHeader title = 'Analyzing' / >
                    <CardActions >
                      <FlatButton
                        label = 'Cancel'
                        disableTouchRipple = {true}
                        disableFocusRipple = {true}
                        onClick = {this.handleCancelButton.bind(this)}
                        />
                    </CardActions>
                  </Card>
                );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackCountdown') {
      var countDown = 'Warming Up: ' + b.countdown;
      return (
                  <Card >
                    <CardHeader title = {countDown}  />
                    <CardActions >
                      <FlatButton
                        label = 'Cancel'
                        disableTouchRipple = {true}
                        disableFocusRipple = {true}
                        onClick = {this.handleCancelButton.bind(this)}
                        />
                    </CardActions>
                  </Card>
                );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackConnected') {
      return (
                  <Card >
                    <CardHeader title = 'Connected' / >
                      <CardActions >
                        <FlatButton
                          label = 'Cancel'
                          disableTouchRipple = {true}
                          disableFocusRipple = {true}
                          onClick = {this.handleCancelButton.bind(this)}
                          />
                      </CardActions>
                    </Card>
                  );
    } else if (haveState && b.lastMajorBacTrackState == 'BacTrackConnecting1') {
      console.log('handleConnecting1');
      return (
                  <Card >
                    <CardHeader title = 'Connecting...' />
                      <CardActions >
                        <FlatButton
                          label = 'Cancel'
                          disableTouchRipple = {true}
                          disableFocusRipple = {true}
                          onClick = {this.handleCancelButton.bind(this)}
                          />
                      </CardActions>
                    </Card>
          );
    } else if (haveState && b.lastMajorBacTrackState == 'BacTrackConnecting') {
      console.log('handleConnecting1');
      return (
                      <Card >
                        <CardHeader title = 'Connecting...' />
                          <CardActions >
                            <FlatButton
                              label = 'Cancel'
                              disableTouchRipple = {true}
                              disableFocusRipple = {true}
                              onClick = {this.handleCancelButton.bind(this)}
                              />
                          </CardActions>
                        </Card>
              );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackConnectTimeout') {
      return (
                      <Card >
                        <CardHeader title = 'Could not connect to breathalyzer' />
                          <CardActions >
                            <FlatButton
                              label = 'Cancel'
                              disableTouchRipple = {true}
                              disableFocusRipple = {true}
                              onClick = {this.handleCancelButton.bind(this)}
                              />
                            <RaisedButton
                              disableTouchRipple = {true}
                              disableFocusRipple = {true}
                              primary = {true}
                              style = {{marginRight: 12}}
                              label = 'Try Again'
                              onClick = {this.handleCancelButton.bind(this)}
                              />
                          </CardActions>
                        </Card>
                    );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackDisconnected') {
      return (
                        <Card >
                          <DynamicSpacer / >
                            <CardHeader title = 'Breathalyzer Disconnected' />
                              <CardActions >
                                <FlatButton
                                  label = 'Cancel'
                                  disableTouchRipple = {true}
                                  disableFocusRipple = {true}
                                  onClick = {this.handleCancelButton.bind(this)}
                                  />
                                <RaisedButton
                                  disableTouchRipple = {true}
                                  disableFocusRipple = {true}
                                  primary = {true}
                                  style = {{marginRight: 12}}
                                  label = 'Try Again'
                                  onClick = {this.handleRestartButton.bind(this)}
                                  />
                              </CardActions>
                            </Card>
                          );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackError') {
      return (
                            <Card >
                              <CardHeader title = 'Error' / >
                                <CardText >
                                  {b.errorMessage  }
                                </CardText>
                                <CardActions >
                                  <FlatButton
                                    label = 'Cancel'
                                    disableTouchRipple = {true}
                                    disableFocusRipple = {true}
                                    onClick = {this.handleCancelButton.bind(this)}
                                    />
                                  <RaisedButton
                                    disableTouchRipple = {true}
                                    disableFocusRipple = {true}
                                    primary = {true}
                                    style = {{marginRight: 12}}
                                    label = 'Try Again'
                                    onClick = {this.handleRestartButton.bind(this)}
                                    />
                                </CardActions>
                              </Card>
                  );
    } else if (haveState && b.isConnected && b.lastMajorBacTrackState == 'BacTrackAPIKeyDeclined') {
      return (
                              <Card >
                                <CardHeader title = 'Problem Talking to Breathalyzer' / >
                                  <CardText >
                                    Breathalyzer Step: {b.lastMajorBacTrackState}
                                  </CardText>
                                  <CardActions >
                                    <FlatButton
                                      label = 'Cancel'
                                      disableTouchRipple = {true}
                                      disableFocusRipple = {true}
                                      onClick = {this.handleCancelButton.bind(this)}
                                      />
                                    <RaisedButton
                                      disableTouchRipple = {true}
                                      disableFocusRipple = {true}
                                      primary = {true}
                                      style = {{marginRight: 12}}
                                      label = 'Try Again'
                                      onClick = {this.handleCancelButton.bind(this)}
                                      />
                                  </CardActions>
                                </Card>
                              );
    } else if (haveState && b.isConnected) {
      var errMessage = (b.errorMessage && b.errorMessage.length > 0) ? '<br/>Error: ' + b.errorMessage : '';
      return (
                                <Card >
                                  <CardHeader title = 'Breathalyzer Step: {b.lastMajorBacTrackState}' / >
                                    <CardText >
                                      minor state: {b.lastBacTrackState} <br / > Countdown: {b.countdown}
                                      {errMessage}
                                    </CardText>
                                    <CardActions >
                                      <FlatButton
                                        label = 'Cancel'
                                        disableTouchRipple = {true}
                                        disableFocusRipple = {true}
                                        onClick = {this.handleCancelButton.bind(this)}
                                        />
                                    </CardActions>
                                  </Card>
                                );
    } else {
      var devices = haveState ? b.devicesFound : {};
      var k = Object.keys(devices);
      let devListItems = [];
      console.log('Have ' + k.length + ' devices');
      var noneFound = haveState ? (b.scanStopped && k.length == 0) : false;
      if (k.length > 0) {
        var uuids = k.sort();
        for (var i = 0; i <uuids.length; i++) {
          var caption = devices[uuids[i]];
          console.log('Adding ' + caption);
          devListItems.push(
            <Card>
              <CardHeader
                title = {caption}
                subtitle = {uuids[i]} />
              <CardActions >
                <RaisedButton
                  disableTouchRipple = {true}
                  disableFocusRipple = {true}
                  primary = {true}
                  style = {{marginRight: 12}}
                  label = 'Use this Breathalyzer'
                  onClick = {this.handleSelection.bind(this, uuids[i])}
                />
              </CardActions>
            </Card>
            );
        }
      }
      console.log('About to return');
      return (
                                  <div>
                                    {devListItems}
                                    <Card>
                                      <CardHeader title = {k.length == 0 ? 'Scan for Breathalyzers' : 'Or scan Again for other Breathalyzers'}
                                        />
                                      <CardText >
                                        {noneFound ? 'Could not find a breathalyzer, please make sure it is turned on.' : ''}
                                      </CardText>
                                      <CardActions >
                                        <FlatButton
                                          label = 'Skip'
                                          disableTouchRipple = {true}
                                          disableFocusRipple = {true}
                                          onClick = {this.handleDoneButton.bind(this)} />
                                        {
                                          (k.length > 0) ? (
                                            <FlatButton
                                              label = 'Scan Again'
                                              disableTouchRipple = {true}
                                              disableFocusRipple = {true}
                                              onClick = {this.handleScanButton.bind(this)}
                                              />
                                          ) : (
                                            <RaisedButton
                                              disableTouchRipple = {true}
                                              disableFocusRipple = {true}
                                              primary = {true}
                                              style = {{marginRight: 12}}
                                              label = 'Scan'
                                              onClick = {this.handleScanButton.bind(this)}
                                              />
                                          )
                                        }
                                      </CardActions>
                                    </Card>
                                  </div>
                                );
    }
  }
  drinkingTimeSlider() {}
  drinkingAmountSlider() {}
  handleStartBlow() {
    console.log('handleStartBlow');
    StartCountdown();
  }
  handleCancelButton() {
    console.log('handleCancelButton');
    Disconnect();
    this.props.cancelStep();
                    // Initialize();
  }
  handleRestartButton() {
    console.log('handleRestartButton');
    var b = Session.get('BacTrackState');
    b.isConnected = false;
    Session.Set('BacTrackState',b);
                // Initialize();
  }
  handleStopScan() {
    console.log('In stopscan');
    StopScan();
  }
  handleScanButton() {
    console.log('handleScanButton');
    let preferredUuid = Session.get('preferredBreathalyzerUuid');
    Meteor.setTimeout(this.handleStopScan.bind(this), 15000);
    ScanAndConnect(preferredUuid);
  }
  handleSelection(selected) {
    console.log('handleSelection:' + selected);
    Connecting1(selected);
  }
  handleDoneButton() {
    console.log('handleDoneButton');
    Disconnect();
    this.props.lastStep();
                // Initialize();
  }
}
export function Initialize() {
  BACInitialize();
}
BreathalyzerDetail.propTypes = {
  hasUser: React.PropTypes.object,
  lastStep: React.PropTypes.func.isRequired,
  cancelStep: React.PropTypes.func.isRequired
};
ReactMixin(BreathalyzerDetail.prototype, ReactMeteorData);

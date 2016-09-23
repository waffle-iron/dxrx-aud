import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { timeString } from './Utils.js';

Session.setDefault('BreathalyzerPostState', {
  stepIndex: 0
});

export default class BreathalyzerPost extends React.Component {

  getMeteorData() {
    let data = Session.get('BreathalyzerPostState');
    if (typeof data === 'undefined') {
      Initialize();
    }
    return data;
  }


  render() {
    var postState = Session.get('BreathalyzerPostState');
    var preState = Session.get('BreathalyzerPreState');
    var breathalyzerState = Session.get('BacTrackState');
    var adherenceState = Session.get('AdherenceState');
    var startTime = preState.startTime;
    var firstDrinkTimestamp = preState.firstDrinkTimestamp;
    var lastDrinkTimestamp = preState.lastDrinkTimestamp;
    var numberOfDrinks = preState.numberOfDrinks;
    var estimatedBAC = preState.estimatedBAC;
    var bac = breathalyzerState.bac;
    var msUntilSober = (bac/0.015)*60*1000;
    var timeTilSober = undefined;
    var timeTilSoberString = '';
    if (! (typeof breathalyzerState.bacTimestamp === 'undefined')) {
      let v = breathalyzerState.bacTimestamp;
      let msSample = v.getTime();
      timeTilSober = new Date(msSample + msUntilSober);
      timeTilSoberString = timeString(timeTilSober);
    }
    var adherencePicPresent = !(typeof adherenceState.adherencePicture === 'undefined');

    return (
      <Card>
        <CardHeader title='Results' />
        <CardText>
          Design Notes, to be implemented soon:
          <list>
            <li>TREATMENT BADGES / GOALS
            <list>
              <li>Use the app</li>
              <li>Use the app twice a day</li>
              <li>Take your meds during a session</li>
              <li>Take a baseline history (weekly average)</li>
              <li>Set a goal compared to your baseline</li>
              <li>Lower your weekly average compared to your baseline</li>
              <li>Take your meds during an entire weekly treatment</li>
              <li>Contact your doctor (?)</li>
            </list>
          </li>
          <li>ADHOC ALERTS
            <list>
              <li>Display warning if BAL is over 0.08</li>
              <li>Display time till sober (0.15/hour)</li>
            </list>
          </li>
        <li>AA GOALS
          <list>
            <li>Current number of days sober</li>
          </list>
        </li>
        </list>
        </CardText>
        <CardActions>
          <FlatButton
            label='Cancel'
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.props.cancelStep}
            />
          <RaisedButton
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            style={{marginRight: 12}}
            label='Done'
            onClick={this.props.lastStep} />
        </CardActions>
      </Card>
    );
  }
}

export function Initialize() {
  console.log('BreathalyzerPost Initialize');
  var data = {
    stepIndex: 0
  };
  Session.set('BreathalyzerPostState',data);
  console.log('BreathalyzerPost Initialize Return');
}

BreathalyzerPost.propTypes = {
  hasUser: React.PropTypes.object,
  lastStep: React.PropTypes.func.isRequired,
  cancelStep: React.PropTypes.func.isRequired
};
ReactMixin(BreathalyzerPost.prototype, ReactMeteorData);

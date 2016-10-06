import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';
import { PageContainer } from '/imports/ui/components/PageContainer';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import SliderStep from  '/imports/ui/workflows/questions/SliderStep';
import RadioButtonStep from  '/imports/ui/workflows/questions/RadioButtonStep';

import {getRawValue,timeBefore,timeBeforeValue,min,echoValue,shallowCopy} from '/imports/ui/workflows/breathalyzer/Utils.js';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';


export class BreathalyzerResultPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {};
    return data;
  }

  scanState(stateVar) {
    var r = [];
    let s = Session.get(stateVar);
    if (typeof s !== 'object') return r;
    for (var k in s.keys()) {
      if (typeof s.k === 'object' &&
          typeof s.k.value !== 'undefined' &&
          typeof s.k.timeStamp !== 'undefined') {
        r.push({code: k, valueQuantity: {value: s.k.value, unit: s.k.unit}, valueDateTime: s.k.timeStamp});
      }
    }
    return r;
  }

  currentObservation () {
    let b = Session.get('BacTrackState');
    var components = this.scanState('BreathalyzerPreState');

    let observation = {
      resourceType: 'Observation',
      identifier: 'TBD',

      category: {
        text: 'BAC'
      },
      status: 'final',
      effectiveDateTime: b.bacTimestamp,
      valueQuantity: {
        value: b.bac,
        unit: '%'
      },
      device: {
        display: 'Breathalyzer',
        reference: Session.get('preferredBreathalyzerUuid')
      },
      subject: 'TBD',
      component: components
    };
    return observation;
  }

  summarizeToday() {
    var patientProfile = {
      email: 'String', // Email ID.
      password: 'String', // One-way hash of password
      passwordStatus: 'OK|CHANGE|LOCKED', // Some mechanism to force change at next login.
      passwordSetDate: 'DateTime', // When was password established?
      lastLogin: 'DateTime', // Last login date/time.
      sessionTimes: [ // Partition the clock into Morning, Evening, and Midday.
        {sessionName: 'Morning', start: '4:00AM', end: '11:00AM'},
        {sessionName: 'Midday', start: '11:00AM', end: '6:00PM'},
        {sessionName: 'Evening', start: '6:00PM', end: '4:00AM'}
      ],
      biologicalSex: 'M|F',
      weight: '120', // Weight in lbs.
      timeZone: 'Pacific', // Preferred timezone of interactions.
      preferredBreathalyzerUuid: 'String', // Last breathalyzer we connected to.
      currentCarePlan: 'CarePlanID',
      otherIDs: [
        {kind: 'PatientID',
         value: 'patient id in practice mgmt system',
         status: 'OK|DELETED|FAILED',
         lastUse: 'DateTime',
         lastSuccessfulUse: 'DateTime',
         failureCount: 0
       },
        {kind: 'SoberGrid',
         value: 'sobergriduserid',
         status: 'OK|DELETED|FAILED',
         lastUse: 'DateTime',
         lastSuccessfulUse: 'DateTime',
         failureCount: 0}
      ]
    };
    var carePlan = {
      startDate: new Date, // Midnight UTC on start date.
      endDate: new Date, // Date at which plans stops (and another plan starts).  If plans changed every Sunday then this would be midnight saturday night UTC.
      id: 'string', // identifier for this care plan
      sessions: [
        {name: 'Morning', // or 'Midday' or 'Evening'
         prescribedMeds: ['Naltrexone', 'Gabapentin', 'Thiamine'], // Meds to take in this session.
         breathalyzer: true, // or false or undefined
         contactDoctor: false, // or true or undefined
         questions: [
           {id: 'Question ID',
             context: 'Screen ID'},
           {id: 'Question ID',
             context: 'Screen ID',
             predicates: [{id: 'Predicate ID', arg1: 'argument', arg2: 'argument', arg3: 'argument'}]
            }],
          messages: [{id: 'Message ID',
                    context: 'Screen ID',
                    predicates: [{id: 'Predicate ID', arg1: 'argument', arg2: 'argument', arg3: 'argument'}],
                    content: 'Text'}]
        }]
    };
    var history =
        [{day: new Date(),
          maxBacValue: 0,
          standardDrinks: 0,
          sessions: [
            {time: new Date(),   // timestamp of this session.
              session: 'Morning', // named periods of the day: morning, midday, evening, set by user.

              startedApp: true, // or false or undefined if didn't start app.
              tookMeds: true,  // or false or undefined if no meds.
              blewBAC: true,   // or false or undefined if no BAC.
              bacValue: 0,     // BAC value.
              standardDrinks: 0, // # of standard drinks.  Needs biologicalSex + weight.
              answeredQuestions: true, // or false or undefined if no questions.
              sawMessages: true, // or false or undefined if no messages.
              contactDoctor: false // or true or undefined if not directed to.
            }]
          }];
    var performanceSummary = {
      streaks: [{
        key: 'SOBER|NOBINGE|BELOW02|BELOW04|ADHERENCE|ANSWERS|USEAPP',
        currentStreak: 14,
        recordStreak: 19,
        averageStreak: 6
      }],
      averages: [{
        key: 'STDDRINKS|DECLAREDDRINKS|MAXBAC|ADHERENCE|ANSWERS|USEAPP',
        day: 'DATE',
        programDay: 17,
        carePlanDay: 14,
        carePlanID: 'STRING',
        value: 0,
        past7Average: 1.00,
        past30Average: 0.90,
        toDateAverage: 0.83,
        carePlanAverage: 0.53,
        baselinePeriodAverage: 0.55
      }]
    };
    var goals = [
      {id: 'GOALID',
       measure: 'DRINKS|MAXBAC|ADHERENCE|ANSWERS|USEAPP|SOBER|NOBINGE|BELOW02|BELOW04',
       goal: 12,
       dateStart: 'DATE', // Date goal started
       dateEnd: 'DATE' // End of goal, if undefined then goal still open.
     }];
    var goalAttainment = [{
      day: 'DATE',
      goalID: 'GOALID',
      attained: true,
      pctOfGoal: 1.12
    }];
  }

  widmark(bac,hoursStartDrinking,biologicalSex,weightLbs) {
    console.log('Enter widmark with bac=' + bac + ' hours=' + hoursStartDrinking +
      ' biologicalSex=' + biologicalSex + ' weight=' + weightLbs);
    if (typeof bac !== 'number' || (bac !== bac)) {
      bac = 0;
    }
    if (typeof hoursStartDrinking !== 'number' || (hoursStartDrinking !== hoursStartDrinking)) {
      hoursStartDrinking = 0;
    }
    if (typeof weightLbs !== 'number' || (weightLbs !== weightLbs)) {
      weightLbs = 150;
    }
    var peakBAC = (bac/100.0) + (hoursStartDrinking*0.00015);
    console.log('Peak BAC is ' + peakBAC);
    var weightOzs = weightLbs * 16;
    var waterWeight = (biologicalSex == 'F') ? (weightOzs * 0.55) : (weightOzs * 0.68);
    console.log('Water weight (ozs) = ' + waterWeight);
    var stdAlcohol = 0.48; // ounces of alcohol in standard drink.
    var stdDrinks = ((peakBAC)*waterWeight)/(stdAlcohol*0.8);
    console.log('Standard drinks: ' + stdDrinks);
    return Math.floor(stdDrinks+0.749);
  }

  renderMessage(bac, timeTilSoberString, stdDrinks) {

    if (bac === 0) {
      return
      <CardText>
        <list>
          <li>Congratulations!  You did not drink today.</li>
          <li>This is X days without a drink!</li>
          <li>That's awesome!</li>
        </list>
      </CardText>
    } else {
      return
      <CardText>
        <list>
          <li>Your breathalyzer reading was {bac}</li>
           {(bac > 0.08) ? <li>You are above the legal limit for driving</li> : ''}
           <li>You will be sober at {timeTilSoberString}</li>
           <li>We estimate that you have consumed {stdDrinks} standard drinks</li>
        </list>
      </CardText>
    }
  }

  render(){

    var preState = Session.get('BreathalyzerPreState');
    var breathalyzerState = Session.get('BacTrackState');
    var adherenceState = Session.get('AdherenceState');
    var firstDrinkDelta = getRawValue('BreathalyzerPreState','firstDrinkTime',undefined);
    var lastDrinkDelta = getRawValue('BreathalyzerPreState','lastDrinkTime',undefined);
    var didDrink = getRawValue('BreathalyzerPreState','didDrink',undefined);

    console.log('prestate--' + JSON.stringify(preState));
    console.log('breathalyzerState--' + JSON.stringify(breathalyzerState));
    console.log('adherenceState--' + JSON.stringify(adherenceState));
    console.log('firstDrinkDelta: ' + firstDrinkDelta + ' lastDrinkDelta: ' + lastDrinkDelta + ' didDrink: ' + didDrink);

    if (typeof preState === 'undefined' ||
        typeof breathalyzerState === 'undefined' ||
        typeof adherenceState === 'undefined' ||
        typeof didDrink === 'undefined' ||
        (didDrink &&
          (typeof firstDrinkDelta === 'undefined' ||
          typeof lastDrinkDelta === 'undefined'))) {

      return (
        <div id="breathalyzerResultPage">
          <PageContainer>
            <GlassCard>
              <CardHeader title='Results' />
              <CardText>
                  The results of the session will be displayed after you have completed all of the steps of the session.
                </CardText>
                <CardActions>
                  <FlatButton
                    id='cancelResultsButton'
                    label='Cancel'
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onClick={this.backToCarePlan}
                    />
                </CardActions>
              </GlassCard>
          </PageContainer>
        </div>
      );
    }

    // var observation = this.currentObservation();
    console.log('Post - 2');
    var startTime = preState.startTime;
    var firstDrinkTime = timeBeforeValue(startTime,firstDrinkDelta);
    var lastDrinkTime = timeBeforeValue(startTime,lastDrinkDelta);
    var numberOfDrinks = getRawValue('BreathalyzerPreState','numberDrinks',undefined);
    var estimatedBAC = getRawValue('BreathalyzerPreState','estimatedBAC',undefined);
    console.log('Post - 3');
    var testingAdjustment = 0.04; // Goose it for testing.
    var bac = breathalyzerState.bac + testingAdjustment;
    var bacTime = breathalyzerState.bacTimestamp;
    var now = new Date();
    var biologicalSex = 'M';
    var weight = 190;
    var hoursAgo = (now.getTime() - lastDrinkTime.getTime())/(60*60*1000);
    console.log('Post - 4');
    var stdDrinks = this.widmark(bac,hoursAgo,biologicalSex,weight);
    var msUntilSober = (bac/0.015)*60*60*1000;
    var timeTilSober = undefined;
    var timeTilSoberString = '';
    console.log('In breathalyzerPost');
    if (typeof bacTime !== 'undefined') {
      let v = bacTime;
      let msSample = v.getTime();
      timeTilSober = new Date(msSample + msUntilSober);
      timeTilSoberString = timeString(timeTilSober);
    }
    var adherencePicPresent = !(typeof adherenceState.adherencePictureTime === 'undefined');

    return (
      <div id="breathalyzerResultPage">
        <PageContainer >
          <GlassCard>
            <CardHeader title='Results' />
            { this.renderMessage(bac, timeTilSoberString, stdDrinks) }
           <CardActions>
             <FlatButton
               id='cancelResultsButton'
               label='Cancel'
               disableTouchRipple={true}
               disableFocusRipple={true}
               onClick={this.backToCarePlan}
               />
             <RaisedButton
               disableTouchRipple={true}
               disableFocusRipple={true}
               primary={true}
               style={{marginRight: 12}}
               label='Done'
               onClick={this.props.lastStep}
               />
           </CardActions>
         </GlassCard>
       </PageContainer>
     </div>
   );
  }
  backToCarePlan(){
    browserHistory.push('/');
  }
}





ReactMixin(BreathalyzerResultPage.prototype, ReactMeteorData);

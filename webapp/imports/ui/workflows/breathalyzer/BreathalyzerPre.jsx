import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Stepper} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import SliderStep from  '../questions/SliderStep';
import RadioButtonStep from  '../questions/RadioButtonStep';
import {getRawValue,timeBefore,timeBeforeValue,min,echoValue,shallowCopy} from './Utils.js';

Session.setDefault('BreathalyzerPreState', {
  startTime: undefined,
  didDrink: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'bool'},
  numberDrinks: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'Number'},
  firstDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
  lastDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
  estimatedBAC: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: '%'},
  stepIndex: 0,
  finished: false
});

export default class BreathalyzerPre extends React.Component {

  getMeteorData() {
    console.log('In BreathalyzerPre getMeteorData');
    let data = Session.get('BreathalyzerPreState');
    if (typeof data === 'undefined') {
      data = {
        startTime: undefined,
        didDrink: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'bool'},
        numberDrinks: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'Number'},
        firstDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
        lastDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
        estimatedBAC: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: '%'},
        stepIndex: 0,
        finished: false
      };
      Session.set('BreathalyzerPreState', shallowCopy(data));
    }
    return data;
  }

  render() {
    var lastStep = this.props.lastStep;
    var cancelStep = this.props.cancelStep;
    var data = Session.get('BreathalyzerPreState');
    var stepIndex = data.stepIndex;
    // var showToggle = false;
    var showDoneVals = !(
      ((typeof data.firstDrinkTime.timeStamp) === 'undefined') ||
      ((typeof data.lastDrinkTime.timeStamp) === 'undefined') ||
      ((typeof data.numberDrinks.timeStamp) === 'undefined') ||
      ((typeof data.estimatedBAC.timeStamp) === 'undefined'));
    var showVals = (typeof data.didDrink.timeStamp !== 'undefined') &&
                  data.didDrink.rawValue;
    var showDone = ((typeof data.didDrink.timeStamp !== 'undefined') &&
                    (! data.didDrink.rawValue)) ||
                    showDoneVals;
    console.log('showDoneVals = ' + showDoneVals + ', showVals=' + showVals + ', showDone=' + showDone);
    if ((typeof data.startTime) === 'undefined') {
      data.startTime = new Date();
      Session.set('BreathalyzerPreState', shallowCopy(data));
    }
    if (showVals) {
      return (
        <div style={{maxWidth: '100%', margin: 'auto'}}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation='vertical'
            >
            <RadioButtonStep
              stateStruct='BreathalyzerPreState'
              stateVariable='didDrink'
              stepIndexName='stepIndex'
              stepIndex={0}
              maxStepIndex={4}
              unsetValue={((typeof data.didDrink.timeStamp) === 'undefined')}
              unfilledPrompt='Did you drink today?'
              falseLabel='You did not drink today.'
              trueLabel='You drank today.'
              showDone={showDone}
              doneStep={lastStep}
              />
            <SliderStep
              stateStruct='BreathalyzerPreState'
              stateVariable='firstDrinkTime'
              stepIndexName='stepIndex'
              stepIndex={1}
              maxStepIndex={4}
              unsetValue={((typeof data.firstDrinkTime.timeStamp) === 'undefined')}
              maxValue={min(getRawValue('BreathalyzerPreState','lastDrinkTime',0),0)}
              minValue={-1440}
              stepIncrement={20}
              unfilledSide='right'
              unfilledPrompt='When did you take your first drink today?'
              answerFormat='Your first drink was: %s'
              unSetLabel='Slide to select time'
              beyondLabel='Before %s'
              validLabel='%s'
              interpretValue={timeBefore.bind(this,data.startTime)}
              valueForSetting={timeBeforeValue.bind(this,data.startTime)}
              showDone={showDone}
              doneStep={lastStep}
              leftLabel = 'yesterday'
              rightLabel = 'now'
              />
            <SliderStep
              stateStruct='BreathalyzerPreState'
              stateVariable='lastDrinkTime'
              stepIndexName='stepIndex'
              stepIndex={2}
              maxStepIndex={4}
              minValue={getRawValue('BreathalyzerPreState','firstDrinkTime',-1440)}
              unsetValue={((typeof data.lastDrinkTime.timeStamp) === 'undefined')}
              maxValue={0}
              stepIncrement={20}
              unfilledSide='right'
              unfilledPrompt='When did you take your last drink today?'
              answerFormat='Your last drink was: %s'
              unSetLabel='Slide to select time'
              beyondLabel='You only had one drink'
              validLabel='%s'
              interpretValue={timeBefore.bind(this,data.startTime)}
              valueForSetting={timeBeforeValue.bind(this,data.startTime)}
              showDone={showDone}
              doneStep={lastStep}
              rightLabel='now'
              leftLabel='first'
              />
            <SliderStep
              stateStruct='BreathalyzerPreState'
              stateVariable='numberDrinks'
              stepIndexName='stepIndex'
              stepIndex={3}
              maxStepIndex={4}
              unsetValue={(((typeof data.numberDrinks.timeStamp) === 'undefined') || (data.numberDrinks.rawValue < 0))}
              minValue={0}
              maxValue={15}
              stepIncrement={1}
              unfilledSide='left'
              unfilledPrompt='How many drinks did you have today?'
              answerFormat='You had %s'
              unSetLabel='Slide to select number of drinks'
              beyondLabel='%s or more of your usual drinks'
              validLabel='%s of your usual drinks'
              interpretValue={echoValue.bind(this)}
              valueForSetting={echoValue.bind(this)}
              showDone={showDone}
              doneStep={lastStep}
              leftLabel='none'
              rightLabel='16+'
              />
            <SliderStep
              stateStruct='BreathalyzerPreState'
              stateVariable='estimatedBAC'
              stepIndexName='stepIndex'
              stepIndex={4}
              maxStepIndex={4}
              unsetValue={(((typeof data.estimatedBAC.timeStamp) === 'undefined')   || (data.estimatedBAC.rawValue < 0))}
              minValue={0.0}
              maxValue={0.15}
              stepIncrement={0.01}
              unfilledSide='left'
              unfilledPrompt='What is your estimated blood alcohol level?'
              answerFormat='Your estimate of %s'
              unSetLabel='Slide to estimate a level'
              beyondLabel='BAC: %0.2f or more'
              validLabel='BAC: %0.2f'
              interpretValue={echoValue.bind(this)}
              valueForSetting={echoValue.bind(this)}
              showDone={showDone}
              doneStep={lastStep}
              leftLabel='none'
              rightLabel='0.16+'
              />
          </Stepper>
          <p>
            <FlatButton
              label='Cancel'
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={cancelStep}
              onTouchTap={cancelStep}
              />
          </p>
        </div>
      );
    } else {
      return (
        <div style={{maxWidth: '100%', margin: 'auto'}}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation='vertical'
            >
            <RadioButtonStep
              stateStruct='BreathalyzerPreState'
              stateVariable='didDrink'
              stepIndexName='stepIndex'
              stepIndex={0}
              maxStepIndex={0}
              unsetValue={((typeof data.didDrink.timeStamp) === 'undefined')}
              unfilledPrompt='Did you drink today?'
              falseLabel='You did not drink today'
              trueLabel='You drank today'
              showDone={showDone}
              doneStep={lastStep}
              />
          </Stepper>
          <p>
            <FlatButton
              label='Cancel'
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={cancelStep}
              onTouchTap={cancelStep}
              />
          </p>
        </div>
      );
    }
  }
}

export function Initialize() {
  let data = {
    startTime: undefined,
    didDrink: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'bool'},
    numberDrinks: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'Number'},
    firstDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
    lastDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
    estimatedBAC: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: '%'},
    stepIndex: 0,
    finished: false
  };
  Session.set('BreathalyzerPreState', shallowCopy(data));
}

BreathalyzerPre.propTypes = {
  hasUser: React.PropTypes.object,
  lastStep: React.PropTypes.func.isRequired,
  cancelStep: React.PropTypes.func.isRequired
};
ReactMixin(BreathalyzerPre.prototype, ReactMeteorData);

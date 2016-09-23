import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Stepper} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import SliderStep from  '../questions/SliderStep';
import {getValue,timeBefore,timeBeforeValue,min,echoValue} from './Utils.js';

Session.setDefault('BreathalyzerPreState', {
  startTime: undefined,
  firstDrinkTimeSlider: undefined,
  firstDrinkTimestamp: undefined,
  lastDrinkTimeSlider: undefined,
  lastDrinkTimestamp: undefined,
  drinkNumber: undefined,
  
  estimatedBAC: undefined,
  stepIndex: 0,
  finished: false
});

/**
* A basic vertical non-linear implementation
*/
export default class BreathalyzerPre extends React.Component {

  getMeteorData() {
    let data = Session.get('BreathalyzerPreState');
    if (typeof data === 'undefined') {
      data = {
        startTime: undefined,
        firstDrinkTimeSlider: undefined,
        firstDrinkTimestamp: undefined,
        lastDrinkTimeSlider: undefined,
        lastDrinkTimestamp: undefined,
        drinkNumber: undefined,
        estimatedBAC: undefined,
        stepIndex: 0,
        finished: false
      };
      Session.set('BreathalyzerPreState', data);
    }
    return data;
  }

  render() {
    var lastStep = this.props.lastStep;
    var cancelStep = this.props.cancelStep;
    var data = Session.get('BreathalyzerPreState');
    var stepIndex = data.stepIndex;
    var showDone = !(
      ((typeof data.firstDrinkTimeSlider) === 'undefined') ||
      ((typeof data.lastDrinkTimeSlider) === 'undefined') ||
      ((typeof data.drinkNumber) === 'undefined') ||
      ((typeof data.estimatedBAC) === 'undefined'));
    if (((typeof data.startTime) === 'undefined') ||
        (((typeof data.firstDrinkTimeSlider) === 'undefined') &&
          ((typeof data.lastDrinkTimeSlider) === 'undefined') &&
          ((typeof data.drinkNumber) === 'undefined') &&
          ((typeof data.estimatedBAC) === 'undefined'))) {
      data.startTime = new Date();
    }
    console.log('Show done is ' + showDone);
    return (
      <div style={{maxWidth: 380, margin: 'auto'}}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation='vertical'
          >
          <SliderStep
            stateStruct='BreathalyzerPreState'
            stateVariable='firstDrinkTimeSlider'
            resultVariable='firstDrinkTimestamp'
            stepIndexName='stepIndex'
            stepIndex={0}
            maxStepIndex={3}
            unsetValue={((typeof data.firstDrinkTimeSlider) === 'undefined')}
            maxValue={min(getValue('BreathalyzerPreState','lastDrinkTimeSlider',0),0)}
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
            />
          <SliderStep
            stateStruct='BreathalyzerPreState'
            stateVariable='lastDrinkTimeSlider'
            resultVariable='lastDrinkTimestamp'
            stepIndexName='stepIndex'
            stepIndex={1}
            maxStepIndex={3}
            minValue={getValue('BreathalyzerPreState','firstDrinkTimeSlider',-1440)}
            unsetValue={((typeof data.lastDrinkTimeSlider) === 'undefined')}
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
            />
          <SliderStep
            stateStruct='BreathalyzerPreState'
            stateVariable='drinkNumber'
            resultVariable='drinkNumber'
            stepIndexName='stepIndex'
            stepIndex={2}
            maxStepIndex={3}
            unsetValue={(((typeof data.lastDrinkNumberSlider) === 'undefined') || (data.lastDrinkNumberSlider < 0))}
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
            />
          <SliderStep
            stateStruct='BreathalyzerPreState'
            stateVariable='estimatedBAC'
            resultVariable='estimatedBAC'
            stepIndexName='stepIndex'
            stepIndex={3}
            maxStepIndex={3}
            unsetValue={(((typeof data.estimatedBAC) === 'undefined')   || (data.estimatedBAC < 0))}
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

export function Initialize() {
  let data = {
    startTime: undefined,
    firstDrinkTimeSlider: undefined,
    firstDrinkTimestamp: undefined,
    lastDrinkTimeSlider: undefined,
    lastDrinkTimestamp: undefined,
    drinkNumber: undefined,
    estimatedBAC: undefined,
    stepIndex: 0,
    finished: false
  };
  Session.set('BreathalyzerPreState', data);
}


BreathalyzerPre.propTypes = {
  hasUser: React.PropTypes.object,
  lastStep: React.PropTypes.func.isRequired,
  cancelStep: React.PropTypes.func.isRequired
};
ReactMixin(BreathalyzerPre.prototype, ReactMeteorData);

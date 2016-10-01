import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Step, StepButton, StepContent } from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import {shallowCopy,setRawValue} from '../breathalyzer/Utils.js';
import { sprintf } from 'sprintf-js';
import QuestionNav from './QuestionNav.js';

import { browserHistory } from 'react-router';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class SliderStep extends React.Component {

  constructor (props) {
    super(props);
  }

  getMeteorData () {
    return {};
  }

  render () {
    var stateStruct = this.props.stateStruct; // The name of the session variable that contains the state structure. Hack.
    var stateVariable = this.props.stateVariable; // The name of the slider value variable within the state structure. Hack.
    var stepIndexName = this.props.stepIndexName; // The name of the step index variable within the state structure. Hack.
    var stepIndex = this.props.stepIndex; // The index of this step within the parent stepper.
    var maxSteps = this.props.maxStepIndex; // The max step number of the parent stepper (index of last step).
    var minValue = this.props.minValue; // Minimum legal value for the slider.  Our slider will use one step below this for 'unset'.
    var maxValue = this.props.maxValue; // Maximum legal value for the slider.   Our slider wil use one step above this for 'max'.
    var stepIncrement = this.props.stepIncrement; // step increment.
    var unfilledPrompt = this.props.unfilledPrompt; // The question.
    var answerFormat = this.props.answerFormat; // The question.
    var unSetLabel = this.props.unSetLabel; // The default label to display for an unset slider.
    var beyondLabel = this.props.beyondLabel; // A sprintf format string for a 'max' slider.
    var validLabel = this.props.validLabel; // A sprintf format string for a standard slider value.
    var interpretValue = this.props.interpretValue; // Function to transform the slider value to what will be displayed.
    var valueForSetting = this.props.valueForSetting; // Function to transform the slider value to what will be displayed.
    var showDone = this.props.showDone;
    var doneStep = this.props.doneStep;
    var unfilledSide = this.props.unfilledSide;
    var unfilledLeft = false;
    var leftLabel = this.props.leftLabel;
    var rightLabel = this.props.rightLabel;
    var unfilledAnswer;
    console.log('In SliderStep');

    var stateV = this.getData(stateStruct, stateVariable);
    console.log('stateV=' + JSON.stringify(stateV));
    var curValue = stateV.rawValue;
    console.log('curValue=' + curValue);
    var isUnfilled = false;
    var isBeyond = false;
    var currentIndex = this.getData(stateStruct, stepIndexName);
    if (typeof unfilledSide === 'undefined') {
      unfilledSide = 'left';
    }
    if (unfilledSide === 'left') {
      unfilledLeft = true;
    }
    if (typeof curValue === 'undefined') {
      if (unfilledSide === 'right') {
        curValue = maxValue + stepIncrement;
      } else {
        curValue = minValue - stepIncrement;
      }
    }
    if (unfilledSide === 'left') {
      if (curValue < minValue) {
        isUnfilled = true;
      }
      if (curValue > maxValue) {
        isBeyond = true;
      }
    } else {
      if (curValue > maxValue) {
        isUnfilled = true;
      }
      if (curValue < minValue) {
        isBeyond = true;
      }
    }
    var labels = '';
    console.log('In Slider Step - 2');
    if (!((typeof leftLabel === 'undefined') || (typeof rightLabel === 'undefined'))) {
      labels = <div style={{display: 'flex',flex: 1, flexWrap: 'wrap', flexDirection: 'row',
              justifyContent: 'space-between', fontSize: 12,lineSpacing: '13px', padding: 0,
              marginLeft:10, marginRight:10,marginTop:0,marginBottom:3}}><div>{leftLabel}</div><div>{rightLabel}</div></div>;
    }
    var getVal = curValue;
    console.log('Setting slider value to ' + getVal);
    var valueLabel = isUnfilled ? unSetLabel :
      (isBeyond ?
        sprintf(beyondLabel, interpretValue(getVal)) :
        sprintf(validLabel, interpretValue(getVal)));
    if (isUnfilled || currentIndex == stepIndex) {
      unfilledAnswer = '';
    } else {
      unfilledAnswer = sprintf(answerFormat, valueLabel);
    }
    console.log('In Slider Step - 3');
    console.log('The props: ', JSON.stringify(this.props));
    console.log('UnfilledPrompt: ' + unfilledPrompt);
    console.log('unfilledAnswer: ' + unfilledAnswer);
    console.log('valueLabel: '  + valueLabel);
    console.log('Labels: ' + labels);
    return (
      <Step index={stepIndex}>
        <StepButton
          id={stateVariable + "Button"}
          style={{linespacing: 1,fontSize: 18,marginBottom: 0}}
          onTouchTap={this.setData.bind(this, stateStruct, stepIndexName, stepIndex)}
          completed={!isUnfilled}
          >
          {(isUnfilled || currentIndex == stepIndex) ? unfilledPrompt : unfilledAnswer}
        </StepButton>
        <StepContent style={{linespacing: 1, marginBottom: 0,marginTop:0, padding: 0}}
          active={(stepIndex == currentIndex)}>
          <div style={{marginRight:10,marginTop:0,marginBottom:0,padding: 0}}>
            <div style={{fontSize: 16,marginLeft: 15, marginRight:15,marginTop:0,marginBottom:0,padding:0}}>
              {valueLabel}
            </div>
            <Slider
            id={stateVariable + "Slider"}
             style={{width: '90%', height:10, linespacing: 0,marginLeft:10,marginRight:10,marginTop: 0, marginBottom:0}}
             min={(minValue - stepIncrement)}
             max={(maxValue + stepIncrement)}
             step={stepIncrement}
             defaultValue={unfilledLeft ? (minValue - stepIncrement) : (maxValue + stepIncrement)}
             value={getVal}
             onChange={setRawValue.bind(this, stateStruct, stateVariable, valueForSetting)} />
           {labels}
            <QuestionNav
              maxSteps={maxSteps}
              showDone={showDone}
              stepIndex={stepIndex}
              stateStruct={stateStruct}
              stepIndexName={stepIndexName}
              doneStep={doneStep}
              />
          </div>
          </StepContent>
          </Step>);
  }

  handleNext (stateStruct, stepIndexName, maxSteps) {
    var data = Session.get(stateStruct);
    var stepIndex = data[stepIndexName];
    if (stepIndex < maxSteps) {
      data[stepIndexName] = stepIndex + 1;
    }
    Session.set(stateStruct, data);
  }

  handlePrev (stateStruct, stepIndexName) {
    var data = Session.get(stateStruct);
    var stepIndex = data[stepIndexName];
    if (stepIndex > 0) {
      data[stepIndexName] = stepIndex - 1;
    }
    Session.set(stateStruct, data);
  }


  setData (structVar, event, value) {
    var data = Session.get(structVar);
    data[event] = value;
    var classVar = shallowCopy(data);
    Session.set(structVar, classVar);
  }

  getData (structVar, event) {
    var data = Session.get(structVar);
    return data[event];
  }
}

SliderStep.propTypes = {
  stateStruct: React.PropTypes.string.isRequired,
  stateVariable: React.PropTypes.string.isRequired,
  stepIndexName: React.PropTypes.string.isRequired,
  stepIndex: React.PropTypes.number.isRequired,
  maxStepIndex: React.PropTypes.number.isRequired,
  maxSteps: React.PropTypes.number.isRequired,
  minValue: React.PropTypes.number.isRequired,
  unsetValue: React.PropTypes.bool.isRequired,
  maxValue: React.PropTypes.number.isRequired,
  stepIncrement: React.PropTypes.number.isRequired,
  unfilledPrompt: React.PropTypes.string.isRequired,
  answerFormat: React.PropTypes.string.isRequired,
  unSetLabel: React.PropTypes.string.isRequired,
  beyondLabel: React.PropTypes.string.isRequired,
  validLabel: React.PropTypes.string.isRequired,
  interpretValue: React.PropTypes.func.isRequired,
  valueForSetting: React.PropTypes.func.isRequired,
  unfilledSide: React.PropTypes.string.isRequired,
  leftLabel: React.PropTypes.string,
  rightLabel: React.PropTypes.string
};

ReactMixin(SliderStep.prototype, ReactMeteorData);

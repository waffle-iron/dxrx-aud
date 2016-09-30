import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Step,Stepper,StepButton,StepContent,StepLabel} from 'material-ui/Stepper';
import {List,ListItem} from 'material-ui/List';
import {Divider} from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {sprintf} from 'sprintf-js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class SliderStep extends React.Component {

  constructor(props) {
    super(props);
  }

  getMeteorData() {
    return {};
  }


  render() {
    var stateStruct = this.props.stateStruct; // The name of the session variable that contains the state structure. Hack.
    var stateVariable = this.props.stateVariable; // The name of the slider value variable within the state structure. Hack.
    var stepIndexName = this.props.stepIndexName; // The name of the step index variable within the state structure. Hack.
    var stepIndex = this.props.stepIndex;  // The index of this step within the parent stepper.
    var maxSteps = this.props.maxStepIndex; // The max step number of the parent stepper (index of last step).
    var unsetValue = this.props.unsetValue; // Do we do "unset" values as min, or not?
    var minValue = this.props.minValue;   // Minimum legal value for the slider.  Our slider will use one step below this for "unset".
    var maxValue = this.props.maxValue;   // Maximum legal value for the slider.   Our slider wil use one step above this for "max".
    var stepIncrement = this.props.stepIncrement;  // step increment.
    var unfilledPrompt = this.props.unfilledPrompt; // The question.
    var answerFormat = this.props.answerFormat; // The question.
    var unSetLabel = this.props.unSetLabel; // The default label to display for an unset slider.
    var beyondLabel = this.props.beyondLabel; // A sprintf format string for a "max" slider.
    var validLabel = this.props.validLabel; // A sprintf format string for a standard slider value.
    var interpretValue = this.props.interpretValue; // Function to transform the slider value to what will be displayed.
    var showDone = this.props.showDone;
    var doneStep = this.props.doneStep;

    var curValue = this.getData(stateStruct,stateVariable);
    var isUnfilled = false;
    var currentIndex = this.getData(stateStruct,stepIndexName);

    if (typeof curValue === 'undefined') {
      console.log("Setting curvalue due to undefined with " + unsetValue);
      if (unsetValue) {
        curValue = minValue-stepIncrement;
      } else {
        curValue = minValue;
      }
      this.setData(stateStruct,stateVariable,curValue);
    }

    if (curValue < minValue) {
      isUnfilled = true;
    }

    var getVal = this.getData(stateStruct,stateVariable);
    console.log("Picking label with curValue=" + curValue + ", getVal=" + getVal + ", minVal=" + minValue);
    var valueLabel = (getVal < minValue) ? unSetLabel :
      ((getVal > maxValue) ?
       sprintf(beyondLabel,interpretValue(getVal)) :
       sprintf(validLabel,interpretValue(getVal)));
    if (isUnfilled || currentIndex==stepIndex) {
      unfilledAnswer = '';
    } else {
      unfilledAnswer = sprintf(answerFormat,valueLabel);
    }

    return (
      <Step index={stepIndex}>
      <StepButton onClick={this.setData.bind(this,stateStruct,stepIndexName,stepIndex)} completed={!isUnfilled}>
        {(isUnfilled || currentIndex==stepIndex) ? unfilledPrompt : unfilledAnswer}
      </StepButton>
      <StepContent active={(stepIndex==currentIndex)}>
          {valueLabel}
      <Slider
        style={{width: "90%", margin:'20px 0'}}
             min={unsetValue ? (minValue-stepIncrement) : minValue}
             max={(maxValue+stepIncrement)+0}
             step={stepIncrement}
             defaultValue={unsetValue ? (minValue-stepIncrement) : minValue}
             value={getVal}
            onChange={this.setDataSlider.bind(this,stateStruct,stateVariable)}
        />
      <div style={{margin: '12px 0'}}>
      <FlatButton  label="Back"
           disabled={stepIndex===0}
           disableTouchRipple={true}
           disableFocusRipple={true}
           onClick={this.handlePrev.bind(this,stateStruct,stepIndexName)}
      />
         {showDone ?
      <FlatButton  label="Next Question"
           disabled={stepIndex===maxSteps}
           disableTouchRipple={true}
           disableFocusRipple={true}
           onClick={this.handleNext.bind(this,stateStruct,stepIndexName,maxSteps)}
           style={{marginRight: 12}}
       /> :
       <RaisedButton
            label="Next Question"
            disabled={stepIndex === maxSteps}
       disableTouchRipple={true}
       disableFocusRipple={true}
       primary={true}
       onClick={this.handleNext.bind(this,stateStruct,stepIndexName,maxSteps)}
       style={{marginRight: 12}}
       />}
      {showDone ? <RaisedButton
                  label="Finish Questions"
      disableTouchRipple={true}
      disableFocusRipple={true}
      primary={true}
                  onClick={doneStep}
      style={{marginRight: 12}}
      /> : ""}
      </div>
      </StepContent>
      </Step>
       );
  }

  handleNext (stateStruct,stepIndexName,maxSteps) {
    var data = Session.get(stateStruct);
    var stepIndex = data[stepIndexName];
    if (stepIndex < maxSteps) {
      data[stepIndexName] = stepIndex + 1;
    }
    Session.set(stateStruct,data);
  }

  handlePrev (stateStruct,stepIndexName) {
    var data = Session.get(stateStruct);
    var stepIndex = data[stepIndexName];
    if (stepIndex > 0) {
      data[stepIndexName] = stepIndex - 1;
    }
    Session.set(stateStruct,data);
  }

  setDataSlider(structVar,event,ev2,val) {
    var data = Session.get(structVar);
    data[event]=val;
    var classVar = Object.assign(data);
    Session.set(structVar,classVar);
  }

  setData(structVar,event,value) {
    var data = Session.get(structVar);
    data[event]=value;
    var classVar = Object.assign(data);
    Session.set(structVar,classVar);
  }

  getData(structVar,event) {
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
  //maxSteps: React.PropTypes.number.isRequired,
  minValue: React.PropTypes.number.isRequired,
  unsetValue: React.PropTypes.bool.isRequired,
  maxValue: React.PropTypes.number.isRequired,
  stepIncrement: React.PropTypes.number.isRequired,
  unfilledPrompt: React.PropTypes.string.isRequired,
  answerFormat: React.PropTypes.string.isRequired,
  unSetLabel: React.PropTypes.string.isRequired,
  beyondLabel: React.PropTypes.string.isRequired,
  validLabel: React.PropTypes.string.isRequired,
  interpretValue: React.PropTypes.func.isRequired
};

ReactMixin(SliderStep.prototype, ReactMeteorData);

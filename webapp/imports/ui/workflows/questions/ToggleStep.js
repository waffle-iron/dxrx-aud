import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Step, StepButton, StepContent } from 'material-ui/Stepper';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {setRawValue,getRawValue,setData,getData} from '../breathalyzer/Utils.js';
import QuestionNav from './QuestionNav.js';

export default class ToggleStep extends React.Component {

  constructor (props) {
    super(props);
  }

  getMeteorData () {
    return {};
  }

  render () {
    var stateStruct = this.props.stateStruct; // The name of the session variable that contains the state structure. Hack.
    var stateVariable = this.props.stateVariable; // The name of the Toggle value variable within the state structure. Hack.
    var stepIndexName = this.props.stepIndexName; // The name of the step index variable within the state structure. Hack.
    var stepIndex = this.props.stepIndex; // The index of this step within the parent stepper.
    var maxSteps = this.props.maxStepIndex; // The max step number of the parent stepper (index of last step).
    var unfilledPrompt = this.props.unfilledPrompt; // The question.
    var unSetLabel = this.props.unSetLabel; // The default label to display for an unset Toggle.
    var falseLabel = this.props.falseLabel;
    var trueLabel = this.props.trueLabel;
    var showDone = this.props.showDone;
    var doneStep = this.props.doneStep;
    console.log('In Toggle render - 2');
    var curValue = getRawValue(stateStruct, stateVariable,undefined);
    var label = '';
    var answer = '';
    var isUnfilled = (typeof curValue) === 'undefined';
    var currentIndex = getData(stateStruct, stepIndexName);
    if (isUnfilled) {
      label = unSetLabel;
      answer = unfilledPrompt;
    } else if (curValue) {
      label = trueLabel;
      answer = (stepIndex == currentIndex) ? unfilledPrompt : trueLabel;
    } else {
      label = falseLabel;
      answer = (stepIndex == currentIndex) ? unfilledPrompt : falseLabel;
    }
    return (
      <Step index={stepIndex}>
        <StepButton style={{linespacing: 1,fontSize: 18,marginBottom: 0}}
          onTouchTap={setData.bind(this, stateStruct, stepIndexName, stepIndex)}
          completed={!isUnfilled}>
          {answer}
        </StepButton>
        <StepContent style={{linespacing: 1, marginLeft:10, marginBottom: 0,marginTop:0, padding: 0}}
          active={(stepIndex==currentIndex)}>
        <Toggle
          label={label}
          defaultToggled={curValue}
          value={curValue}
          labelPosition='right'
          style={{}}
          onChange={setRawValue.bind(this, stateStruct, stateVariable)}
          />
        <QuestionNav
            maxSteps={maxSteps}
            showDone={showDone}
            stepIndex={stepIndex}
            stateStruct={stateStruct}
            stepIndexName={stepIndexName}
            doneStep={doneStep}
          />
        </StepContent>
        </Step>);
  }


}

ToggleStep.propTypes = {
  stateStruct: React.PropTypes.string.isRequired,
  stateVariable: React.PropTypes.string.isRequired,
  stepIndexName: React.PropTypes.string.isRequired,
  stepIndex: React.PropTypes.number.isRequired,
  maxSteps: React.PropTypes.number.isRequired,
  unfilledPrompt: React.PropTypes.string.isRequired,
  unSetLabel: React.PropTypes.string.isRequired,
  falseLabel: React.PropTypes.string.isRequired,
  trueLabel: React.PropTypes.string.isRequired
};

ReactMixin(ToggleStep.prototype, ReactMeteorData);

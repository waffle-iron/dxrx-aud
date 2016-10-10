import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Step, StepButton, StepContent } from 'material-ui/Stepper';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import FontAwesome from 'react-fontawesome';
import {teal400} from 'material-ui/styles/colors';
import {setRawValue,getRawValue,setData,getData,echoValue} from '../breathalyzer/Utils.js';

export default class RadioButtonStep extends React.Component {

  constructor (props) {
    super(props);
  }

  getMeteorData () {
    return {};
  }

  render () {

    var stateStruct = this.props.stateStruct; // The name of the session variable that contains the state structure. Hack.
    var stateVariable = this.props.stateVariable; // The name of the RadioButton value variable within the state structure. Hack.
    var stepIndexName = this.props.stepIndexName; // The name of the step index variable within the state structure. Hack.
    var stepIndex = this.props.stepIndex; // The index of this step within the parent stepper.
    var unfilledPrompt = this.props.unfilledPrompt; // The question.
    var falseLabel = this.props.falseLabel;
    var trueLabel = this.props.trueLabel;

    var curValue = getRawValue(stateStruct, stateVariable,undefined);
    var color = teal400;
    var trueValue = 'true';
    var falseValue = 'false';
    var answer = '';
    var isUnfilled = (typeof curValue) === 'undefined';
    var fontIconStyle = {verticalAlign: 'middle',marginLeft:10,marginRight: 2};
    var fontIconStyleSelected = {verticalAlign: 'middle',marginLeft:10,marginRight: 2, color: color};
    var currentIndex = getData(stateStruct, stepIndexName);
    if (isUnfilled) {
      answer = unfilledPrompt;
    } else if (curValue) {
      answer = (stepIndex == currentIndex) ? unfilledPrompt : trueLabel;
    } else {
      answer = (stepIndex == currentIndex) ? unfilledPrompt : falseLabel;
    }
    console.log('In RadioButtonStep  with curValue=' + curValue + ' and typeof curValue=' + (typeof curValue));
    return (
      <Step index={stepIndex}>
        <StepButton style={{fontSize: 18,marginBottom: 0}}
          onTouchTap={setData.bind(this, stateStruct, stepIndexName, stepIndex)}
          onClick={setData.bind(this, stateStruct, stepIndexName, stepIndex)}
          completed={!isUnfilled}>
          {answer}
        </StepButton>
        <StepContent active={(stepIndex==currentIndex)}>
        <RadioButtonGroup
          name={stateVariable}
          id={stateVariable}
          value={curValue}
          labelPosition='right'
          defaultSelected={curValue}
          onChange={setRawValue.bind(this, stateStruct, stateVariable,echoValue)}>
          <RadioButton
            id={stateVariable + "-false"}
            value={falseValue}
            label={falseLabel}
            uncheckedIcon={<div style={fontIconStyle}>
                <FontAwesome name='circle-o' style={fontIconStyle} /></div>}
            checkedIcon={<div style={fontIconStyleSelected}>
                <FontAwesome name='check-circle' style={fontIconStyleSelected} /></div>}
            />
          <RadioButton
              id={stateVariable + "-true"}
              value={trueValue}
              label={trueLabel}
              uncheckedIcon={<div style={fontIconStyle}>
                  <FontAwesome name='circle-o' style={fontIconStyle} /></div>}
              checkedIcon={<div style={fontIconStyleSelected}>
                  <FontAwesome name='check-circle' style={fontIconStyleSelected} /></div>}
              />
        </RadioButtonGroup>
      </StepContent>
      </Step>);
  }
}

RadioButtonStep.propTypes = {
  inputId: React.PropTypes.string.isOptional,
  stateStruct: React.PropTypes.string.isRequired,
  stateVariable: React.PropTypes.string.isRequired,
  stepIndexName: React.PropTypes.string.isRequired,
  stepIndex: React.PropTypes.number.isRequired,
  unfilledPrompt: React.PropTypes.string.isRequired,
  falseLabel: React.PropTypes.string.isRequired,
  trueLabel: React.PropTypes.string.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

ReactMixin(RadioButtonStep.prototype, ReactMeteorData);

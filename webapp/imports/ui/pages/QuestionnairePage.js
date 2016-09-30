import React from 'react';
import ReactMixin from 'react-mixin';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import {Step,Stepper,StepButton,StepContent,StepLabel} from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SliderStep from  '/imports/ui/workflows/questions/SliderStep';



Session.setDefault('BreathalyzerPreState', {
  firstDrinkTimeSlider: undefined,
  lastDrinkTimeSlider: undefined,
  lastDrinkNumberSlider: undefined,
  estimatedBACSlider: undefined,
  stepIndex: 0,
  finished: false
});
//Session.setDefault('questionnaireStepIndex', 0)

export class QuestionnairePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = Session.get('BreathalyzerPreState');
    console.log("BreathalyzerPreState updated!", data);

    if (typeof data === 'undefined') {
      data = {
        firstDrinkTimeSlider: undefined,
        lastDrinkTimeSlider: undefined,
        lastDrinkNumberSlider: undefined,
        estimatedBACSlider: undefined,
        stepIndex: 0,
        finished: false
      };
      Session.set('BreathalyzerPreState', data);
    }
    //data.stepIndex = Session.get('questionnaireStepIndex');
    return data;
  }

  render(){
    // var lastStep = this.props.lastStep;
    // var cancelStep = this.props.cancelStep;
    var lastStep = 3;
    // var cancelStep = this.props.cancelStep;

    var data = Session.get('BreathalyzerPreState');
    var stepIndex = data.stepIndex;
    if (!((typeof data.firstDrinkTimeSlider === 'undefined') ||
      (typeof data.lastDrinkTimeSlider === 'undefined')) &&
      (data.lastDrinkTimeSlider >= 0) &&
      (data.firstDrinkTimeSlider >= 0) &&
      (data.lastDrinkTimeSlider > data.firstDrinkTimeSlider)) {
      console.log("First was after last, so resetting last to be 20 minutes before first.");
      data.lastDrinkTimeSlider = data.firstDrinkTimeSlider - 20;
      Session.set('BreathalyzerPreState',data);
    }

    var showDone = !(((typeof data.firstDrinkTimeSlider) === 'undefined') ||
      ((typeof data.lastDrinkTimeSlider) === 'undefined') ||
      ((typeof data.lastDrinkNumberSlider) === 'undefined') ||
      ((typeof data.estimatedBAC) === 'undefined') ||
      (data.firstDrinkTimeSlider < 0) ||
      (data.lastDrinkTimeSlider < 0) ||
      (data.lastDrinkNumberSlider < 0) ||
      (data.estimatedBAC < 0));
    console.log("Show done is " + showDone);


    return(
      <div id="questionnairePage">
        <PhoneContainer >
          <GlassCard>

            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical"
              >

              <SliderStep
                id="firstDrinkTimeSlider"
                stateStruct="BreathalyzerPreState"
                stateVariable="firstDrinkTimeSlider"
                stepIndexName="stepIndex"
                stepIndex={0}
                maxStepIndex={3}
                unsetValue={(((typeof data.firstDrinkTimeSlider) === 'undefined')   || (data.firstDrinkTimeSlider < 0))}
                minValue={this.max(this.getValue("BreathalyzerPreState","lastDrinkTimeSlider",0),0)}
                maxValue={1440}
                stepIncrement={20}
                unfilledPrompt="When did you take your first drink today?"
                answerFormat="Your first drink was: %s"
                unSetLabel="Slide to select time"
                beyondLabel="Before %s"
                validLabel="%s"
                interpretValue={this.interpretDrinkTime.bind(this)}
                showDone={showDone}
                doneStep={lastStep}
                />

                <SliderStep
                  id="lastDrinkTimeSlider"
                  stateStruct="BreathalyzerPreState"
                  stateVariable="lastDrinkTimeSlider"
                  stepIndexName="stepIndex"
                  stepIndex={1}
                  maxStepIndex={3}
                  minValue={0}
                  unsetValue={(((typeof data.lastDrinkTimeSlider) === 'undefined')  || (data.lastDrinkTimeSlider < 0))}
                  maxValue={this.getValue("BreathalyzerPreState","firstDrinkTimeSlider",1440)}
                  stepIncrement={20}
                  unfilledPrompt="When did you take your last drink today?"
                  answerFormat="Your last drink was: %s"
                  unSetLabel="Slide to select time"
                  beyondLabel="Before %s"
                  validLabel="%s"
                  interpretValue={this.interpretDrinkTime.bind(this)}
                  showDone={showDone}
                  doneStep={lastStep}
                  />

                <SliderStep
                  id="lastDrinkNumberSlider"
                  stateStruct="BreathalyzerPreState"
                  stateVariable="lastDrinkNumberSlider"
                  stepIndexName="stepIndex"
                  stepIndex={2}
                  maxStepIndex={3}
                  unsetValue={(((typeof data.lastDrinkNumberSlider) === 'undefined') || (data.lastDrinkNumberSlider < 0))}
                  minValue={0}
                  maxValue={15}
                  stepIncrement={1}
                  unfilledPrompt="How many drinks did you have today?"
                  answerFormat="You had %s"
                  unSetLabel="Slide to select number of drinks"
                  beyondLabel="%s or more of your usual drinks"
                  validLabel="%s of your usual drinks"
                  interpretValue={this.echoValue.bind(this)}
                  showDone={showDone}
                  doneStep={lastStep}
                  />

                <SliderStep
                  id="estimatedBacSlider"
                  stateStruct="BreathalyzerPreState"
                  stateVariable="estimatedBAC"
                  stepIndexName="stepIndex"
                  stepIndex={3}
                  maxStepIndex={3}
                  unsetValue={(((typeof data.estimatedBAC) === 'undefined')   || (data.estimatedBAC < 0))}
                  minValue={0.0}
                  maxValue={0.15}
                  stepIncrement={0.01}
                  unfilledPrompt="What is your estimated blood alcohol level?"
                  answerFormat="Your estimate of %s"
                  unSetLabel="Slide to estimate a level"
                  beyondLabel="BAC: %0.2f or more"
                  validLabel="BAC: %0.2f"
                  interpretValue={this.echoValue.bind(this)}
                  showDone={showDone}
                  doneStep={lastStep}
                  />

            </Stepper>


          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }

  echoValue(value) {
    return value;
  }

  max(v1,v2) {
    if (v1 < v2) return v2;
    return v1;
  }

  interpretDrinkTime (minutesAgo) {
    var now = new Date();
    var ms = now.getTime();
    ms = ms - (minutesAgo*1000*60);
    now.setTime(ms);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setMinutes(10*Math.floor(now.getMinutes()/10));
    return (now.toLocaleTimeString());
  }

  getValue(structName,fieldName,def) {
    var v= Session.get(structName);
    if (typeof v === 'undefined') {
      return def;
    }
    if (typeof (v[fieldName]) === 'undefined') {
      return def;
    }
    return v[fieldName];
  }
}

ReactMixin(QuestionnairePage.prototype, ReactMeteorData);

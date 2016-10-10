import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import {Stepper} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SliderStep from  '/imports/ui/workflows/questions/SliderStep';
import RadioButtonStep from  '/imports/ui/workflows/questions/RadioButtonStep';

import {getRawValue,timeBefore,timeBeforeValue,min,echoValue,shallowCopy} from '/imports/ui/workflows/breathalyzer/Utils.js';
import { browserHistory } from 'react-router';

import { Session } from 'meteor/session';

import { insertQuestionnaireResponse } from '/imports/api/questionnaireResponses/methods';
import { Bert } from 'meteor/themeteorchef:bert';
import { CardActions } from 'react-toolbox/lib/card';


Session.setDefault('BreathalyzerPreState', {
  startTime: undefined,
  didDrink: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'string'},
  numberDrinks: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'Number'},
  firstDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
  lastDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
  estimatedBAC: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: '%'},
  stepIndex: 0,
  finished: false
});

export class QuestionnairePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = Session.get('BreathalyzerPreState');

    if (typeof data === 'undefined') {
      data = {
        didDrink: undefined,
        firstDrinkTimeSlider: undefined,
        lastDrinkTimeSlider: undefined,
        lastDrinkNumberSlider: undefined,
        estimatedBACSlider: undefined,
        stepIndex: 0,
        finished: false
      };
      Session.set('BreathalyzerPreState', shallowCopy(data));
    }

    return data;
  }
  lastStep(){

    let survey = Session.get('BreathalyzerPreState');
    console.log("survey", survey);

    // this is done on Finish Questions Button
    //console.log("finished!  yup, we're done!", this);

    let surveyData = {
      didDrink: false,
      firstDrink: '',
      lastDrink: '',
      numberDrinks: 0,
      estimatedBAC: 0.0
    };

    if (survey) {
      if (survey.didDrink && survey.didDrink.value) {
        surveyData.didDrink = (survey.didDrink.value == 'true');
      }
      if (survey.firstDrinkTime && survey.firstDrinkTime.value) {
        surveyData.firstDrink = survey.firstDrinkTime.value;
      }
      if (survey.lastDrinkTime && survey.lastDrinkTime.value) {
        surveyData.lastDrink = survey.lastDrinkTime.value;
      }
      if (survey.numberDrinks && survey.numberDrinks.value) {
        surveyData.numberDrinks = survey.numberDrinks.value;
      }
      if (survey.estimatedBAC && survey.estimatedBAC.value) {
        surveyData.estimatedBAC = survey.estimatedBAC.value;
      }
    }

    insertQuestionnaireResponse.call(surveyData, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Survey response saved!', 'success');
        this.openTab(1);
      }
    });

    Session.set('questionnaireCompleted', 'visible');
    browserHistory.push('/');
  }

  render(){
    var cancelStep = this.props.cancelStep;

    var data = Session.get('BreathalyzerPreState');
    var stepIndex = data.stepIndex;

    var showDoneVals = !(
      ((typeof data.firstDrinkTime.timeStamp) === 'undefined') ||
      ((typeof data.lastDrinkTime.timeStamp) === 'undefined') ||
      ((typeof data.numberDrinks.timeStamp) === 'undefined') ||
      ((typeof data.estimatedBAC.timeStamp) === 'undefined'));
    var showVals = (typeof data.didDrink.timeStamp !== 'undefined') &&
                  (data.didDrink.rawValue == 'true');
    var showDone = ((typeof data.didDrink.timeStamp !== 'undefined') &&
                    (data.didDrink.rawValue == 'true')) ||
                    showDoneVals;
    console.log('showDoneVals = ' + showDoneVals + ', showVals=' + showVals + ', showDone=' + showDone);
    if ((typeof data.startTime) === 'undefined') {
      data.startTime = new Date();
      Session.set('BreathalyzerPreState', shallowCopy(data));
    }
    if (showVals) {
      return (
        <div id="questionnairePage">
          <PhoneContainer >
            <GlassCard>
              <form>

              <Stepper
                activeStep={stepIndex}
                linear={false}
                orientation='vertical'
                >
                <RadioButtonStep
                  inputId='haveYouDrankRadio'
                  ref='haveYouDrankRadio'
                  stateStruct='BreathalyzerPreState'
                  stateVariable='didDrink'
                  stepIndexName='stepIndex'
                  stepIndex={0}
                  maxStepIndex={4}
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','didDrink',undefined)) === 'undefined'}
                  unfilledPrompt='Did you drink today?'
                  falseLabel='You did not drink alcohol today.'
                  trueLabel='You have had alcohol today.'
                  showDone={showDone}
                  doneStep={this.lastStep.bind(this)}
                  />
                <SliderStep
                  id="firstDrinkTimeSlider"
                  ref="firstDrinkTimeSlider"
                  stateStruct='BreathalyzerPreState'
                  stateVariable='firstDrinkTime'
                  stepIndexName='stepIndex'
                  stepIndex={1}
                  maxStepIndex={4}
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','lastDrinkTime',undefined)) === 'undefined'}
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
                  doneStep={this.lastStep.bind(this)}
                  leftLabel = 'yesterday'
                  rightLabel = 'now'
                  />
                <SliderStep
                  id="lastDrinkTimeSlider"
                  ref="lastDrinkTimeSlider"
                  stateStruct='BreathalyzerPreState'
                  stateVariable='lastDrinkTime'
                  stepIndexName='stepIndex'
                  stepIndex={2}
                  maxStepIndex={4}
                  minValue={getRawValue('BreathalyzerPreState','firstDrinkTime',-1440)}
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','lastDrinkTime',undefined)) === 'undefined'}
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
                  doneStep={this.lastStep.bind(this)}
                  rightLabel='now'
                  leftLabel='first'
                  />
                <SliderStep
                  id="lastDrinkNumberSlider"
                  ref="lastDrinkNumberSlider"
                  stateStruct='BreathalyzerPreState'
                  stateVariable='numberDrinks'
                  stepIndexName='stepIndex'
                  stepIndex={3}
                  maxStepIndex={4}
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','numberDrinks',undefined)) === 'undefined'}
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
                  doneStep={this.lastStep.bind(this)}
                  leftLabel='none'
                  rightLabel='16+'
                  />
                <SliderStep
                  id="estimatedBacSlider"
                  ref="estimatedBacSlider"
                  stateStruct='BreathalyzerPreState'
                  stateVariable='estimatedBAC'
                  stepIndexName='stepIndex'
                  stepIndex={4}
                  maxStepIndex={4}
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','estimatedBAC',undefined)) === 'undefined'}
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
                  doneStep={this.lastStep.bind(this)}
                  leftLabel='none'
                  rightLabel='0.16+'
                  />
              </Stepper>
              <CardActions>
                <FlatButton
                  label='Cancel'
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  onClick={cancelStep}
                  onTouchTap={cancelStep}
                  />
                <RaisedButton
                  id='finishQuestionsButton'
                  style={{marginBottom:0,marginTop:0}}
                  label='Finish Questions'
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={this.lastStep.bind(this)}
                  />
              </CardActions>
              </form>
            </GlassCard>
          </PhoneContainer>
        </div>
      );
    } else {
      return (
        <div id="questionnairePage">
          <PhoneContainer >
            <GlassCard>
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
                  unsetValue={(typeof getRawValue('BreathalyzerPreState','didDrink',undefined)) === 'undefined'}
                  unfilledPrompt='Did you drink today?'
                  falseLabel='You did not drink alcohol today.'
                  trueLabel='You have had alcohol today.'
                  showDone={showDone}
                  doneStep={this.lastStep.bind(this)}
                  />
              </Stepper>
              <CardActions>
                <FlatButton
                  label='Cancel'
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  onClick={cancelStep}
                  onTouchTap={cancelStep}
                  />
                <RaisedButton
                  id='finishQuestionsButton'
                  style={{marginBottom:0,marginTop:0}}
                  label='Finish Questions'
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  onTouchTap={this.lastStep.bind(this)}
                  />
              </CardActions>
            </GlassCard>
          </PhoneContainer>
        </div>
      );
    }
  }

  saveData(){

  }
}




export function Initialize() {
  let data = {
    startTime: undefined,
    didDrink: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'string'},
    numberDrinks: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'Number'},
    firstDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
    lastDrinkTime: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: 'DateTime'},
    estimatedBAC: {value: undefined, rawValue: undefined, timeStamp: undefined, unit: '%'},
    stepIndex: 0,
    finished: false
  };
  Session.set('BreathalyzerPreState', shallowCopy(data));
}

// QuestionnairePage.propTypes = {
//   hasUser: React.PropTypes.object,
//   doneStep: React.PropTypes.func.isRequired,
//   cancelStep: React.PropTypes.func.isRequired
// };
ReactMixin(QuestionnairePage.prototype, ReactMeteorData);

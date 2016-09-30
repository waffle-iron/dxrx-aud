import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import {Stepper} from 'material-ui/Stepper';
import SliderStep from  '../questions/SliderStep';
import RaisedButton from 'material-ui/RaisedButton';
import Center from '../breathalyzer/Center.js';
import {timeBefore,timeBeforeValue,shallowCopy} from '../breathalyzer/Utils.js';

Session.setDefault('AdherenceState', {
  adherencePictureTime: undefined,
  alreadyTook: false,
  assertedAdherenceTime: undefined,
  snapCnt: 0,
  finished: false
});
Session.setDefault('AdherencePicture', undefined);

export default class Adherence extends React.Component {

  getMeteorData() {
    let data = Session.get('AdherenceState');
    if (typeof data === 'undefined') {
      data = {
        adherencePictureTime: undefined,
        alreadyTook: false,
        willNotTake: false,
        willNotTakeReason: '',
        assertedAdherenceTime: undefined,
        assertedAdherenceTimeSlider: undefined,
        startTime: undefined,
        stepIndex: 0,
        snapCnt: 0,
        finished: false
      };
      Session.set('AdherenceState', data);
    }
    return data;
  }

  onSuccess(imageData) {
    var d = Session.get('AdherenceState');
    var image = 'data:image/jpeg;base64,'+imageData;
    Session.set('AdherencePicture',image);
    var x = {
      snapCnt: d.snapCnt + 1,
      adherencePictureTime: new Date(),
      alreadyTook: false,
      assertedAdherenceTime: d.assertedAdherenceTime,
      finished: d.finished
    };
    Session.set('AdherenceState',x);
  }

  onFail(message) {
    console.log('Photo capture failed because: ' + message);
  }

  capturePhoto() {
    var options = {
      quality: 60,
      allowEdit: false,
      targetWidth: 180,
      targetHeight: 240,
      destinationType: navigator.camera.DestinationType.DATA_URL
    };
    navigator.camera.getPicture(
      this.onSuccess.bind(this),
      this.onFail.bind(this),
      options);
  }

  alreadyTook(val) {
    let d = Session.get('AdherenceState');
    d.alreadyTook = val;
    Session.set('AdherenceState',shallowCopy(d));
  }

  willNotTake(val) {
    let d = Session.get('AdherenceState');
    d.willNotTake = val;
    Session.set('AdherenceState',shallowCopy(d));
  }

  render() {
    console.log('In  Adherence render');
    var lastStep = this.props.lastStep;
    var data = Session.get('AdherenceState');
    var alreadyTookMsg = [];
    var showDone = !(((typeof data.assertedAdherenceTime) === 'undefined') ||
                     ((typeof data.adherencePictureTime) === 'undefined'));
    if (typeof data.startTime === 'undefined' ) {
      data.startTime = new Date();
    }
    var pic = '';
    if (data.alreadyTook) {
      alreadyTookMsg = (<Stepper
        activeStep={0}
        linear={false}
        orientation='vertical'
        >
        <SliderStep
          stateStruct='AdherenceState'
          stateVariable='assertedAdherenceTimeSlider'
          resultVariable='assertedAdherenceTime'
          stepIndexName='stepIndex'
          stepIndex={0}
          maxStepIndex={0}
          unsetValue={((typeof data.assertedAdherenceTime) === 'undefined')}
          maxValue={0}
          minValue={-720}
          stepIncrement={10}
          unfilledSide='right'
          unfilledPrompt='When did you take your meds?'
          answerFormat='You took your meds at: %s'
          unSetLabel='Slide to select time'
          beyondLabel='You took your meds before %s'
          validLabel='%s'
          interpretValue={timeBefore.bind(this,data.startTime)}
          valueForSetting={timeBeforeValue.bind(this,data.startTime)}
          showDone={false}
          doneStep={lastStep}
          leftLabel='earlier'
          rightLabel='now'
          />
      </Stepper>);
    } else {
      pic = (<img
          id='adherencePicture' src='/TakeYourMeds.png' height='240px' width='180px'
          onClick={this.capturePhoto.bind(this)}
          />);
      if (!(typeof data.adherencePictureTime === 'undefined')) {
        pic = (<img
            id='adherencePicture' src={Session.get('AdherencePicture')}
            height='240px' width='180px' onClick={this.capturePhoto.bind(this)}
            />);
      }
    }
    var buttons = (
      <Center spacing={20}>
      <div style={{display: 'flex',flex: 1,flexWrap: 'wrap', flexDirection: 'row',
           justifyContent: 'space-around'}}>
        <FlatButton
          disableTouchRipple = {true}
          disableFocusRipple = {true}
          style = {{marginRight: 12}}
          label = {data.alreadyTook ? 'Take a Picture' : 'Already Took Meds'}
          onClick={this.alreadyTook.bind(this,!data.alreadyTook)} />
        {showDone ?
          (<RaisedButton
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            style={{marginRight: '12px'}}
            label='Next'
            onClick={this.props.lastStep} />) :
          (<FlatButton
            disableTouchRipple={true}
            disableFocusRipple={true}
            label='Next'
            onClick={this.props.lastStep} />)}
          </div>
        </Center>
    );

    console.log('Returning from Adherence');
    if (data.alreadyTook) {
      return (<div><Center spacing={20} beforeSpacing={20} afterSpacing={20}>
                    <h4>Take Your Meds</h4>
              </Center>
              {alreadyTookMsg}
              {buttons}
            </div>);
    } else {
      return (<div><Center spacing={20} beforeSpacing={20} afterSpacing={20}>
            <div style={{width: '180px', maxWidth: '180px',minWidth: '180px'}}>
                 {pic}
             </div>
           </Center>
           {buttons}
         </div>);
    }
  }
}

export function Initialize() {
  let data = {
    adherencePictureTime: undefined,
    assertedAdherenceTime: undefined,
    snapCnt: 0,
    finished: false
  };
  Session.set('AdherenceState', data);
  Session.set('AdherencePicture', undefined);
}

Adherence.propTypes = {
  hasUser: React.PropTypes.object,
  lastStep: React.PropTypes.func.isRequired,
  cancelStep: React.PropTypes.func.isRequired
};
ReactMixin(Adherence.prototype, ReactMeteorData);

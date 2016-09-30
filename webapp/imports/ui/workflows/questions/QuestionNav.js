import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


export default class QuestionNav extends React.Component {

  constructor (props) {
    super(props);
  }

  getMeteorData () {
    return {};
  }

  render () {
    var maxSteps = this.props.maxSteps;
    var showDone = this.props.showDone;
    var stepIndex = this.props.stepIndex;
    var stateStruct = this.props.stateStruct;
    var stepIndexName = this.props.stepIndexName;
    var doneStep = this.props.doneStep;

    return (((maxSteps == 0) && (!showDone)) ? null : (<div
        style={{display: 'flex', marginBottom:0,marginTop:0,flex: 1,
        flexWrap: 'wrap', flexDirection: 'row',
        justifyContent: 'space-around'}}>
       <FlatButton
         style={{marginBottom:0,marginTop:0}}
         label='Back'
         disabled={stepIndex === 0}
         disableTouchRipple={true}
         disableFocusRipple={true}
         onTouchTap={this.handlePrev.bind(this, stateStruct, stepIndexName)}
         /> {showDone ? <RaisedButton
             style={{marginBottom:0,marginTop:0}}
             label='Finish Questions'
             disableTouchRipple={true}
             disableFocusRipple={true}
             primary={true}
             onTouchTap={doneStep} /> :
          <RaisedButton
          label='Next Question'
          style={{marginBottom:0,marginTop:0}}
          disabled={stepIndex === maxSteps}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this, stateStruct, stepIndexName, maxSteps)}
          />}</div>));
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
}

QuestionNav.propTypes = {
  maxSteps: React.PropTypes.number.isRequired,
  showDone: React.PropTypes.bool.isRequired,
  stepIndex: React.PropTypes.number.isRequired,
  stateStruct: React.PropTypes.string.isRequired,
  stepIndexName: React.PropTypes.string.isRequired,
  doneStep: React.PropTypes.bool.isRequired
};

ReactMixin(QuestionNav.prototype, ReactMeteorData);

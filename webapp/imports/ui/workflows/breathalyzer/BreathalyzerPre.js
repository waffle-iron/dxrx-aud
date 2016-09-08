import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Step,Stepper,StepButton,StepContent,StepLabel} from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

Session.setDefault('BreathalyzerPreState', {
	lastDrinkTimeSlider: 0,
	lastDrinkNumberSlider: 0,
	estimatedBACSlider: 0,
	stepIndex: 0,
        isLoggedIn: false,
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
	    lastDrinkTimeSlider: 0,
	    lastDrinkNumberSlider: 0,
	    estimatedBACSlider: 0,
	    stepIndex: 0,
	    isLoggedIn: false,
	    finished: false
	};
	Session.set('BreathalyzerPreState', data);
    }
    return data;
  };

    handleNext () {
	var data = Session.get('BreathalyzerPreState');
	var stepIndex = data.stepIndex;
	if (stepIndex < 2) {
	    data.stepIndex = stepIndex + 1;
	}
	Session.set('BreathalyzerPreState',data);
    };

    handlePrev () {
	var data = Session.get('BreathalyzerPreState');
	var stepIndex = data.stepIndex;
	if (stepIndex > 0) {
	    data.stepIndex = stepIndex - 1;
	}
	Session.set('BreathalyzerPreState',data);
    };

    renderStepActions(step) {
	var data = Session.get('BreathalyzerPreState');
	return (
		<div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
		disableTouchRipple={true}
		disableFocusRipple={true}
		primary={true}
		onClick={this.handleNext.bind(this)}
		style={{marginRight: 12}}
        />
		{step > 0 && (
          <FlatButton
            label="Back"
	  disableTouchRipple={true}
	  disableFocusRipple={true}
	  onClick={this.handlePrev.bind(this)}
          />
			      )}
      </div>
		);
    };

    render() {
	console.log("In BreathalyzerPre render");
	var data = Session.get('BreathalyzerPreState');
	var stepIndex = data.stepIndex;

	return (
	<div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
		activeStep={stepIndex}
		linear={false}
          orientation="vertical"
        >
          <Step>
	<StepButton onClick={this.setData.bind(this,"stepIndex",0)}>
              When did you last drink?
            </StepButton>
            <StepContent>
<div>		{(data.lastDrinkTimeSlider==-10) ? "Slide to select time" :
			 (((data.lastDrinkTimeSlider==480) ? "Before " : "") + 
			  this.interpretDrinkTime(data.lastDrinkTimeSlider))}
		<Slider
		min={-10}
		max={480}
		step={10}
		defaultValue={-10}
		value={data.lastDrinkTimeSlider}
		onChange={this.handleWhenDrinkSlider.bind(this)}
		/>
		</div>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
	<StepButton onClick={this.setData.bind(this,"stepIndex", 1)}>
              How much did you drink?
            </StepButton>
            <StepContent>
	{(data.lastDrinkNumberSlider==(-1)) ? "Slide to select number" :
		((data.lastDrinkNumberSlider==0) ? "You did not drink." :
		 ((data.lastDrinkNumberSlider==15) ? "15 or more of your usual drinks." :
		  (data.lastDrinkNumberSlider + " of your usual drinks.")))}
		<Slider
		min={-1}
		max={15}
		step={1}
		defaultValue={-1}
		value={data.lastDrinkNumberSlider}
		onChange={this.handleHowMuchDrinkSlider.bind(this)}
		/>
	    {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
	<StepButton onClick={this.setData.bind(this,"stepIndex", 2)}>
              Estimate your blood alcohol level
            </StepButton>
            <StepContent>
		  <div>
	{(data.estimatedBACSlider<0) ? "Slide to select number" :
			   ((data.estimatedBACSlider==0.16) ? "BAC: more than 0.15" :
			    ("BAC: " + data.estimatedBACSlider ))}
		  <Slider
		  min={-0.01}
	      max={0.16}
	      step={0.01}
	      defaultValue={-0.01}
	      value={data.estimatedBACSlider}
	      onChange={this.handleEstimatedBACSlider.bind(this)}
	      />
	</div>
    {this.renderStepActions(2)}
    </StepContent>
          </Step>
        </Stepper>
      </div>
		  );
};

setData(event,value) {
    var data = Session.get('BreathalyzerPreState');
    data[event]=value;
    Session.set('BreathalyzerPreState',data);
}

handleWhenDrinkSlider(event, value) {
    this.setData("lastDrinkTimeSlider", value);
};

handleHowMuchDrinkSlider(event, value) {
    this.setData("lastDrinkNumberSlider", value);
};

handleEstimatedBACSlider(event, value) {
    this.setData("estimatedBACSlider", value);
};

interpretDrinkTime (minutesAgo) {
    var now = new Date();
    var ms = now.getTime();
    ms = ms - (minutesAgo*1000*60);
    now.setTime(ms);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setMinutes(10*Math.floor(now.getMinutes()/10));
    return (now.toLocaleTimeString());;
};
}

BreathalyzerPre.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BreathalyzerPre.prototype, ReactMeteorData);


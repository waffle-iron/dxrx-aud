import React from 'react';
import {
    Step,
	Stepper,
	StepButton,
	StepContent,
	} from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * A basic vertical non-linear implementation
 */
export default class BreathlyzerPre extends React.Component {

    sliderState = {
	lastDrinkTimeSlider: 0,
	lastDrinkNumberSlider: 0,
	estimatedBACSlider: 0
    }
	
    state = {
	stepIndex: 0,
    };

    handleNext = () => {
	const {stepIndex} = this.state;
	if (stepIndex < 2) {
	    this.setState({stepIndex: stepIndex + 1});
	}
    };

    handlePrev = () => {
	const {stepIndex} = this.state;
	if (stepIndex > 0) {
	    this.setState({stepIndex: stepIndex - 1});
	}
    };

    renderStepActions(step) {
	return (
		<div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
		disableTouchRipple={true}
		disableFocusRipple={true}
		primary={true}
		onTouchTap={this.handleNext}
		style={{marginRight: 12}}
        />
		{step > 0 && (
          <FlatButton
            label="Back"
	  disableTouchRipple={true}
	  disableFocusRipple={true}
	  onTouchTap={this.handlePrev}
          />
			      )}
      </div>
		);
    }

    render() {
	const {stepIndex} = this.state;

	return (
		<div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
		activeStep={stepIndex}
		linear={false}
          orientation="vertical"
        >
          <Step>
		<StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
              When did you last drink?
            </StepButton>
            <StepContent>
		<div>
		<Slider
		min={-10}
		max={480}
		step={10}
		defaultValue={-10}
		value={this.sliderState.lastDrinkTimeSlider}
		onChange={this.handleWhenDrinkSlider.bind(this)}
		/>
		<p>
		<span>{(this.sliderState.lastDrinkTimeSlider==-10) ? "Slide to select time" :
			 (((this.sliderState.lastDrinkTimeSlider==480) ? "Before " + "") + 
			  this.interpretDrinkTime(this.sliderState.lastDrinkTimeSlider))}</span>
		</p>
		</div>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
              How much did you drink?
            </StepButton>
            <StepContent>
		<Slider
		min={-1}
		max={15}
		step={1}
		defaultValue={-1}
		value={this.sliderState.lastDrinkNumberSlider}
		onChange={this.handleWhenDrinkSlider.bind(this)}
		/>
		<p>
		<span>{(this.sliderState.lastDrinkNumberSlider==-1)) ? "Slide to select number" :
		((this.sliderState.lastDrinkNumberSlider==0) ? "You did not drink." :
		 ((this.sliderState.lastDrinkNumberSlider==15) ? "15 or more of your usual drinks." :
		  (this.sliderState.lastDrinkNumberSlider + " of your usual drinks.")))}</span>
	    </p>
	    {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
              Estimate your blood alcohol level
            </StepButton>
            <StepContent>
		  <div>
		  <Slider
		  min={-0.01}
	      max={0.16}
	      step={0.01}
	      defaultValue={-0.01}
	      value={this.sliderState.estimatedBACSlider}
	      onChange={this.handleEstimatedBACSlider.bind(this)}
	      />
		  <p>
		       <span>{(this.sliderState.estimatedBACSlider<0) ? "Slide to select number" :
			   ((this.sliderState.estimatedBACSlider==0.16) ? "BAC: more than 0.15" :
			    ("BAC: " + this.sliderState.estimatedBACSlider))}}</span>
				</p>
				</divp>
    {this.renderStepActions(2)}
    </StepContent>
          </Step>
        </Stepper>
      </div>
		  );
    }
}

handleWhenDrinkSlider(event, value) {
    this.setState({lastDrinkTimeSlider: value});
}
handleHowMuchDrinkSlider(event, value) {
    this.setState({lastDrinkNumberSlider: value});
}
handleEstimateBACSlider(event, value) {
    this.setState({estimatedBACSlider: value});
}

interpretDrinkTime (minutesAgo) {
    var now = getTime();
    now = now - (1000*60*minutesAgo);
    var d = new Date(now);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setMinutes(10*integer(d.getMinutes()/10));
    return (d.toLocaleTimeString());;
}

BreathalyzerPre.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BreathalyzerPre.prototype, ReactMeteorData);


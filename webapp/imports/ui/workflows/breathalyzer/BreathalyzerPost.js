import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Step,Stepper,StepButton,StepContent,StepLabel} from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


Session.setDefault('BreathalyzerPostState', {
	lastDrinkTimeSlider: 0,
	lastDrinkNumberSlider: 0,
	estimatedBACSlider: 0,
	stepIndex: 0,
        isLoggedIn: false,
	finished: false
	    });

export default class BreathalyzerPost extends React.Component {

  getMeteorData() {
    let data = Session.get('BreathalyzerPostState');
    if (typeof data === 'undefined') {
	data = {
	    lastDrinkTimeSlider: 0,
	    lastDrinkNumberSlider: 0,
	    estimatedBACSlider: 0,
	    stepIndex: 0,
	    isLoggedIn: false,
	    finished: false
	};
	Session.set('BreathalyzerPostState', data);
    }
    return data;
  };


  render() {
	return (
	<div>
	    Present the results.
        </div>
	);
  }
}

BreathalyzerPost.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BreathalyzerPost.prototype, ReactMeteorData);


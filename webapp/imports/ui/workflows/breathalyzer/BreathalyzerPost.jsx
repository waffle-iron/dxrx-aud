import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


Session.setDefault('BreathalyzerPostState', {
  stepIndex: 0
});

export default class BreathalyzerPost extends React.Component {

  getMeteorData() {
    let data = Session.get('BreathalyzerPostState');
    if (typeof data === 'undefined') {
	Initialize();
    }
    return data;
  };


  render() {
	var lastStep = this.props.lastStep;
	var cancelStep = this.props.cancelStep;
	var hasUser = this.props.hasUser;
	return (
	<Card>
	<CardHeader title="Results and Progress" />
	<CardText>
	    Present the results.
	    If BAC > 0 then time to sober.
	    Positive feedback about the trendline.
	    Reinforce positive steps.
	    Encourage better behavior if bad behavior is evidenced.
	    Think about resources to show that this point.
	    Perhaps this should be in the context of the home page?
	</CardText>
	<CardActions>
		<FlatButton  label="Cancel"
		     disableTouchRipple={true}
		     disableFocusRipple={true}
	             onClick={this.props.cancelStep}
		/>
	      <RaisedButton
	      disableTouchRipple={true}
	      disableFocusRipple={true}
	      primary={true}
	      style={{marginRight: 12}}
	      label="Done"  onClick={this.props.lastStep} />
	</CardActions>
	</Card>
	);
  }
}

export function Initialize() {
    console.log("BreathalyzerPost Initialize");
    data = {
	stepIndex: 0,
    };
    Session.set('BreathalyzerPostState',data);
    console.log("BreathalyzerPost Initialize Return");
}

BreathalyzerPost.propTypes = {
    hasUser: React.PropTypes.object,
    lastStep: React.PropTypes.func.isRequired,
    cancelStep: React.PropTypes.func.isRequired,
};
ReactMixin(BreathalyzerPost.prototype, ReactMeteorData);

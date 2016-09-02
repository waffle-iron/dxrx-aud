console.log("In BreathalyzerDetail");
import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { Row, Col } from 'react-bootstrap';
import { PageContainer } from '../../components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { List, ListItem } from 'react-toolbox/lib/list';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import { Bert } from 'meteor/themeteorchef:bert';

import {ScanAndConnect, StartCountDown, Connect} from '../../../plugin/cordova-plugin-bactrack/plugin';

Session.setDefault('preferredBreathalyzerUuid', false);
Session.setDefault('breathalyzerCardState', false);

class BreathalyzerDetail extends React.Component {

  getMeteorData() {
      console.log("In breathalyzerdetail get");
      let data = Session.get('bacTrackSt');
      if (typeof data  === 'undefined') return;
      let preferredUuid = Session.get('preferredBreathalyzerUuid');
      if (typeof preferredUuid === 'undefined') return;
      console.log("After sessions");
      if (data && data.isConnected && preferredUuid) {
	  ScanAndConnect(preferredUuid,function() {updateNow()});
      }
      return data;
  };

  render() {
      console.log("In breathalyzerdetail render");
      var bac = -1;
      var haveState = true;
      var b = Session.get('bacTrackSt');
      console.log("Got state: " + b);
      if (typeof b === 'undefined') {
	  haveState = false;
      } else {
	  bac = b.bac;
      }
      if (haveState && bac) {
	  return (
		  <div className="breathalyzerDetail">
		  <CardTitle>Breathalyzer Result: {bac}</CardTitle>
		  <CardActions>
		  <Button label="Done" onClick={this.handleDoneButton.bind(this)} />
		  <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		  </CardActions>
		  </div>
	    );
      } else if (haveState && b.isConnected && b.lastMajorBacTrackState.equals("BacTrackConnected")) {
	  return (
		  <div className="breathalyzerDetail">
		  <CardTitle>Start Blow</CardTitle>
		  <CardActions>
		  <Button label="Blow" onClick={this.handleStartBlow.bind(this)} />
		  <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		  </CardActions>
		  </div>
	    );
      } else if (haveState & b.isConnected) {
	  return (
		  <div className="breathalyzerDetail">
		  <CardTitle>Breathalyzer Step: {b.lastMajorBacTrackState}</CardTitle>
		  <CardText>Countdown: {b.countdown}
	            Error: {b.errorMessage}
		  </CardText>
		  <CardActions>
		  <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		  </CardActions>
		  </div>
	    );
      } else {
	  var devices = haveState ? b.devicesFound : [];
	  let devListItems = [];
	  for (var i=0; i < devices.length; i++) {
	      var caption = devices.name + " - " + devices.uuid;
	      devListItems.push(
	        <ListItem
		uuid={devices.uuid}
		caption={caption}
		legend='Breathalyzer'
		key={i}
		/>);
	  }
	  return(
		 <Card style={this.data.style}>
		 <CardTitle>Scanning for Breathalyzers</CardTitle>
		 <List selectable ripple onChange={function (selected) {handleSelection(selected)}}>
		     {devListItems}
		 </List>
		 <DynamicSpacer />
		 <Button label="Scan" onClick={this.handleScanButton.bind(this)} />
		 </Card>
	  );
      }
  }

  openTab(index){
    // set which tab is selected
    let state = Session.get('breathalyzerCardState');
    state["index"] = index;
    Session.set('breathalyzerCardState', state);
  };

  // this could be a mixin
  handleStartBlow(){
    console.log("handleStartBlow");
    StartCountDown();
  };

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  };

  // this could be a mixin
  handleScanButton(){
      console.log("handleScanButton");
      let preferredUuid = Session.get('preferredBreathalyzerUuid');
      ScanAndConnect(preferredUuid);
  };

  // this could be a mixin
  handleSelection(selected){
      console.log("handleSelection" + selected);
      preferredUuid = Session.set('preferredBreathalyzerUuid',selected.uuid);
      Connect(selected.uuid);
  };

  // this could be a mixin
  handleDoneButton(){
    console.log("handleDoneButton");
  };
}

BreathalyzerDetail.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(BreathalyzerDetail.prototype, ReactMeteorData);

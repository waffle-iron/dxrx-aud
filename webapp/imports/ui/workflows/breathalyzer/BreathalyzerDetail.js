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
import { Tab, Tabs} from 'react-toolbox/lib/tabs';
import { Bert } from 'meteor/themeteorchef:bert';

import {Initialize,ScanAndConnect, Connect, StartCountdown,Disconnect,StopScan} from './BacTrack';

Session.setDefault('preferredBreathalyzerUuid', false);
Session.setDefault('breathalyzerCardState', false);

export default class BreathalyzerDetail extends React.Component {
    
    getMeteorData() {
	let data = Session.get('bacTrackSt');
	if (typeof data === 'undefined' || typeof data.initialized === 'undefined' || !data.initialized) {
	    Initialize();
	    data = Session.get('bacTrackSt');
	}
	if (typeof data  === 'undefined') return {};
	return data;
    };

    render() {
	console.log("In breathalyzerdetail render");
	var bac = -1;
	var haveState = true;
	var b = Session.get('bacTrackSt');
	if (typeof b === 'undefined') {
	    haveState = false;
	}
	if (haveState && ! (typeof b.bac === 'undefined')) {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>{b.bac}</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Blood Alcohol Level</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Done" onClick={this.handleDoneButton.bind(this)} />
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackStart") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Start Blowing</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackBlow") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Keep Blowing</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackAnalyzing") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Analyzing</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackCountdown") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>{b.countdown}</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Warming Up</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackConnected") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Connected</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackConnecting") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
 		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Connecting</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackConnectTimeout") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Could not connect to breathalyzer</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Try Again" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackDisconnected") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Breathalyzer disconnected</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Try Again" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackError") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>Error</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>{bacTrackSt.errorMessage}</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Try Again" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected && b.lastMajorBacTrackState=="BacTrackAPIKeyDeclined") {
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <GlassCard style={{width: '250px', marginRight: '40px', display: 'inline-block'}}>
		    <h2 style={{marginLeft: '10px'}}>&nbsp;</h2>
		    <h4 style={{marginLeft: '10px', color: 'gray'}}>Problem talking to breathalyzer</h4>
		    </GlassCard>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Try Again" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else if (haveState && b.isConnected) {
	    var errMessage = (b.errorMessage && b.errorMessage.length > 0) ? "<br/>Error: " + b.errorMessage : "";
	    return (
		    <div className="breathalyzerDetail">
		    <DynamicSpacer />
		    <CardTitle>Breathalyzer Step: {b.lastMajorBacTrackState}</CardTitle>
		    <CardText>minor state: {b.lastBacTrackState}<br/> Countdown: {b.countdown}
			{errMessage}
		    </CardText>
		    <DynamicSpacer />
		    <CardActions>
		    <Button label="Cancel" onClick={this.handleCancelButton.bind(this)} />
		    </CardActions>
		    </div>
		    );
	} else {
	    var devices = haveState ? b.devicesFound : {};
	    var k = Object.keys(devices);
	    let devListItems = [];
	    console.log("Have " + k.length + " devices");
	    var noneFound = haveState ? (b.scanStopped && k.length==0) : false;
	    if (k.length > 0) {
		var uuids = k.sort();
		for (var i=0; i < uuids.length; i++) {
		    var caption = devices[uuids[i]];
		    console.log("Adding" + caption);
		    devListItems.push(
				      <ListItem
				      caption={caption}
				      legend={uuids[i]}
				      key={uuids[i]}
				      onClick={this.handleSelection.bind(this,uuids[i])}
				      />);
		}
	    }
	    return(
		   <Card style={this.data.style}>
		   <CardTitle>{k.length==0 ? "Scan for Breathalyzers" : "Select a Breathalyzer"}</CardTitle>
		    <DynamicSpacer />
		   <List selectable ripple>
		       {devListItems}
		   </List>
		   <DynamicSpacer />
		   <Button label="Scan" onClick={this.handleScanButton.bind(this)} />
		   <DynamicSpacer />
		   <CardText>{noneFound ? "Could not find a breathalyzer, please make sure it is turned on." : ""}</CardText>
		   </Card>
		   );
	}
    }
    
    drinkingTimeSlider() {
    }

    drinkingAmountSlider() {
    }

    openTab(index){
	// set which tab is selected
	let state = Session.get('breathalyzerCardState');
	state["index"] = index;
	Session.set('breathalyzerCardState', state);
    };

    handleStartBlow(){
	console.log("handleStartBlow");
	StartCountdown();
    };

    handleCancelButton(){
	console.log("handleCancelButton");
	Disconnect();
	Initialize();
    };

    handleStopScan() {
	console.log("In stopscan");
	StopScan();
    }

    handleScanButton(){
	console.log("handleScanButton");
	let preferredUuid = Session.get('preferredBreathalyzerUuid');
	Meteor.setTimeout(this.handleStopScan.bind(this), 15000);
	ScanAndConnect(preferredUuid);
    };

    handleSelection(selected){
	console.log("handleSelection:" + selected);
	preferredUuid = Session.set('preferredBreathalyzerUuid',selected);
	Connect(selected);
    };

    handleDoneButton(){
	console.log("handleDoneButton");
	Disconnect();
	Initialize();
    };
}

BreathalyzerDetail.propTypes = {
    hasUser: React.PropTypes.object,
};
ReactMixin(BreathalyzerDetail.prototype, ReactMeteorData);

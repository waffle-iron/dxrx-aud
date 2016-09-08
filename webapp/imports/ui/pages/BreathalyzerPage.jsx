console.log("In Breathalyzerpage");
import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Step,Stepper,StepButton,StepContent,StepLabel} from 'material-ui/Stepper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { PageContainer } from '/imports/ui/components/PageContainer';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
import DocumentsList  from '/imports/ui/containers/documents-list';

import BreathalyzerPre from '/imports/ui/workflows/breathalyzer/BreathalyzerPre';
import BreathalyzerDetail from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';
import BreathalyzerPost from '/imports/ui/workflows/breathalyzer/BreathalyzerPost';
import { Meteor } from 'meteor/meteor';

Session.setDefault('bacTrackPage', {
      style: {},
      isLoggedIn: false,
      finished: false,
      stepIndex: 0
});


export class BreathalyzerPage extends React.Component {

  getMeteorData() {
    let data = Session.get('bacTrackPage');
    if (typeof data === 'undefined') {
	data = {
	      style: {},
              isLoggedIn: false,
	      finished: false,
	      stepIndex: 0
            };
	Session.set('bacTrackPage', data);
	}

    if (Meteor.user()) {
      data.isLoggedIn = true;
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    if (Session.get('appWidth') > 768) {
      Session.set('hasPageVerticalPadding', true);
      Session.set('mainPanelIsCard', true);
    } else {
      Session.set('hasPageVerticalPadding', false);
      Session.set('mainPanelIsCard', false);
    }
    Session.set('bacTrackPage', data);
    console.log("Finishing getMeteorData");
    return data;
  };

  renderAuthenticatedUserControls(isLoggedIn) {

    console.log("In renderAuthenticatedUserControls");
    // user should be able to see the addBreathalyzer component if they're logged in and looking at their
    // own profile; otherwise,
    if (isLoggedIn) {
      if (!this.props.routeParams.userId) {
	 let data = Session.get('bacTrackPage');
	 const finished = data.finished;
	 const stepIndex = data.stepIndex;
	 const contentStyle = {margin: '0 16px'};
	 console.log("In renderAuthenticatedUserControls - 2");
	 
	 return (
		        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
		        <Stepper activeStep={stepIndex}>
		          <Step>
   	             	  <StepLabel>Prelims</StepLabel>
			  </Step>
			  <Step>
			  <StepLabel>Breathalyzer</StepLabel>
			  </Step>
			  <Step>
			  <StepLabel>Results</StepLabel>
			  </Step>
			  </Stepper>
			          <div style={contentStyle}>
				            {finished ? (
					                <p>
							<a
							  href="#"
 							  onClick={(event) => {
							    event.preventDefault();
							    let data = Session.get('bacTrackPage');
							    data.stepIndex = 0;
							    data.finished = false;
							    Session.set('bacTrackPage',data);
							    }}
							    >
                Click here
              </a> to reset the example.
            </p>
	              ) : (
		                  <div>
							    <p>{this.getStepContent(stepIndex)}</p>
             <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext.bind(this)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
        );
      }
    } else {
      return ( <div></div> );
    }
    console.log("Finishing renderAuthenticatedUserControls");
};

render() {
  let data = Session.get('bacTrackPage');
  console.log("In BreathalyzerPage render");
    return (
      <div id="BreathalyzerPage">
        <PageContainer>
          { this.renderAuthenticatedUserControls(data.isLoggedIn) }
        </PageContainer>
      </div>
    );
    console.log("Finishing render");
};

handleNext () {
    let data = Session.get('bacTrackPage');
    const stepIndex = data.stepIndex;
    data.stepIndex = stepIndex + 1;
    data.finished = stepIndex >= 2;
    Session.set('bacTrackPage',data);
  };

  handlePrev () {
    let data = Session.get('bacTrackPage');
    const stepIndex = data.stepIndex;
    if (stepIndex > 0) {
	data.stepIndex = stepIndex + 1;
	Session.set('bacTrackPage',data);
    }
  };

  getStepContent(stepIndex) {
    console.log("In getStepContent with " + stepIndex);
    switch (stepIndex) {
      case 0:
        return (<div><BreathalyzerPre /></div>);
      case 1:
        return (<div><BreathalyzerDetail /></div>);
      case 2:
        return (<div><BreathalyzerPost /></div>);
      default:
        return "Error";
    }
   };
  setData(event,value) {
    var data = Session.get('bacTrackPage');
    data[event]=value;
    Session.set('bacTrackPage',data);
  };
}

BreathalyzerPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(BreathalyzerPage.prototype, ReactMeteorData);

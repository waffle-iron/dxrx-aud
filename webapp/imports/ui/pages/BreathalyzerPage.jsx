
import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import {Tab,Tabs} from  'material-ui/Tabs';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { PageContainer } from '/imports/ui/components/PageContainer';
import {Initialize as PreInitialize} from '/imports/ui/workflows/breathalyzer/BreathalyzerPre';
import {Initialize as DetailInitialize} from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';
import {Initialize as PostInitialize} from '/imports/ui/workflows/breathalyzer/BreathalyzerPost';
import BreathalyzerPre from '/imports/ui/workflows/breathalyzer/BreathalyzerPre';
import BreathalyzerDetail from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';
import BreathalyzerPost from '/imports/ui/workflows/breathalyzer/BreathalyzerPost';
import { Meteor } from 'meteor/meteor';

Session.setDefault('bacTrackPage', {
  style: {},
  isLoggedIn: false,
  finished: false,
  onTab: 'prelims',
  lastStep: undefined,
  doneStep: undefined,
  stepIndex: 0,
  substepsCompleted: false
});


export class BreathalyzerPage extends React.Component {

  getMeteorData() {
    let data = Session.get('bacTrackPage');
    if (typeof data === 'undefined') {
      data = {
        style: {},
        isLoggedIn: false,
        onTab: 'prelims',
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
  }

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
          <div id="breathalyzerPage" style={{width: '100%', maxWidth: 700, margin: 'auto'}}>

            <Stepper activeStep={stepIndex} linear={true}>

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
                  <a href="#" onClick={this.reset.bind(this)}>
                    Click here

                  </a> to reset the example.

                </p>
              ) : (
                <div>

                  <p>
                    {this.getStepContent(stepIndex)}
                  </p>
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
      return (
        <div>
        </div>
      );
    }
    console.log("Finishing renderAuthenticatedUserControls");
  }

  render() {
    let data = Session.get('bacTrackPage');
    console.log('In BreathalyzerPage render');
    return (
      <div id="breathalyzerPage" style={{paddingTop: "15px"}}>
        <PageContainer>
          <Tabs
            value={data.onTab}
            onChange={this.gotoStep.bind(this)} >
            <Tab label="Prelims" value="prelims" >

              <BreathalyzerPre
                lastStep={this.gotoStep.bind(this,'breathalyzer')}
                cancelStep={this.cancelStep.bind(this)} />
            </Tab>
            <Tab label="Breathalyzer" value='breathalyzer'>

              <BreathalyzerDetail
                lastStep={this.gotoStep.bind(this,'results')}
                cancelStep={this.cancelStep.bind(this)} />
            </Tab>
            <Tab label="Results" value="results">

              <BreathalyzerPost
                lastStep={this.doneStep.bind(this)}
                cancelStep={this.cancelStep.bind(this)} />
            </Tab>
          </Tabs>
        </PageContainer>
      </div>
    );
    console.log("Finishing render");
  }

  gotoStep (nextStep) {
    let data = Session.get('bacTrackPage');
    data.onTab = nextStep;
    Session.set('bacTrackPage',data);
  }

  cancelStep() {
    let data = Session.get('bacTrackPage');

    if (typeof data.cancelStep === 'undefined') {
      this.reset();
      this.gotoStep('prelims');
    } else {
      let c = data.cancelStep;
      this.reset();
      c();
    }
  }

  doneStep() {
    let data = Session.get('bacTrackPage');
    if (typeof data.doneStep === 'undefined') {
      this.gotoStep('prelims');
    } else {
      data.doneStep();
    }
  }


  handleNext () {
    let data = Session.get('bacTrackPage');
    const stepIndex = data.stepIndex;
    data.stepIndex = stepIndex + 1;
    data.finished = stepIndex >= 2;
    Session.set('bacTrackPage',data);
  }

  handlePrev () {
    let data = Session.get('bacTrackPage');
    const stepIndex = data.stepIndex;
    if (stepIndex > 0) {
      data.stepIndex = stepIndex - 1;
      Session.set('bacTrackPage',data);
    }
  }

  getStepContent(stepIndex) {
    console.log("In getStepContent with " + stepIndex);
    switch (stepIndex) {
      case 0:
      return (
        <div>
          <BreathalyzerPre />
        </div>
      );
      case 1:
      return (
        <div>
          <BreathalyzerDetail />
        </div>
      );
      case 2:
      return (
        <div>
          <BreathalyzerPost />
        </div>
      );
      default:
      return "Error";
    }
  };
  setData(event,value) {
    var data = Session.get('bacTrackPage');
    data[event]=value;
    Session.set('bacTrackPage',data);
  };

  reset (event) {
    console.log ("In reset.");
    //event.preventDefault();
    PreInitialize();
    DetailInitialize();
    PostInitialize();
    let data = Session.get('bacTrackPage');
    data.stepIndex = 0;
    data.finished = false;
    data.substepscompleted = false;
    Session.set('bacTrackPage',data);
  }
}

BreathalyzerPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(BreathalyzerPage.prototype, ReactMeteorData);

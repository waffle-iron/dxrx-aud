import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Tab, Tabs } from 'material-ui/Tabs';
import { PageContainer } from '/imports/ui/components/PageContainer';
import { Initialize as PreInitialize } from '/imports/ui/workflows/breathalyzer/BreathalyzerPre';
import { Initialize as DetailInitialize } from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';
import { Initialize as PostInitialize } from '/imports/ui/workflows/breathalyzer/BreathalyzerPost';
import { Initialize as AdherenceInitialize } from '/imports/ui/workflows/adherence/Adherence';
import BreathalyzerPre from '/imports/ui/workflows/breathalyzer/BreathalyzerPre';
import BreathalyzerDetail from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';
import BreathalyzerPost from '/imports/ui/workflows/breathalyzer/BreathalyzerPost';
import Adherence from '/imports/ui/workflows/adherence/Adherence.js';
import { Meteor } from 'meteor/meteor';

import { GlassCard } from '/imports/ui/components/GlassCard';

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

export class BreathalyzerControlPage extends React.Component {

  getMeteorData () {
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
    console.log('Finishing getMeteorData');
    return data;
  }

  render () {
    let data = Session.get('bacTrackPage');
    var skipIt = true;
    // console.log('In BreathalyzerControlPage render');
    return (
      <div id='breathalyzerControlPage' style={{paddingTop: '15px'}}>
        <PageContainer>
          <GlassCard>
            <BreathalyzerDetail lastStep={this.gotoStep.bind(this, 'results')} cancelStep={this.cancelStep.bind(this)} />
          </GlassCard>
        </PageContainer>
      </div>
    );
  }

  gotoStep (nextStep) {
    let data = Session.get('bacTrackPage');
    data.onTab = nextStep;
    Session.set('bacTrackPage', data);
  }

  cancelStep () {
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

  doneStep () {
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
    data.finished = stepIndex >= 3;
    Session.set('bacTrackPage', data);
  }

  handlePrev () {
    let data = Session.get('bacTrackPage');
    const stepIndex = data.stepIndex;
    if (stepIndex > 0) {
      data.stepIndex = stepIndex - 1;
      Session.set('bacTrackPage', data);
    }
  }

  getStepContent (stepIndex) {
    console.log('In getStepContent with ' + stepIndex);
    switch (stepIndex) {
    case 0:
      return (
          <div>
            <BreathalyzerPre />
          </div>
        );
    case 2:
      return (
          <div>
            <BreathalyzerDetail />
          </div>
        );
    case 1:
      return (
          <div>
            <Adherence />
          </div>
        );
    case 3:
      return (
          <div>
            <BreathalyzerPost />
          </div>
        );
    default:
      return 'Error';
    }
  }


  reset (event) {
    console.log('In reset.');
    // event.preventDefault()
    PreInitialize();
    DetailInitialize();
    PostInitialize();
    AdherenceInitialize();
    let data = Session.get('bacTrackPage');
    data.stepIndex = 0;
    data.finished = false;
    data.substepscompleted = false;
    Session.set('bacTrackPage', data);
  }
}

BreathalyzerControlPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(BreathalyzerControlPage.prototype, ReactMeteorData);

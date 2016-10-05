import { CardTitle } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';

import { browserHistory } from 'react-router';
// import Button from 'react-toolbox/lib/button';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';

export class CarePlanPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {}
    };

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

    return data;
  }
  render() {
    let style = {
      inactiveIndexCard: {
        opacity: .5,
        width: '50%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px'
      },
      indexCard: {
        cursor: 'pointer'
      },
      indexCardPadding: {
        width: '100%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px',
        position: 'relative'
      },
      completionIcon: {
        position: 'absolute',
        zIndex: 1,
        left: '-10px',
        top: '-20px'
      }
    };
    return (
      <section id='carePlanPage' style={{paddingTop: "20px"}}>
        <PageContainer>

        <section id="surveySection" style={style.indexCardPadding} onClick={ this.openQuestionnairePage.bind(this) } >
          <FloatingActionButton id="questionnaireCompleted" ref='questionnaireCompleted' style={style.completionIcon}>
            <ActionDone />
          </FloatingActionButton>
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Questionnaire'
              subtitle='A short treatment plan questionnaire.'
            />
          </GlassCard>
        </section>

        <Spacer />

          <section id="breathalyzerSection" style={style.indexCardPadding} onClick={ this.openBreathalyzerpage.bind(this) } >
            <FloatingActionButton id="breathalyzerCompleted" ref='breathalyzerCompleted' style={style.completionIcon}>
              <ActionDone />
            </FloatingActionButton>
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Breathalyzer'
                subtitle='Measure your blood alcohol level.'
              />
            </GlassCard>
          </section>

          <Spacer />

          <section id="observationSection" style={style.indexCardPadding} onClick={ this.openObservationpage.bind(this) } >
            <FloatingActionButton id="observationCompleted" ref='observationCompleted' style={style.completionIcon}>
              <ActionDone />
            </FloatingActionButton>
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Result'
                subtitle='Calculated results.'
              />
            </GlassCard>
          </section>

          <Spacer />

          <section id="adherenceSection" style={style.indexCardPadding} onClick={ this.openAdherencePage.bind(this) } >
            <FloatingActionButton id="adherenceCompleted" ref='adherenceCompleted' style={style.completionIcon}>
              <ActionDone />
            </FloatingActionButton>
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Adherence'
                subtitle='Take a photo of your medications.'
              />
            </GlassCard>
          </section>

          <Spacer />

        </PageContainer>
      </section>
    );
  }

  openDiscussionForum(){
    browserHistory.push('/forum');
  }
  openWeblog(){
    browserHistory.push('/weblog');
  }
  openDevicepage(){
    browserHistory.push('/devices');
  }
  openQuestionnairePage(){
    browserHistory.push('/questionnaire');
  }
  openAdherencePage(){
    browserHistory.push('/adherence');
  }
  openObservationpage(){
    browserHistory.push('/breathalyzer-result');
  }
  openBreathalyzerpage(){
    browserHistory.push('/breathalyzer');
  }
  openUserManagement(){
    browserHistory.push('/users');
  }
  openMyProfile(){
    browserHistory.push('/myprofile');
  }
  openPatients(){
    browserHistory.push('/patients');
  }
  openPractitioners(){
    browserHistory.push('/practitioners');
  }
  openDataManagementPage(){
    console.log('openDataManagementPage');
  }
}




ReactMixin(CarePlanPage.prototype, ReactMeteorData);

import { CardTitle, CardText } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Session } from 'meteor/session';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '../components/PageContainer';

import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';

import { CarePlans } from 'meteor/clinical:hl7-resource-careplan';

Session.setDefault("questionnaireCompleted", 'hidden');
Session.setDefault("adherenceCompleted", 'hidden');
Session.setDefault("breathalyzerCompleted", 'hidden');
Session.setDefault("resultCompleted", 'hidden');

export class CarePlanPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let data = {
      style: {},
      questionnaireCompleted: {
        style: {
          position: 'absolute',
          zIndex: 1,
          left: '-10px',
          top: '-20px',
          visibility: Session.get("questionnaireCompleted")
        }
      },
      adherenceCompleted: {
        style: {
          position: 'absolute',
          zIndex: 1,
          left: '-10px',
          top: '-20px',
          visibility: Session.get("adherenceCompleted")
        }
      },
      breathalyzerCompleted: {
        style: {
          position: 'absolute',
          zIndex: 1,
          left: '-10px',
          top: '-20px',
          visibility: Session.get("breathalyzerCompleted")
        }
      },
      resultCompleted: {
        style: {
          position: 'absolute',
          zIndex: 1,
          left: '-10px',
          top: '-20px',
          visibility: Session.get("resultCompleted")
        }
      },
      primaryContact: {
        display: ''
      },
      careplan: {
        goal: []
      }
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

    // the following assumes that we only have a single CarePlan record in the database
    if (CarePlans.find().count() > 0) {
      let carePlanTemplate = CarePlans.find().fetch()[0];
      console.log("carePlanTemplate", carePlanTemplate);

      if (carePlanTemplate ) {
        data.primaryContact = carePlanTemplate.author[0];

        data.careplan = carePlanTemplate;
      }
    }

    console.log("data", data);


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
      }
    };
    return (
      <section id='carePlanPage' style={{paddingTop: "20px"}}>
        <PageContainer>

        <section id="contactSection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Contact'
              subtitle={this.data.primaryContact.display}
            />
          </GlassCard>
        </section>

        <Spacer />

        <section id="surveySection" style={style.indexCardPadding} onClick={ this.openQuestionnairePage.bind(this) } >
          <FloatingActionButton id="questionnaireCompleted" ref='questionnaireCompleted' style={this.data.questionnaireCompleted.style}>
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

        <section id="adherenceSection" style={style.indexCardPadding} onClick={ this.openAdherencePage.bind(this) } >
          <FloatingActionButton id="adherenceCompleted" ref='adherenceCompleted' style={this.data.adherenceCompleted.style}>
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

          <section id="breathalyzerSection" style={style.indexCardPadding} onClick={ this.openBreathalyzerControlPage.bind(this) } >
            <FloatingActionButton id="breathalyzerCompleted" ref='breathalyzerCompleted' style={this.data.breathalyzerCompleted.style}>
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
            <FloatingActionButton id="observationCompleted" ref='observationCompleted' style={this.data.resultCompleted.style}>
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


        <section id="goalsSection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Goals'
              subtitle="Today's goals and accomplishments."
            />
            <CardText>
              {this.data.careplan.goal.map((doc, index) => (
                <div key={index}>
                  <Toolbar>
                    <ToolbarGroup>
                      <ToolbarTitle text={doc.display} />
                    </ToolbarGroup>
                  </Toolbar>
                  <br/>
                </div>
                ))}
            </CardText>
          </GlassCard>
        </section>

        <Spacer />

          {/* <section style={style.indexCardPadding} onClick={ this.openWeblog.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Weblog'
                subtitle='Post public thoughts using a Wordpress/Twitter style format.'
              />
            </GlassCard>
          </section>

          <Spacer /> */}

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
  openBreathalyzerControlPage(){
    browserHistory.push('/breathalyzer-control');
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

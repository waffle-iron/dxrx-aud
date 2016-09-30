import { CardTitle } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';

import { browserHistory } from 'react-router';

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
        paddingRight: '20px'
      }
    };
    return (
      <div id='carePlanPage' style={{paddingTop: "20px"}}>
        <PageContainer>

        <div style={style.indexCardPadding} onClick={ this.openDevicepage.bind(this) } >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Questionnaire'
              subtitle='A short treatment plan questionnaire.'
            />
          </GlassCard>
        </div>

        <Spacer />

          {/* <div style={style.indexCardPadding} onClick={ this.openDevicepage.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Devices'
                subtitle='BAC and other devices.'
              />
            </GlassCard>
          </div>

          <Spacer /> */}

          <div style={style.indexCardPadding} onClick={ this.openBreathalyzerpage.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Breathalyzer'
                subtitle='Measure your blood alcohol level.'
              />
            </GlassCard>
          </div>

          <Spacer />

          <div style={style.indexCardPadding} onClick={ this.openObservationpage.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Observations'
                subtitle='Observations from devices.'
              />
            </GlassCard>
          </div>

          <Spacer />

          <div style={style.indexCardPadding} onClick={ this.openBreathalyzerpage.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Adherence'
                subtitle='Take a photo of your medications.'
              />
            </GlassCard>
          </div>

          <Spacer />

          {/* <div style={style.indexCardPadding} onClick={ this.openWeblog.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Weblog'
                subtitle='Post public thoughts using a Wordpress/Twitter style format.'
              />
            </GlassCard>
          </div>

          <Spacer /> */}

        </PageContainer>
      </div>
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
  openObservationpage(){
    browserHistory.push('/observations');
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



// Index.propTypes = {
//   hasUser: React.PropTypes.object
// };
ReactMixin(CarePlanPage.prototype, ReactMeteorData);

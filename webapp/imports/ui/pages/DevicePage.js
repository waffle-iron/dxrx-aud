import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { CardTitle, CardText } from 'react-toolbox/lib/card';

// import DevicesList from '../containers/devices-list';
import DeviceDetail from '../workflows/devices/DeviceDetail';
import { DevicesDeck } from '../workflows/devices/DevicesDeck';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import { Meteor } from 'meteor/meteor';

export class DevicePage extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        isLoggedIn: false
      }
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
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

    return data;
  }


  render() {
    console.log('In DevicePage render');
    return (
      <div id='devicesPage'>
        <PageContainer>
          <GlassCard>
            <CardTitle title='Devices' />
            <CardText>
              <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
               <Tab className='newDeviceTab' label='New' style={{padded: '20px'}} onActive={ this.onNewTab } >
                 <DeviceDetail />
               </Tab>
               <Tab label='Devices' onActive={this.handleActive}>

               </Tab>
               <Tab label='Detail' onActive={this.handleActive} style={{padded: '20px'}} >
                 <DeviceDetail />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}

ReactMixin(DevicePage.prototype, ReactMeteorData);

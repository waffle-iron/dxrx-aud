import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';

import DeviceDetail from '../workflows/devices/DeviceDetail';

import { insertDevice, updateDevice, removeDeviceById } from '/imports/api/devices/methods';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';
import Button from 'react-toolbox/lib/button';

import { Meteor } from 'meteor/meteor';

export class DeviceConfigurationPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        isLoggedIn: false
      },
      deviceId: false,
      device: {
        type: "",
        identifier: "",
        patientId: ""
      }
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    if (Session.get('selectedDevice')) {
      data.deviceId = Session.get('selectedDevice');

      let selectedDevice = Devices.findOne({_id: Session.get('selectedDevice')});
      if (selectedDevice) {
        data.device = {
          id: selectedDevice._id,
          type: selectedDevice.type,
          identifier: selectedDevice.productId,
          patientId: selectedDevice.patientId
        };
      }
    }

    if (Session.get('deviceDetailState')) {
      data.device = Session.get('deviceDetailState');
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
      <div id='deviceConfigurationPage'>
        <PageContainer>
          <GlassCard>
            <CardText>
              <Input id="deviceTypeInput" ref="type" type='text' label='type' name='type' value={this.data.device.type} onChange={ this.changeState.bind(this, 'type')} />
              <Input id="deviceIdentifierInput" ref="identifier" type='text' label='identifier' name='identifier' value={this.data.device.identifier} onChange={ this.changeState.bind(this, 'identifier')} />
            </CardText>
            <CardActions>
              { this.determineButtons(this.data.deviceId) }
            </CardActions>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }

  determineButtons(deviceId){
    if (deviceId) {
      return (
        <div>
          <Button id="saveDeviceConfigurationButton" label="Save" onClick={this.handleSaveDevice.bind(this)} />
          <Button label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button id="saveDeviceConfigurationButton" label="Save" onClick={this.handleSaveDevice.bind(this)} />
      );
    }
  }

  // this could be a mixin
  changeState(field, value){

    // by default, assume there's no other data and we're creating a new device
    let deviceUpdate = {
      id: "",
      type: "",
      identifier: "",
      patientId: ""
    };

    // if there's an existing device, use them
    if (Session.get('selectedDevice')) {
      deviceUpdate = this.data.device;
    }

    if (typeof Session.get('deviceDetailState') === "object") {
      deviceUpdate = Session.get('deviceDetailState');
    }

    deviceUpdate[field] = value;
    console.log("deviceUpdate", deviceUpdate);
    Session.set('deviceDetailState', deviceUpdate);
  }


  // this could be a mixin
  handleSaveDevice(){
    console.log("this", this);

    let deviceFormData = {
      'type': this.refs.type.refs.input.value,
      'identifier': this.refs.identifier.refs.input.value
    };

    console.log("deviceFormData", deviceFormData);


    if (Session.get('selectedDevice')) {
      console.log("update practioner");
      //Meteor.users.insert(deviceFormData);
      updateDevice.call(
        {_id: Session.get('selectedDevice'), update: deviceFormData }, (error) => {
          if (error) {
            console.log("error", error);
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Device updated!', 'success');
            browserHistory.push('/profile-setup');
          }
        });
      } else {

      console.log("create a new device", deviceFormData);

      //Meteor.users.insert(deviceFormData);
      insertDevice.call(deviceFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Device added!', 'success');
          browserHistory.push('/profile-setup');
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  }
}

ReactMixin(DeviceConfigurationPage.prototype, ReactMeteorData);

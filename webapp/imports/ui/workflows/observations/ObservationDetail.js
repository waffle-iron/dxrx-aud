import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../../containers/documents-list.js';
import { AddDocument } from '../../components/AddDocument.js';

import { PageContainer } from '../../components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import ObservationTable from '../../workflows/observations/ObservationTable';

import { insertObservation, updateObservation, removeObservationById } from '../../../api/observations/methods';
import { Bert } from 'meteor/themeteorchef:bert';

import DatePicker from 'react-toolbox/lib/date_picker';
//import { DatePicker, DatePickerDialog, Calendar, CalendarDay, CalendarMonth } from 'react-toolbox/lib/date_picker';

let defaultState = false;

Session.setDefault('observationDetailState', defaultState);


export default class ObservationDetail extends React.Component {
  getMeteorData() {
    let data = {
      observationId: false,
      observation: {
        observationType: "",
	observationValue: "",
	observationUnits: "",
	observationStatus: "",
        patientId: "",
      }
    }

    if (Session.get('selectedObservation')) {
      data.observationId = Session.get('selectedObservation');

      let selectedObservation = Observations.findOne({_id: Session.get('selectedObservation')});
      if (selectedObservation) {
        data.observation = {
          id: selectedObservation._id,
	  observationType: selectedObservation.observationType,
	  observationValue: selectedObservation.observationValue,
	  observationUnits: selectedObservation.observationUnits,
	  observationStatus: selectedObservation.observationStatus,
	  patientId: selectedObservation.patientId
        }
      }
    }

    if (Session.get('observationDetailState')) {
      data.observation = Session.get('observationDetailState');
    }

    //console.log("data", data);

    return data;
  };

  render() {
      if (this.data.observation.patientid) {
	  console.log("In observationDetail with patientid " + this.data.observation.patientid);
	  return (
	  <div className="observatonDetail">
	      <CardText>
	  Should have displayed observations for {this.data.observation.patientid}
	      </CardText>
	      </div>
		  );
	  return (
		  <div className="observationDetail">
		  <CardText>
		  <Input ref="patientid" type='text' label='patientid' type='patientid' value={this.data.observation.patientId} onChange={ this.changeState.bind(this, 'patientid')} />
		  <Input ref="type" type='text' label='type' type='type' value={this.data.observation.observationType} onChange={ this.changeState.bind(this, 'type')} />
		  <Input ref="value" type='text' label='value' type='value' value={this.data.observation.observationValue} onChange={ this.changeState.bind(this, 'value')} />
		  <Input ref="units" type='text' label='units' type='units' value={this.data.observation.observationValue} onChange={ this.changeState.bind(this, 'units')} />
		  <Input ref="status" type='text' label='status' type='status' value={this.data.observation.observationValue} onChange={ this.changeState.bind(this, 'status')} />
		  <Input ref="source" type='text' label='source' type='source' value={this.data.observation.observationValue} onChange={ this.changeState.bind(this, 'source')} />
		  </CardText>
		  <CardActions>
		      { this.determineButtons(this.data.observationId) }
		  </CardActions>
		  </div>
		  );
      } else {
	  console.log("In observationDetail with null patientid");
	  return (
	  <div className="observatonDetail">
	      <CardText>
	      No observations
	      </CardText>
	      </div>
		  );
      }
  }
  determineButtons(observationId){
    if (observationId) {
      return (
        <div>
          <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
          <Button label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
      );
    }
  };
  // this could be a mixin
  changeState(field, value){

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new observation
    let observationUpdate = {
      id: "",
      observationType: "",
      observationValue: "",
      patientId: "",
    }

    // if there's an existing observation, use them
    if (Session.get('selectedObservation')) {
      observationUpdate = this.data.observation;
    }

    if (typeof Session.get('observationDetailState') === "object") {
      observationUpdate = Session.get('observationDetailState');
    }

    observationUpdate[field] = value;
    console.log("observationUpdate", observationUpdate);
    Session.set('observationDetailState', observationUpdate);
  };
  openTab(index){
    // set which tab is selected
    let state = Session.get('observationCardState');
    state["index"] = index;
    Session.set('observationCardState', state);
  };

  // this could be a mixin
  handleSaveButton(){
    console.log("this", this);

      let observationFormData = {
        'observationType': [{'text': this.refs.type.refs.input.value}],
        'observationValue': [{'text': this.refs.value.refs.input.value}],
        'observationUnits': [{'text': this.refs.units.refs.input.value}],
        'observationStatus': [{'text': this.refs.status.refs.input.value}],
        'observationSource': [{'text': this.refs.source.refs.input.value}],
        'observationPatientId': [{'text': this.refs.patientid.refs.input.value}]
      }

      if (this.refs.active.refs.input.value === "true") {
        observationFormData.active = true;
      } else {
        observationFormData.active = false;
      }

      console.log("observationFormData", observationFormData);


    if (Session.get('selectedObservation')) {
      console.log("update practioner");
      //Meteor.users.insert(observationFormData);
      updateObservation.call(
        {_id: Session.get('selectedObservation'), update: observationFormData }, (error) => {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation updated!', 'success');
          this.openTab(1);
        }
      });
    } else {

      console.log("create a new observation", observationFormData);

      //Meteor.users.insert(observationFormData);
      insertObservation.call(observationFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation added!', 'success');
          this.openTab(1);
        }
      });
    }
  };

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  };

  handleDeleteButton(){
    removeObservationById.call(
      {_id: Session.get('selectedObservation')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Observation deleted!', 'success');
        this.openTab(1);
      }
    });
  };

}


ObservationDetail.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(ObservationDetail.prototype, ReactMeteorData);

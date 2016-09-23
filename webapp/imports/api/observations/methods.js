import { Observations } from '/imports/api/observations/observations';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertObservation = new ValidatedMethod({
  name: 'observations.insert',
  validate: new SimpleSchema({
    observationType: { type: String },
    observationValue: { type: String },
    observationUnits: { type: String },
    observationStatus: { type: String },
    observationSource: { type: String },
    createdAt: { type: Date },
    patientId: { type: String }
  }).validator(),
  run(breathalyzerData) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let newObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: breathalyzerData.observationType
      },
      effectiveDateTime: new Date(),
      subject: {
        display: '',
        reference: ''
      },
      performer: {
        display: '',
        reference: ''
      },
      device: {
        display: 'Breathalyzer',
        reference: ''
      },
      valueQuantity: {
        value: breathalyzerData.observationValue,
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };

    Observations.insert(newObservation);
  }
});

export const updateObservation = new ValidatedMethod({
  name: 'observations.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'breathalyzerUpdate.observationType': { type: String, optional: true },
    'breathalyzerUpdate.observationValue': { type: String, optional: true },
    'breathalyzerUpdate.observationUnits': { type: String, optional: true },
    'breathalyzerUpdate.observationStatus': { type: String, optional: true },
    'breathalyzerUpdate.observationSource': { type: String, optional: true },
    'breathalyzerUpdate.patientId': { type: String, optional: true }
  }).validator(),
  run({ _id, breathalyzerUpdate }) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let updatedObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: breathalyzerUpdate.observationType
      },
      effectiveDateTime: new Date(),
      subject: {
        display: '',
        reference: ''
      },
      performer: {
        display: '',
        reference: ''
      },
      device: {
        display: 'Breathalyzer',
        reference: ''
      },
      valueQuantity: {
        value: breathalyzerUpdate.observationValue,
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };
    Observations.update(_id, { $set: updatedObservation });
  }
});

export const removeObservation = new ValidatedMethod({
  name: 'observations.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Observations.remove(_id);
  }
});

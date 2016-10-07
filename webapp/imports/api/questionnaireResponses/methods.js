//import { Observations, BreathalyzerSchema } from '/imports/api/observations/observations';
import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertObservation = new ValidatedMethod({
  name: 'observations.insert',
  validate: new SimpleSchema({
    observationValue: {
      optional: true,
      type: Number,
      decimal: true
    },
    observationType: {
      optional: true,
      type: String
    },
    observationStatus: {
      optional: true,
      type: String
    },
    observationSource: {
      optional: true,
      type: String
    },
    patientId: {
      optional: true,
      type: String
    }
  }).validator(),
  run(breathalyzerData) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let newObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: ''
      },
      effectiveDateTime: new Date(),
      valueQuantity: {
        value: 0,
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };

    if (breathalyzerData && breathalyzerData.observationValue) {
      newObservation.valueQuantity.value = breathalyzerData.observationValue;
    }
    if (breathalyzerData && breathalyzerData.observationType) {
      newObservation.category.text = breathalyzerData.observationType;
    }

    //Observations.schema.validate(newObservation);

    return Observations.insert(newObservation, function(error){
      if (error) {
        console.log("Observations.insert[error]", error);
      }
    });
  }
});

export const updateObservation = new ValidatedMethod({
  name: 'observations.update',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    'breathalyzerUpdate.observationType': { type: String, optional: true },
    'breathalyzerUpdate.observationValue': { type: Number, optional: true, decimal: true },
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

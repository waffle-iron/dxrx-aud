import { Medications, BreathalyzerSchema } from '/imports/api/medications/medications';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertMedication = new ValidatedMethod({
  name: 'medications.insert',
  validate: new SimpleSchema({
    medicationValue: {
      optional: true,
      type: Number,
      decimal: true
    },
    medicationType: {
      optional: true,
      type: String
    },
    medicationStatus: {
      optional: true,
      type: String
    },
    medicationSource: {
      optional: true,
      type: String
    },
    patientId: {
      optional: true,
      type: String
    }
  }).validator(),
  run(breathalyzerData) {

    // we're going to map the breathalyzer data onto a FHIR Medication resource
    let newMedication = {
      resourceType: 'Medication',
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

    if (breathalyzerData && breathalyzerData.medicationValue) {
      newMedication.valueQuantity.value = breathalyzerData.medicationValue;
    }
    if (breathalyzerData && breathalyzerData.medicationType) {
      newMedication.category.text = breathalyzerData.medicationType;
    }

    //Medications.schema.validate(newMedication);

    return Medications.insert(newMedication, function(error){
      if (error) {
        console.log("Medications.insert[error]", error);
      }
    });
  }
});

export const updateMedication = new ValidatedMethod({
  name: 'medications.update',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    'breathalyzerUpdate.medicationType': { type: String, optional: true },
    'breathalyzerUpdate.medicationValue': { type: Number, optional: true, decimal: true },
    'breathalyzerUpdate.medicationUnits': { type: String, optional: true },
    'breathalyzerUpdate.medicationStatus': { type: String, optional: true },
    'breathalyzerUpdate.medicationSource': { type: String, optional: true },
    'breathalyzerUpdate.patientId': { type: String, optional: true }
  }).validator(),
  run({ _id, breathalyzerUpdate }) {

    // we're going to map the breathalyzer data onto a FHIR Medication resource
    let updatedMedication = {
      resourceType: 'Medication',
      status: 'final',
      category: {
        text: breathalyzerUpdate.medicationType
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
        value: breathalyzerUpdate.medicationValue,
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };
    Medications.update(_id, { $set: updatedMedication });
  }
});

export const removeMedication = new ValidatedMethod({
  name: 'medications.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Medications.remove(_id);
  }
});

import { Devices } from '/imports/api/devices/devices';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertDevice = new ValidatedMethod({
  name: 'devices.insert',
  validate: new SimpleSchema({
    deviceName: { type: String },
    deviceProductId: { type: String },
    createdAt: { type: Date },
    patientId: { type: String }
  }).validator(),
  run(deviceFormData) {

    // we convert our form data into a FHIR Device object
    var newDevice = {
      'resourceType' : 'Device',
      'identifier' : [{
        'value': deviceFormData.deviceProductId,
        type: {
          text: 'Serial Number'
        }
      }],
      'type' : {
        text: deviceFormData.deviceName
      },
      'note' : [],
      'status' : 'available',
      'manufacturer' : 'BACtrack',
      'model' : 'Mobile Breathalyzer',
      'version' : 'BT-M5',
      'udi' : 'S8B-BTBLE40',
      'patient' : {
        display:  '',
        reference: ''
      }
    };

    // if we can look up the Patient info; now is the time to perform a JOIN
    // and attach that kind of data
    if (deviceFormData.patientId) {
      let patient = Patients.findOne(patientId);
      if (patient) {
        newDevice.patient.display = patient.name.text;
        newDevice.patient.display = 'Patients/' + patient._id;
      }
    }

    Devices.insert(newDevice);
  }
});

export const updateDevice = new ValidatedMethod({
  name: 'devices.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'updateData.deviceName': { type: String, optional: true },
    'updateData.deviceProductId': { type: String, optional: true }
  }).validator(),
  run({ _id, updateData }) {

    // TODO: need to confirm that this works
    // should we replace the entire record, or just the changed fields?

    // we convert our form data into a FHIR Device object
    var deviceUpdate = {
      'resourceType' : 'Device',
      'identifier' : [{
        'value': deviceFormData.deviceProductId,
        type: {
          text: 'Serial Number'
        }
      }],
      'type' : {
        text: deviceFormData.deviceName
      },
      'note' : [],
      'status' : 'available',
      'manufacturer' : 'BACtrack',
      'model' : 'Mobile Breathalyzer',
      'version' : 'BT-M5',
      'udi' : 'S8B-BTBLE40',
      'patient' : {
        display:  '',
        reference: ''
      }
    };

    // if we can look up the Patient info; now is the time to perform a JOIN
    // and attach that kind of data
    if (deviceFormData.patientId) {
      let patient = Patients.findOne(patientId);
      if (patient) {
        newDevice.patient.display = patient.name.text;
        newDevice.patient.display = 'Patients/' + patient._id;
      }
    }

    Devices.update(_id, { $set: deviceUpdate });
  }
});

export const removeDevice = new ValidatedMethod({
  name: 'devices.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Devices.remove(_id);
  }
});


import { Observations } from '/imports/api/observations/observations';

Meteor.publish('observations', function(){
  return Observations.find()
});

Meteor.methods({
  createObservation:function(observationObject){
    check(observationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Observation...');
      Observations.insert(observationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Observation created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeObservation:function(deviceId){
    check(deviceId, String);

    if (Observations.find().count() === 0) {
      console.log('No records found in Observations collection.  Lets create some...');

      var defaultObservation = {
        resourceType: 'Observation',
        status: 'final',
        category: {
          text: 'Breathalyzer'
        },
        effectiveDateTime: new Date(),
        // subject: {
        //   display: Patients.findByUserId(this.userId).fullName(),
        //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()
        // },
        subject: {
          display: Meteor.users.findOne(this.userId).fullName(),
          reference: 'Meteor.users/' + this.userId
        },
        performer: {
          display: Meteor.users.findOne(this.userId).fullName(),
          reference: 'Meteor.users/' + this.userId
        },
        device: {
          display: 'Breathalyzer',
          reference: deviceId
        },
        valueQuantity: {
          value: 0.00,
          unit: '%',
          system: 'http://unitsofmeasure.org'
        }
      };

      Meteor.call('createObservation', defaultObservation);
    } else {
      console.log('Observations already exist.  Skipping.');
    }
  },
  dropObservations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping observations... ');
      Observations.find().forEach(function(patient){
        Observations.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});

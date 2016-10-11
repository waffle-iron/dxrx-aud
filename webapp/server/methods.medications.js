
// import { Medications } from '/imports/api/medications/medications';
import { Medications } from 'meteor/clinical:hl7-resource-medication';

Meteor.publish('medications', function(){
  return Medications.find();
});

Meteor.methods({
  createMedication:function(medicationObject){
    check(medicationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Medication...');
      Medications.insert(medicationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Medication created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeMedication:function(deviceId){
    check(deviceId, String);

    if (Medications.find().count() === 0) {
      console.log('No records found in Medications collection.  Lets create some...');

      var defaultMedication = {
        resourceType: 'Medication',
        "code" :  {
        },
        "isBrand" :  false,
        "manufacturer" :  {
          display: "",
          reference: ""
        },
        product: {
          form: {

          },
          ingredient: [{
            item: {
              display: '',
              reference: ''
            }
          }]
        }
      };

      // if (this.userId) {
      //   let user = Meteor.users.findOne({_id: this.userId});
      //   if (user && user.profile && user.profile.name && user.profile.name.text) {
      //
      //     //   display: Patients.findByUserId(this.userId).fullName(),
      //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()
      //
      //     defaultMedication.subject.display = user.profile.name.text;
      //     defaultMedication.subject.reference = 'Meteor.users/' + this.userId;
      //
      //     defaultMedication.performer.display = user.profile.name.text;
      //     defaultMedication.performer.reference = 'Meteor.users/' + this.userId;
      //   }
      // }

      Meteor.call('createMedication', defaultMedication);
    } else {
      console.log('Medications already exist.  Skipping.');
    }
  },
  dropMedications: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping medications... ');
      Medications.find().forEach(function(patient){
        Medications.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});

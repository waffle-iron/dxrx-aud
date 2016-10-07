
import { Questionnaires } from '/imports/api/questionnaires/questionnaires';

Meteor.publish('questionnaires', function(){
  return Questionnaires.find()
});

Meteor.methods({
  createQuestionnaire:function(questionnaireObject){
    check(questionnaireObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Questionnaire...');
      Questionnaires.insert(questionnaireObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Questionnaire created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeQuestionnaire:function(deviceId){
    check(deviceId, String);

    if (Questionnaires.find().count() === 0) {
      console.log('No records found in Questionnaires collection.  Lets create some...');

      var defaultQuestionnaire = {
        resourceType: 'Questionnaire',
        status: 'final',
        category: {
          text: 'Breathalyzer'
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
          reference: deviceId
        },
        valueQuantity: {
          value: 0.00,
          unit: '%',
          system: 'http://unitsofmeasure.org'
        }
      };

      if (this.userId) {
        let user = Meteor.users.findOne({_id: this.userId});
        if (user && user.profile && user.profile.name && user.profile.name.text) {

          //   display: Patients.findByUserId(this.userId).fullName(),
          //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

          defaultQuestionnaire.subject.display = user.profile.name.text;
          defaultQuestionnaire.subject.reference = 'Meteor.users/' + this.userId;

          defaultQuestionnaire.performer.display = user.profile.name.text;
          defaultQuestionnaire.performer.reference = 'Meteor.users/' + this.userId;
        }
      }

      Meteor.call('createQuestionnaire', defaultQuestionnaire);
    } else {
      console.log('Questionnaires already exist.  Skipping.');
    }
  },
  dropQuestionnaires: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping questionnaires... ');
      Questionnaires.find().forEach(function(patient){
        Questionnaires.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});

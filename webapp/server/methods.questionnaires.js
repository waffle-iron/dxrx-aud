
//import { Questionnaires } from '/imports/api/questionnaires/questionnaires';

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






















Meteor.startup(function (){



  var questionnaire = {
    resourceType: "Questionnaire",
    identifier: [{
      use: "usual",
      type: {
        text: "BreathalyzerQuestionnaire",
        coding: [{
          system: "dxrxmedical",
          version: "1",
          code: "dxrx",
          display: "Breathalyzer Survey Questionnaire",
          userSelected: false
        }]
      }
    }],
    version: "1",
    status: "published",
    date: new Date(),
    publisher: "Abigail Watson",
    telecom: [],
    subjectType: "",
    group: {
      linkId: "",
      title: "BREATHALYZER SURVEY",
      concept: {},
      text: "GAIL",
      required: false,
      repeats: true,
      group: [{
        linkId: "1",
        title: "ABOUT YOU",
        concept: {},
        required: false,
        repeats: false,
        question: [{
          linkId: "birthdate",
          concept: {
              title:"Patient Age"
          },
          text: "What is your birthdate?",
            helpText: "Your birthdate is taken into consideration for the risk assessment.",
            placeholderText: "MM-DD-YYYY",
            type: "date",
          required: true,
          repeats: false
        }, {
          linkId: "ethnicity",
          concept: {
              title:"Race/Ethnicity"
          },
          text: "What is your ethnicity?",
          helptext: "foo",
          type: "radio",
          required: true,
          repeats: false,
          options: [
            "White",
            "African American / Black",
            "Hispanic",
            "Chinese",
            "Japanese",
            "Filipino",
            "Other Asian American",
            "American Indian or Alaskan Native",
            "Hawaiian",
            "Other Pacific Islander",
            "Unknown"
          ]
        }] // edit here for new question
      }] // edit here for new page
    }
  };
});

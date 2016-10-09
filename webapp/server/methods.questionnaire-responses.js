
//import { QuestionnaireResponses } from '/imports/api/questionnaireResponses/questionnaireResponses';

Meteor.publish('questionnaireResponses', function(){
  return QuestionnaireResponses.find()
});

Meteor.methods({
  createQuestionnaireResponse:function(questionnaireResponseObject){
    check(questionnaireResponseObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating QuestionnaireResponse...');
      QuestionnaireResponses.insert(questionnaireResponseObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('QuestionnaireResponse created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeQuestionnaireResponse:function(deviceId){
    check(deviceId, String);

    if (QuestionnaireResponses.find().count() === 0) {
      console.log('No records found in QuestionnaireResponses collection.  Lets create some...');

      var defaultQuestionnaireResponse = {
        resourceType: "QuestionnaireResource",
        identifier: {
          use: "usual",
          type: {
            text: "BreathalyzerQuestionnaireResponse",
            coding: [{
              system: "dxrxmedical",
              version: "1",
              code: "dxrx",
              display: "Breathalyzer Survey Questionnaire",
              userSelected: false
            }]
          }
        },
        status: "completed",
        questionnaire: {
          display: "BreathalyzerQuestionnaire",
          reference: "Questionnaires/BreathalyzerQuestionnaire"
        },
        author: {
          display: '',
          reference: ''
        },
        subject: {
          display: '',
          reference: ''
        },
        source: {
          display: '',
          reference: ''
        },
        encounter: {
          display: '',
          reference: ''
        },
        group: {
          linkId: '',
          title: "BREATHALYZER SURVEY",
          text: "Breathalyzer Survey",
          required: false,
          repeats: true,
          question: [{
            linkId: "survey-question-1",
            text: "Have you drank today?",
            answer: [{
              valueInteger: 0,
              valueString: ''
            }]
          }, {
            linkId: "survey-question-2",
            text: "When did you take your first drink today?",
            answer: [{
              valueString: ''
            }]
          }, {
            linkId: "survey-question-3",
            text: "When did you take your last drink today?",
            answer: [{
              valueString: ''
            }]
          }, {
            linkId: "survey-question-4",
            text: "How many drinks did you have today?",
            helpText: "Slide to select number of drinks",
            answer: [{
              valueString: ''
            }]
          }, {
            linkId: "survey-question-5",
            text: "What is your estimated blood alcohol level?",
            helpText: "Slide to estimate level",
            answer: [{
              valueString: ''
            }]
          }] // edit here for new question
        }
      };

      if (this.userId) {
        let user = Meteor.users.findOne({_id: this.userId});
        if (user && user.profile && user.profile.name && user.profile.name.text) {

          //   display: Patients.findByUserId(this.userId).fullName(),
          //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

          defaultQuestionnaireResponse.subject.display = user.profile.name.text;
          defaultQuestionnaireResponse.subject.reference = 'Meteor.users/' + this.userId;

          defaultQuestionnaireResponse.performer.display = user.profile.name.text;
          defaultQuestionnaireResponse.performer.reference = 'Meteor.users/' + this.userId;
        }
      }

      Meteor.call('createQuestionnaireResponse', defaultQuestionnaireResponse);
    } else {
      console.log('QuestionnaireResponses already exist.  Skipping.');
    }
  },
  dropQuestionnaireResponses: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping questionnaireResponses... ');
      QuestionnaireResponses.find().forEach(function(patient){
        QuestionnaireResponses.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});

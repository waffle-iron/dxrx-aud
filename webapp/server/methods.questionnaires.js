
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
  initializeQuestionnaire:function(){

    if (Questionnaires.find().count() === 0) {
      console.log('No records found in Questionnaires collection.  Lets create some...');

      var breathalyzerQuestionnaire = {
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
        publisher: "DxRx Medical",
        telecom: [],
        subjectType: '',
        group: {
          linkId: '',
          title: "BREATHALYZER SURVEY",
          concept: {},
          text: "Breathalyzer Survey",
          required: false,
          repeats: true,
          question: [{
            linkId: "survey-question-1",
            text: "Have you drank today?",
            helptext: "foo",
            type: "radio",
            required: true,
            repeats: false,
            options: [
              "Nope!  No alcohol today.",
              "I have had alcohol today"
            ]
          }, {
            linkId: "survey-question-2",
            text: "When did you take your first drink today?",
            helpText: "Slide to select time",
            type: "time",
            required: true,
            repeats: false
          }, {
            linkId: "survey-question-3",
            text: "When did you take your last drink today?",
            helpText: "Slide to select time",
            type: "time",
            required: true,
            repeats: false
          }, {
            linkId: "survey-question-4",
            text: "How many drinks did you have today?",
            helpText: "Slide to select number of drinks",
            type: "number",
            required: true,
            repeats: false
          }, {
            linkId: "survey-question-5",
            text: "What is your estimated blood alcohol level?",
            helpText: "Slide to estimate level",
            type: "number",
            required: true,
            repeats: false
          }] // edit here for new question
        }
      };

      Meteor.call('createQuestionnaire', breathalyzerQuestionnaire);
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

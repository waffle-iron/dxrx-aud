//import { QuestionnaireResponses, BreathalyzerSchema } from '/imports/api/questionnaireResponses/questionnaireResponses';
import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Meteor } from 'meteor/meteor';

export const insertQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.insert',
  //survey response
  validate: new SimpleSchema({
    haveHadAlcoholToday: {
      type: Boolean
    },
    firstDrink: {
      type: Date,
      optional: true
    },
    lastDrink: {
      type: Date,
      optional: true
    },
    numberOfDrinks: {
      type: Number,
      optional: true
    },
    estimatedBloodAlcoholLevel: {
      type: Number,
      decimal: true,
      optional: true
    }
  }).validator(),
  run(surveyData) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let newQuestionnaireResponse = {
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
            valueInteger: surveyData.haveHadAlcoholToday
          }]
        }, {
          linkId: "survey-question-2",
          text: "When did you take your first drink today?",
          answer: [{
            valueString: surveyData.firstDrink
          }]
        }, {
          linkId: "survey-question-3",
          text: "When did you take your last drink today?",
          answer: [{
            valueString: surveyData.lastDrink
          }]
        }, {
          linkId: "survey-question-4",
          text: "How many drinks did you have today?",
          helpText: "Slide to select number of drinks",
          answer: [{
            valueString: surveyData.numberOfDrinks
          }]
        }, {
          linkId: "survey-question-5",
          text: "What is your estimated blood alcohol level?",
          helpText: "Slide to estimate level",
          answer: [{
            valueString: surveyData.estimatedBloodAlcoholLevel
          }]
        }]
      }
    };


    return QuestionnaireResponses.insert(newQuestionnaireResponse, function(error){
      if (error) {
        console.log("QuestionnaireResponses.insert[error]", error);
      }
    });
  }
});

export const updateQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.update',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    'surveyUpdate.haveHadAlcoholToday': {
      type: Boolean
    },
    'surveyUpdate.firstDrink': {
      type: Date,
      optional: true
    },
    'surveyUpdate.lastDrink': {
      type: Date,
      optional: true
    },
    'surveyUpdate.numberOfDrinks': {
      type: Number,
      optional: true
    },
    'surveyUpdate.estimatedBloodAlcoholLevel': {
      type: Number,
      decimal: true,
      optional: true
    }
  }).validator(),
  run({ _id, surveyUpdate }) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let updatedQuestionnaireResponse = {
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
        display: Meteor.user.getFullName(),
        reference: 'Meteor.users/' + Meteor.userId
      },
      subject: {
        display:Meteor.user.getFullName(),
        reference: 'Meteor.users/' + Meteor.userId
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
            valueInteger: surveyUpdate.haveHadAlcoholToday
          }]
        }, {
          linkId: "survey-question-2",
          text: "When did you take your first drink today?",
          answer: [{
            valueString: surveyUpdate.firstDrink
          }]
        }, {
          linkId: "survey-question-3",
          text: "When did you take your last drink today?",
          answer: [{
            valueString: surveyUpdate.lastDrink
          }]
        }, {
          linkId: "survey-question-4",
          text: "How many drinks did you have today?",
          helpText: "Slide to select number of drinks",
          answer: [{
            valueString: surveyUpdate.numberOfDrinks
          }]
        }, {
          linkId: "survey-question-5",
          text: "What is your estimated blood alcohol level?",
          helpText: "Slide to estimate level",
          answer: [{
            valueString: surveyUpdate.estimatedBloodAlcoholLevel
          }]
        }]
      }
    };
    QuestionnaireResponses.update(_id, { $set: updatedQuestionnaireResponse });
  }
});

export const removeQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    QuestionnaireResponses.remove(_id);
  }
});

//import { QuestionnaireResponses, BreathalyzerSchema } from '/imports/api/questionnaireResponses/questionnaireResponses';
import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.insert',
  //survey response
  validate: new SimpleSchema({

  }).validator(),
  run(surveyData) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let newQuestionnaireResponse = {
      resourceType: 'QuestionnaireResponse',
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

  }).validator(),
  run({ _id, surveyUpdate }) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let updatedQuestionnaireResponse = {
      resourceType: 'QuestionnaireResponse'
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

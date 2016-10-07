//import { Questionnaires, BreathalyzerSchema } from '/imports/api/questionnaires/questionnaires';
import { Questionnaires } from 'meteor/clinical:hl7-resource-questionnaire';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.insert',
  validate: new SimpleSchema().validator(),
  run(surveyData) {

    let newQuestionnaire = {};

    return Questionnaires.insert(newQuestionnaire, function(error){
      if (error) {
        console.log("Questionnaires.insert[error]", error);
      }
    });
  }
});

export const updateQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.update',
  validate: new SimpleSchema().validator(),
  run({ _id, surveyUpdate }) {

    // we're going to map the breathalyzer data onto a FHIR Questionnaire resource
    let updatedQuestionnaire = {
      resourceType: 'Questionnaire'
    };
    Questionnaires.update(_id, { $set: updatedQuestionnaire });
  }
});

export const removeQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Questionnaires.remove(_id);
  }
});

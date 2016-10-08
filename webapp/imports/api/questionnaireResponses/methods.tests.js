/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';
import { insertQuestionnaireResponse, updateQuestionnaireResponse, removeQuestionnaireResponse } from './methods.js';

describe('QuestionnaireResponses methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      QuestionnaireResponses.find().forEach(function(questionnaireResponse){
        QuestionnaireResponses.remove({_id: questionnaireResponse._id});
      });
    }
  });

  it('inserts a document into the QuestionnaireResponses collection', function () {
    let questionnaireResponseId = insertQuestionnaireResponse.call({
      haveHadAlcoholToday: 1,
      firstDrink: new Date(),
      lastDrink: new Date(),
      numberOfDrinks: 4,
      estimatedBloodAlcoholLevel: 0.02
    });
    let response = QuestionnaireResponses.findOne({_id: questionnaireResponseId });

    assert.equal(response.status, 'completed');
    assert.equal(response.identifier.type.text, 'BreathalyzerQuestionnaireResponse');
    assert.equal(response.questionnaire.display, 'BreathalyzerQuestionnaire');
    assert.equal(response.group.text, 'Breathalyzer Survey');

    assert.equal(response.group.question[0].answer[0].valueInteger, 1);
    assert.ok(response.group.question[1].answer[0].valueString);
    assert.ok(response.group.question[2].answer[0].valueString);
    assert.equal(response.group.question[3].answer[0].valueString, 4);
    assert.equal(response.group.question[4].answer[0].valueString, 0.02);
  });

  it('updates a document in the QuestionnaireResponses collection', function () {
    const { _id } = Factory.create('questionnaireResponse');

    updateQuestionnaireResponse.call({
      _id,
      update: {
        haveHadAlcoholToday: 1,
        firstDrink: new Date(),
        lastDrink: new Date(),
        numberOfDrinks: 12,
        estimatedBloodAlcoholLevel: 0.08
      }
    });

    const response = QuestionnaireResponses.findOne(_id);

    assert.equal(response.status, 'completed');
    assert.equal(response.identifier.type.text, 'BreathalyzerQuestionnaireResponse');
    assert.equal(response.questionnaire.display, 'BreathalyzerQuestionnaire');
    assert.equal(response.group.text, 'Breathalyzer Survey');

    assert.equal(response.group.question[0].answer[0].valueInteger, 1);
    assert.ok(response.group.question[1].answer[0].valueString);
    assert.ok(response.group.question[2].answer[0].valueString);
    assert.equal(response.group.question[3].answer[0].valueString, 12);
    assert.equal(response.group.question[4].answer[0].valueString, 0.08);
  });

  it('removes a document from the QuestionnaireResponses collection', function () {
    const { _id } = Factory.create('document');
    removeQuestionnaireResponse.call({ _id });
    const getQuestionnaireResponse = QuestionnaireResponses.findOne(_id);
    assert.equal(getQuestionnaireResponse, undefined);
  });
});

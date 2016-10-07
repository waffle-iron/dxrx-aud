/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { QuestionnaireResponses } from './questionnaireResponses.js';
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

    });
    let getQuestionnaireResponse = QuestionnaireResponses.findOne({_id: questionnaireResponseId });
    assert.equal(getQuestionnaireResponse.category.text, 'BAC');
    assert.equal(getQuestionnaireResponse.valueQuantity.value, 0.08);
  });

  it('updates a document in the QuestionnaireResponses collection', function () {
    const { _id } = Factory.create('questionnaireResponse');

    updateQuestionnaireResponse.call({
      _id,
      breathalyzerUpdate: {

      }
    });

    const getQuestionnaireResponse = QuestionnaireResponses.findOne(_id);
    assert.equal(getQuestionnaireResponse.valueQuantity.value, 0.07);
  });

  it('removes a document from the QuestionnaireResponses collection', function () {
    const { _id } = Factory.create('document');
    removeQuestionnaireResponse.call({ _id });
    const getQuestionnaireResponse = QuestionnaireResponses.findOne(_id);
    assert.equal(getQuestionnaireResponse, undefined);
  });
});

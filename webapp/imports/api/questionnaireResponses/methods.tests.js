/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Questionnaires } from './questionnaires.js';
import { insertQuestionnaire, updateQuestionnaire, removeQuestionnaire } from './methods.js';

describe('Questionnaires methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      Questionnaires.find().forEach(function(questionnaire){
        Questionnaires.remove({_id: questionnaire._id});
      });
    }
  });

  it('inserts a document into the Questionnaires collection', function () {
    let questionnaireId = insertQuestionnaire.call({

    });
    let getQuestionnaire = Questionnaires.findOne({_id: questionnaireId });
    assert.equal(getQuestionnaire.category.text, 'BAC');
    assert.equal(getQuestionnaire.valueQuantity.value, 0.08);
  });

  it('updates a document in the Questionnaires collection', function () {
    const { _id } = Factory.create('questionnaire');

    updateQuestionnaire.call({
      _id,
      breathalyzerUpdate: {
        
      }
    });

    const getQuestionnaire = Questionnaires.findOne(_id);
    assert.equal(getQuestionnaire.valueQuantity.value, 0.07);
  });

  it('removes a document from the Questionnaires collection', function () {
    const { _id } = Factory.create('document');
    removeQuestionnaire.call({ _id });
    const getQuestionnaire = Questionnaires.findOne(_id);
    assert.equal(getQuestionnaire, undefined);
  });
});

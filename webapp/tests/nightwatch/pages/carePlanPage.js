module.exports = {
  url: 'http://localhost:3000',
  commands: [{
    skipToQuestionnaire: function() {
      return this;
    },
    skipToBreathalyzer: function() {
      return this;
    },
    skipToAdherencePhoto: function() {
      return this;
    },
    verifyQuestionnaireCompleted: function() {
      return this;
    },
    verifyBreathalyzerCompleted: function() {
      return this;
    },
    verifyPhotoTaken: function() {
      return this;
    },
    verifyMedicationHistoryElements: function() {
      return this;
    },
    verifyObservationHistoryElements: function() {
      return this;
    },
    verifyHealthLogElements: function() {
      return this;
    }
  }],
  elements: {
    indexPage: {
      selector: '#indexPage'
    }
  }
};

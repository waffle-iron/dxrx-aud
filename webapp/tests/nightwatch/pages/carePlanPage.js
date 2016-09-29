module.exports = {
  url: 'http://localhost:3000',
  commands: [{
    verifyCareplanElements: function() {
      return this
        .verify.elementPresent('#contactInfoSection')

        .verify.elementPresent('#surveySection')
        .verify.elementPresent('#breathalyzerSection')
        .verify.elementPresent('#observationSection')
        .verify.elementPresent('#adherenceSection');
    },
    skipToSurvey: function() {
      return this.click('#surveySection');
    },
    skipToBreathalyzer: function() {
      return this.click('#breathalyzerSection');
    },
    skipToObservation: function() {
      return this.click('#observationSection');
    },
    skipToAdherencePhoto: function() {
      return this.click('#adherenceSection');
    },
    verifySurveyCompleted: function() {
      return this
      .verify.elementPresent('#surveySectionCompleted');
    },
    verifyBreathalyzerCompleted: function() {
      return this
        .verify.elementPresent('#breathalyzerSectionCompleted');
    },
    verifyAdherencePhotoTaken: function() {
      return this
        .verify.elementPresent('#adherenceSectionCompleted');
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
    surveySection: {
      selector: '#surveySection'
    },
    breathalyzerSection: {
      selector: '#breathalyzerSection'
    },
    observationSection: {
      selector: '#observationSection'
    },
    adherenceSection: {
      selector: '#adherenceSection'
    }
  }
};

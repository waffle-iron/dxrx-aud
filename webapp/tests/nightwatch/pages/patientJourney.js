module.exports = {
  url: 'https://localhost:3000',
  commands: [{
    takeTour: function(){
      return this
        .verify.elementPresent('#tourPage')
        .verify.elementPresent("#signInButton")
        .verify.elementPresent("#signUpButton")
        .click("#signUpButton");
    },
    acceptWelcomeScreen: function(){
      return this
        .verify.elementPresent('#welcomePatientPage')

        // add stuff here

        .verify.elementPresent("#configureDeviceButton")
        .click("#configureDeviceButton");
    },
    configureDevice: function(){
      return this
        .verify.elementPresent('#deviceConfigurationPage')

        // add stuff here
        // add device ID input?

        .verify.elementPresent("#configureProfileButton")
        .click("#configureProfileButton");
    },
    configureProfile: function(){
      return this
        .verify.elementPresent('#myProfilePage')

        .verify.elementPresent("#fullNameInput")
        .verify.elementPresent("#genderInput")
        .verify.elementPresent("#weightInput")

        .verify.elementPresent("#saveProfileButton")
        .click("#saveProfileButton");
    },
    verifyCarePlanHistoryElements: function(){
      return this
        .verify.elementPresent('#carePlanHistoryPage');
    },
    startCarePlan: function(){
      return this
        .verify.elementPresent('#carePlanPage')

        .verify.elementPresent('#surveySection')
        .verify.elementPresent('#breathalyzerSection')
        .verify.elementPresent('#observationSection')
        .verify.elementPresent('#adherenceSection')

        .click('#surveySection');
    },
    fillOutSurvey: function(){
      return this
        .verify.elementPresent('#surveyPage')

        .verify.elementPresent("#firstDrinkTimeSlider")
        .verify.elementPresent("#lastDrinkTimeSlider")
        .verify.elementPresent("#lastDrinkNumberSlider")
        .verify.elementPresent("#estimatedBacSlider")

        .click("#firstDrinkTimeSlider")
        .click("#lastDrinkTimeSlider")
        .click("#lastDrinkNumberSlider")
        .click("#estimatedBacSlider");
    },
    simulateBreath: function(){
      return this
        .verify.elementPresent('#breathalyzerPage');
    },
    takeAdherencePhoto: function(){
      return this
        .verify.elementPresent('#adherencePhotoPage');
    },
    verifyObservation: function(){
      return this
        .verify.elementPresent('#observationPage');
    },
    verifyDailyBreathalyzerGoal: function(){
      return this
        .verify.elementPresent('#dailyUseGoalPage');
    }
  }],
  elements: {}
};

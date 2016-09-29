module.exports = {
  url: 'https://localhost:3000',
  commands: [{
    signup: function(firstName, lastName, emailAddress, password, accessCode) {
      return this
        .waitForElementPresent("#signupPage", 5000)
        .verify.elementPresent('input[name="firstName"]')
        .verify.elementPresent('input[name="lastName"]')
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('input[name="accessCode"]')

        .clearValue('input[name="firstName"]')
        .clearValue('input[name="lastName"]')
        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')
        .clearValue('input[name="accessCode"]')

        .setValue('input[name="firstName"]', firstName)
        .setValue('input[name="lastName"]', lastName)
        .setValue('input[name="emailAddress"]', emailAddress)
        .setValue('input[name="password"]', password)
        .setValue('input[name="accessCode"]', accessCode)

      .verify.elementPresent('#signupButton')
      .click('#signupButton');
    },
    takeTour: function(){
      return this
        .waitForElementPresent('#tourPage', 5000)
        .verify.elementPresent("#signUpButton")
        .verify.elementPresent("#signUpButton")
        .click("#signUpButton");
    },
    acceptWelcomeScreen: function(){
      return this
        .waitForElementPresent('#welcomePatientPage', 5000)

        // add stuff here

        .verify.elementPresent("#configureDeviceButton")
        .click("#configureDeviceButton");
    },
    configureDevice: function(){
      return this
        .waitForElementPresent('#deviceConfigurationPage', 5000)

        // add stuff here
        // add device ID input?

        .verify.elementPresent("#configureProfileButton")
        .click("#configureProfileButton");
    },
    configureProfile: function(){
      return this
        .waitForElementPresent('#myProfilePage', 5000)

        .verify.elementPresent("#fullNameInput")
        .verify.elementPresent("#genderInput")
        .verify.elementPresent("#weightInput")

        .verify.elementPresent("#saveProfileButton")
        .click("#saveProfileButton");
    },
    verifyCarePlanHistoryElements: function(){
      return this
        .waitForElementPresent('#carePlanHistoryPage', 5000);
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

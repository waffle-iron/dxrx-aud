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
    configureDevice: function(type, identifier){
      var self = this;
      self
        .waitForElementPresent('#deviceConfigurationPage', 5000)

        .verify.elementPresent("#deviceTypeInput")
        .verify.elementPresent("#deviceIdentifierInput")

        .clearValue("#deviceTypeInput")
        .clearValue("#deviceIdentifierInput");

      var typeArray = type.split('');
      typeArray.forEach(function(letter){
        self.setValue("#deviceTypeInput", letter);
      });

      var identifierArray = identifier.split('');
      identifierArray.forEach(function(letter){
        self.setValue("#deviceIdentifierInput", letter);
      });

      return self.verify.elementPresent("#saveDeviceConfigurationButton")
        .click("#saveDeviceConfigurationButton");
    },
    configureProfile: function(){
      return this
        .waitForElementPresent('#profileSetupPage', 5000)

        .verify.elementPresent("#givenNameInput")
        .verify.elementPresent("#familyNameInput")
        .verify.elementPresent("#genderInput")
        .verify.elementPresent("#weightInput")

        .verify.elementPresent("#saveProfileButton")
        .click("#saveProfileButton");
    },
    verifyCarePlanHistoryElements: function(){
      return this
        .waitForElementPresent('#carePlanHistoryPage', 5000);
    },
    verifyCarePlanElements: function(){
      return this
        .waitForElementPresent('#carePlanPage', 5000)

        .verify.elementPresent('#surveySection')
        .verify.elementPresent('#breathalyzerSection')
        .verify.elementPresent('#observationSection')
        .verify.elementPresent('#adherenceSection');
    },

    startSurvey: function() {
      return this.click('#surveySection');
    },

    fillOutSurvey: function(va1, val2, val3, val4, client){
      this
        .waitForElementPresent('#questionnairePage', 2000);

      this.waitForElementPresent("#firstDrinkTimeSlider", 2000);
      client
        .pause(1500)
        .moveToElement("#firstDrinkTimeSlider", 20, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#firstDrinkTimeSlider-NextQuestion", 2000)
        .click("#firstDrinkTimeSlider-NextQuestion");


      this.waitForElementPresent("#lastDrinkTimeSlider", 2000);
      client
        .pause(1000)
        .moveToElement("#lastDrinkTimeSlider", 60, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#lastDrinkTimeSlider-NextQuestion", 2000)
        .click("#lastDrinkTimeSlider-NextQuestion");

      this.waitForElementPresent("#lastDrinkNumberSlider", 2000);
      client
        .pause(500)
        .moveToElement("#lastDrinkNumberSlider", 20, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#lastDrinkNumberSlider-NextQuestion", 2000)
        .click("#lastDrinkNumberSlider-NextQuestion");

      this.waitForElementPresent("#estimatedBacSlider", 2000);
      client
        .pause(500)
        .moveToElement("#estimatedBacSlider", 20, 0)
        .mouseButtonClick(0)

        .waitForElementPresent("#finishQuestionsButton", 2000)
        .click("#finishQuestionsButton");

      return this;
    },
    startBreathalyzer: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#breathalyzerSection');
    },
    reviewObservation: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#observationSection');
    },
    startAdherencePhoto: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#adherenceSection');
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

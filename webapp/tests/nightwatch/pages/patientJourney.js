module.exports = {
  url: 'https://localhost:3000',
  commands: [{
    takeProductTour: function(){
      return this
        .waitForElementPresent('#tourPage', 5000);

    },
    beginRegistration(){
      return this
        .verify.elementPresent("#beginRegistrationButton")
        .click("#beginRegistrationButton");
    },
    fillInSignupInfo: function(firstName, lastName, emailAddress, password, accessCode) {
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
        .setValue('input[name="accessCode"]', accessCode);

    },
    signup: function(){
      return this
        .verify.elementPresent('#signupButton')
        .click('#signupButton');
    },

    reviewPatientWelcomePage: function(){
      return this
        .waitForElementPresent('#welcomePatientPage', 5000);
        // add stuff here
    },
    beginDeviceConfiguration: function(){
      return this
        .waitForElementPresent("#configureDeviceButton", 5000)
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
      return self;
    },
    saveDeviceConfiguration: function(){
      return this.verify.elementPresent("#saveDeviceConfigurationButton")
        .click("#saveDeviceConfigurationButton");
    },
    reviewProfileConfiguration: function(){
      return this
        .waitForElementPresent('#profileSetupPage', 5000)

        .verify.elementPresent("#givenNameInput")
        .verify.elementPresent("#familyNameInput")
        .verify.elementPresent("#genderInput")
        .verify.elementPresent("#weightInput");
    },
    saveUserProfile: function(){
      return this
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
        .verify.elementPresent('#adherenceSection')
        .verify.elementPresent('#breathalyzerSection')
        .verify.elementPresent('#observationSection')

        .verify.elementPresent('#goalsSection');
    },

    startSurvey: function() {
      return this.click('#surveySection');
    },

    fillOutSurvey: function(va1, val2, val3, val4, client){
      this
        .waitForElementPresent('#questionnairePage', 2000);

      this.waitForElementPresent("input[name='didDrink'][value='true']", 2000)
        .click("input[name='didDrink'][value='true']");

      this.waitForElementPresent("#firstDrinkTimeButton", 2000)
        .click("#firstDrinkTimeButton");

      client
        .waitForElementPresent("#firstDrinkTimeSlider", 2000)
        .pause(1000)
        .moveToElement("#firstDrinkTimeSlider", 20, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#lastDrinkTimeButton", 2000)
        .click("#lastDrinkTimeButton");


      client
        .waitForElementPresent("#lastDrinkTimeSlider", 2000)
        .pause(1000)
        .moveToElement("#lastDrinkTimeSlider", 80, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#numberDrinksButton", 2000)
        .click("#numberDrinksButton");

      client
        .waitForElementPresent("#numberDrinksSlider", 2000)
        .pause(1000)
        .moveToElement("#numberDrinksSlider", 20, 0)
        .mouseButtonClick(0)
        .waitForElementPresent("#estimatedBACButton", 2000)
        .click("#estimatedBACButton");

      client
        .waitForElementPresent("#estimatedBACSlider", 2000)
        .pause(1000)
        .moveToElement("#estimatedBACSlider", 20, 0)
        .mouseButtonClick(0);

      return this;
    },
    finishSurvey: function(){
      return this.waitForElementPresent("#finishQuestionsButton", 2000)
        .click("#finishQuestionsButton");

      return this;
    },
    startBreathalyzer: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#breathalyzerSection');
    },
    startAdherencePhoto: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#adherenceSection');
    },
    alreadyTookMeds: function(){
      return this
        .waitForElementPresent('#adherencePage', 5000)
        .verify.elementPresent("#adherencePicture")
        .verify.elementPresent("#takePhotoButton")
        .verify.elementPresent("#nextButton")

        .click("#takePhotoButton");
    },
    simulateBreath: function(simulatedBloodAlcoholLevel){
      return this
        .verify.elementPresent('#breathalyzerControlPage')
        .verify.elementPresent("#scanButton")
        .verify.elementPresent("#skipButton")

        .click("#skipButton");
    },
    takeAdherencePhoto: function(){
      return this
        .verify.elementPresent('#adherencePhotoPage');
    },
    startResultsReview: function() {
      return this
        .waitForElementPresent('#carePlanPage', 5000)
        .click('#observationSection');
    },
    verifyResults: function(){
      return this
        .verify.elementPresent('#breathalyzerResultPage');
    },
    returnToCarePlan(){
      return this
        .verify.elementPresent("#cancelResultsButton")
        .click("#cancelResultsButton");
    },
    verifyDailyBreathalyzerGoal: function(){
      return this
        .verify.elementPresent('#dailyUseGoalPage');
    },
    saveScreenshot: function(path, client){
      client.saveScreenshot(path);
      return this;
    }
  }],
  elements: {}
};

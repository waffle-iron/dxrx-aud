module.exports = {
  url: 'https://localhost:3000',
  commands: [{
    login: function(email, password){
      return this
        .waitForElementPresent('#homePageLoggedOut', 10000)
        .verify.elementPresent('#login')

        .clearValue('#a0-signin_easy_email')
        .clearValue('#a0-signin_easy_password')

        .setValue('#a0-signin_easy_email', email)
        .setValue('#a0-signin_easy_password', password)

        .waitForElementPresent('#loginButton', 3000)
        .click('#loginButton');
    },
    signup: function(user){
      return this
        .waitForElementPresent('#homePageLoggedOut', 3000)
        .waitForElementPresent('#goRegister', 3000)
        .click('#goRegister')
        .waitForElementPresent('#entryTitle', 3000)
        .verify.containsText('#entryTitle', 'REGISTER')

        .clearValue('#a0-signup_easy_email')
        .clearValue('#a0-signup_easy_password')

        .setValue('#a0-signup_easy_email', user.email)
        .setValue('#a0-signup_easy_password', user.password)

        .waitForElementPresent('#registerButton', 3000)
        .click('#registerButton');
    },
    takeTour: function(){
      return this;
    },
    acceptWelcomeScreen: function(){
      return this;
    },
    configureDevice: function(){
      return this;
    },
    configureProfile: function(){
      return this;
    },
    completeCarePlan: function(){
      return this;
    },
    verifyCarePlanHistoryElements: function(){
      return this;
    },
    startCarePlan: function(){
      return this;
    },
    fillOutQuestionnaire: function(){
      return this;
    },
    simulateBreath: function(){
      return this;
    },
    takeAdherencePhoto: function(){
      return this;
    },
    verifyObservation: function(){
      return this;
    },
    verifyDailyBreathalyzerGoal: function(){
      return this;
    }
  }],
  elements: {}
};

// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['routes'],
  before: function(client){
    client
      .url('http://localhost:3000').pause(3000)
      .executeAsync(function(){
        Meteor.call('initializeUser', 'janedoe@test.org', 'janedoe123', 'Jane', 'Doe');
      });
  },
  '/': function (client) {
    client
      .resizeWindow(1024, 768)

      .url('http://localhost:3000').pause(1000)
        .verify.elementPresent('body')
        .saveScreenshot('tests/nightwatch/screenshots/patientRoutes/root.png');
  },
  '/about': function (client) {
    client
      .url('http://localhost:3000/about').pause(1200)
        .verify.elementPresent('#aboutPage')
        .saveScreenshot('tests/nightwatch/screenshots/patientRoutes/about.png');
  },

  '/signup': function (client) {
    client
      .url('http://localhost:3000/signup').pause(1200)
        .verify.elementPresent('#signupPage')
        .saveScreenshot('tests/nightwatch/screenshots/patientRoutes/signup.png');
  },
  '/login': function (client) {
    client
      .url('http://localhost:3000/login').pause(1200)
        .verify.elementPresent('#loginPage');
  },
  '/ (signed in)': function (client) {
    client
      .executeAsync(function(){
        Meteor.loginWithPassword({email: 'janedoe@test.org'}, 'janedoe123', function(error, result){
          if (error) {
            console.log("[error]Meteor.loginWithPassword", error);
          }
        });
      }).pause(3000)
      .url('http://localhost:3000').pause(2000)
      .verify.elementPresent('#carePlanPage')
      .saveScreenshot('tests/nightwatch/screenshots/patientRoutes/careplan.png');
  },
  '/weblog': function (client) {
    client
      .url('http://localhost:3000/weblog').pause(2000)
      .verify.elementPresent('#weblogPage')
      .saveScreenshot('tests/nightwatch/screenshots/patientRoutes/weblog.png')
      .end();
  }

};




module.exports = {
  tags: ['default', 'patient', 'journey', 'patientjourney'],
  beforeEach: function(client){
    client
      .url('http://localhost:3000').pause(3000)
      .executeAsync(function(user){
        Meteor.call('dropRiskAssessmentsCollection');
        Meteor.call('dropQuestionnaireResponsesCollection');
        Meteor.call('dropPatients');
        Meteor.call('dropTestUsers');
        Meteor.call('dropDevices');
        //Meteor.call('initializeUser', user.email, user.password);
      }, [client.globals.defaultUser]);
  },
  'Default User Journey': function(client){
    client
      .resizeWindow(400, 960)
      .pause(3000);

    const user = client.globals.defaultUser;
    const patientJourney = client.page.patientJourney();

    client
      .url('http://localhost:3000/tour')
      .sectionBreak(user.email);

    patientJourney
      .takeTour()
      .signup('Jane', 'Doe', 'janedoe@test.org', 'janedoe123', '')
      .acceptWelcomeScreen()
      .configureDevice('Breathalyzer', 'abc-123')
      .configureProfile('Jane Doe', 'Female', '160lbs')
      .verifyCarePlanElements()
      .startSurvey()
      .fillOutSurvey(2, 3, 7, 8, client)
      .startBreathalyzer();
      // .simulateBreath(0.02)
      // .startAdherencePhoto()
      // .takeAdherencePhoto()
      // .verifyObservation(0.02)
      // .verifyCarePlanHistoryElements();

    client
      .executeAsync(function(){
        Meteor.logout();
      })
      .end();

  }
};

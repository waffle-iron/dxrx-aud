


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
        Meteor.call('initializeUser', user.email, user.password);
      }, [client.globals.defaultUser]);
  },
  'Default User Journey': function(client){
    client
      .resizeWindow(1200, 1800)
      .pause(3000);

    const user = client.globals.defaultUser;
    const patientJourney = client.page.patientJourney();

    client
      .url('http://localhost:3000')
      .sectionBreak(user.email);

    patientJourney
      .takeTour()
      .signup('janedoe@test.org', 'janedoe123', 'Jane Doe')
      .acceptWelcomeScreen()
      .configureDevice('abc-123')
      .configureProfile('Jane Doe', 'Female', '160lbs')
      .startCarePlan()
      .fillOutSurvey(2, 3, 7, 8)
      .simulateBreath(0.02)
      .takeAdherencePhoto()
      .verifyObservation(0.02)
      .verifyCarePlanHistoryElements();

    client
      .executeAsync(function(){
        Meteor.logout();
      })
      .end();

  }
};




module.exports = {
  tags: ['default', 'patient', 'journey', 'patientjourney'],
  beforeEach: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(user){
        Meteor.call('dropRiskAssessmentsCollection');
        Meteor.call('dropQuestionnaireResponsesCollection');
        Meteor.call('dropPatients');
        Meteor.call('dropTestUsers');
        Meteor.call('initializeUser', user.email, user.password);
      }, [client.globals.defaultUser]);
  },
  "Default User Journey": function(client){
    client
      .resizeWindow(1200, 1800)
      .pause(3000)

    const user = client.globals.defaultUser;
    const patientJourney = client.page.patientJourney();

      client
        .url("http://localhost:3000")
        .sectionBreak(user.email)

      patientJourney
        .takeTour()
        .signup()
        .signin()
        .acceptWelcomeScreen()
        .configureDevice()
        .configureProfile()
        .completeCarePlan()
        .verifyCarePlanHistoryElements()
        .startCarePlan()
        .fillOutQuestionnaire()
        .simulateBreath()
        .takeAdherencePhoto()
        .verifyObservation()

      client
        .executeAsync(function(data){
          Meteor.logout();
        })
        .end();

  }
};

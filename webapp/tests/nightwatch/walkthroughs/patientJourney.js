


module.exports = {
  tags: ['default', 'patient', 'journey', 'patientjourney'],
  beforeEach: function(client){
    client
      .url('http://localhost:3000').pause(3000)
      .executeAsync(function(){
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
      .takeProductTour()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/A-TourPage.png', client)

      .beginRegistration()
      .fillInSignupInfo('Jane', 'Doe', 'janedoe@test.org', 'janedoe123', '')
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/B-SignUpPage.png', client)

      .signup()
      .reviewPatientWelcomePage()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/C-PatientWelcomePage.png', client)

      .beginDeviceConfiguration()
      .configureDevice('Breathalyzer', 'abc-123')
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/D-DeviceConfiguration.png', client)
      .saveDeviceConfiguration()

      .reviewProfileConfiguration('Jane Doe', 'Female', '160lbs')
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/E-ProfileConfiguration.png', client)
      .saveUserProfile()

      .verifyCarePlanElements()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/F-CarePlan-Initial.png', client)

      .startSurvey()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/G-Survey-Begin.png', client)
      .fillOutSurvey(2, 3, 7, 8, client)
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/H-Survey-End.png', client)
      .finishSurvey()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/I-CarePlan-SurveyCompleted.png', client)

      .startAdherencePhoto()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/J-AdherencePhoto.png', client)
      .alreadyTookMeds()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/K-CarePlan-AdherenceCompleted.png', client)

      .startBreathalyzer()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/L-BreathalyzerStart.png', client)
      .simulateBreath(0.02)
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/M-CarePlan-BreathalyzerCompleted.png', client)

      .startResultsReview()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/N-BreathalyzerResults.png', client)
      .verifyResults(0.02)

      .returnToCarePlan()
      .saveScreenshot('tests/nightwatch/screenshots/patientJourney/O-CarePlan-Completed.png', client);

    client
      .executeAsync(function(){
        Meteor.logout();
      })
      .end();

  }
};

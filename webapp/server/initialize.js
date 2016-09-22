
// https://www.hl7.org/fhir/riskassessment-example-prognosis.json.html
// https://www.hl7.org/fhir/riskassessment-example-cardiac.json.html
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function(){
  console.log("DxRx starting up...");
  console.log("Environment: " + process.env.NODE_ENV);
  console.log("");

  if (process.env.INITIALIZE) {
    console.log("Initializing records...");

    Meteor.call('initializeCarePlan');
    Meteor.call('initializeCondition');
    Meteor.call('initializeEncounters');
    Meteor.call('initializeGoals');
    Meteor.call('initializeObservation', 'bac-12345');
    Meteor.call('initializePatient');
    Meteor.call('initializePractitioner');
  }
});

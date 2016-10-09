import '/imports/startup/server';

import '/imports/api/users/methods';
import '/imports/api/practitioners/methods';
import '/imports/api/patients/methods';
import '/imports/api/observations/methods';
import '/imports/api/questionnaires/methods';
import '/imports/api/questionnaireResponses/methods';
//import '/imports/api/observations/server/publications';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){
  Meteor.call('initializeUser', 'janedoe@test.org', 'janedoe123', 'Jane', 'Doe');
});

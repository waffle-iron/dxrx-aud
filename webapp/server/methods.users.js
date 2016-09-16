import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Meteor.startup(function (){
  if (process.env.INITIALIZE && (Meteor.users.find().count() === 0)) {
    console.log('No users found.');

    Meteor.call('initializeTestUsers');
  }
});

// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  console.log('Accounts.onCreateUser');

  // We'll set the role manually
  if (options.profile.accessCode && Meteor.settings && Meteor.settings.private && Meteor.settings.private.accessCode) {
    if (options.profile.accessCode === Meteor.settings.private.accessCode) {
      user.roles = ["practitioner"];
    }
  }

  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});



Meteor.methods({
  verifyPractitioner: function(userId){
    check(userId, String);

    return Roles.userIsInRole(userId, 'practitioner');
  },
  grantPractitionerAccess: function(userId, accessCode){
    check(userId, String);
    check(accessCode, String);
    console.log('User ' + userId + ' submitted access code "' + accessCode + '".  Verifying access code...');

    //console.log('Meteor.settings.private.accessCode', Meteor.settings.private.accessCode);

    if (Meteor.settings.private.accessCode) {
      if (accessCode === Meteor.settings.private.accessCode) {
        console.log('Access code verified.  Granting practitioner access...');
        Roles.setUserRoles(userId, 'practitioner');
        Roles.addUsersToRoles(userId, 'practitioner');
      }

    } else {
      console.log('No access code set.  Skipping access grant.');
      console.log('Set Meteor.settings.private.accessCode to enable this feature.');
    }

  },
  dropTestUsers: function(){
    console.log('Dropping test users...');

    if ((process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'circle')) {
      let count = 0;
      Meteor.users.find().forEach(function(user){
        if (user.emails && user.emails[0]) {
          if ((user.emails[0].address === 'alice@test.org') || (user.emails[0].address === 'janedoe@test.org') || (user.emails[0].address === 'admin@admin.com')){
            Meteor.users.remove({_id: user._id});
            count++;
          }
        }
      });
      console.log(count + ' users removed.');

    } else {
      console.log('Not in test mode.  Try using NODE_ENV=test');
    }
  },
  updateUserProfile: function(userId, profileData){
    check(userId, String);
    check(profileData, Object);

    console.log('Updating user profile...', profileData);

    Meteor.users.update({_id: userId}, {$set: { profile: profileData }}, function(error, result){
      if(error){
        HipaaLogger.logEvent('error', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'RiskAssessments', null, null, null, error);
      }
      if(result){
        HipaaLogger.logEvent('update', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'Meteor.users', null, null, null, null);
      }
    });
  },
  initializeUser: function(email, password, firstName, lastName){
    check(email, String);
    check(password, String);
    check(firstName, String);
    check(lastName, String);

    console.log('Initializing user ' + email);

    if (Meteor.users.find({'emails.0.address': email}).count() === 0) {
      let newUserId = Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: {
            text: firstName + ' ' + lastName,
            given: firstName,
            family: lastName
          }
        }
      });

      if (newUserId) {
        console.log('User created with ID ' + newUserId);
      }
    } else {
      console.log("User with email already exists; skipping.");
    }
  },
  initializeTestUsers: function(){
    console.log('Initializing users...');

    //==============================================================================
    // JANEDOE

    if (Meteor.users.find({'emails.0.address': 'janedoe@test.org'}).count() === 0) {
      Accounts.createUser({
        email: 'janedoe@test.org',
        password: 'janedoe123',
        profile: {
          name: {
            text: 'Jane Doe',
            given: 'Jane',
            family: 'Doe'
          }
        }
      });
    }


    //==============================================================================
    // ADMIN

    if (Meteor.users.find({'emails.0.address': 'admin'}).count() === 0) {
      Accounts.createUser({
        password: 'admin123',
        email: 'admin@admin.com',
        profile: {
          name: {
            text: 'System Admin',
            given: 'System',
            family: 'Admin'
          }
        }
      });
    }
  }
});

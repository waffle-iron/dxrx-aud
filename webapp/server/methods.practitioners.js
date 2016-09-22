

Meteor.methods({
  createPractitioner:function(practitionerObject){
    check(practitionerObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Practitioner...');
      Practitioners.insert(practitionerObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Practitioner created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializePractitioner:function(){
    if (Practitioners.find().count() === 0) {
      console.log("No records found in Practitioners collection.  Lets create some...");

      var defaultPractitioner = {

      };

      Meteor.call('createPractitioner', defaultPractitioner);
    } else {
      console.log('Practitioners already exist.  Skipping.');
    }
  }
});



Meteor.methods({
  createPatient:function(patientObject){
    check(patientObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Patient...');
      Patients.insert(conditionObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Patient created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializePatient:function(){
    if (Patients.find().count() === 0) {
      console.log("No records found in Patients collection.  Lets create some...");

      var defaultPatient = {

      };

      Meteor.call('createPatient', defaultPatient);
    } else {
      console.log('Patients already exist.  Skipping.');
    }
  }
});

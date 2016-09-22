
import { Observations } from '/imports/api/observations/observations';

Meteor.publish('observations', function(){
  return Observations.find()
});

Meteor.methods({
  createObservation:function(observationObject){
    check(observationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Observation...');
      Observations.insert(observationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Observation created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeObservation:function(){
    if (Observations.find().count() === 0) {
      console.log("No records found in Observations collection.  Lets create some...");

      var defaultObservation = {

      };

      Meteor.call('createObservation', defaultObservation);
    } else {
      console.log('Observations already exist.  Skipping.');
    }
  }
});



Meteor.methods({
  createEncounter:function(encounterObject){
    check(encounterObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Encounter...');
      Encounters.insert(encounterObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Encounter created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeEncounter:function(){
    if (Encounters.find().count() === 0) {
      console.log("No records found in Encounters collection.  Lets create some...");

      var defaultEncounter = {

      };

      Meteor.call('createEncounter', defaultEncounter);
    } else {
      console.log('Encounters already exist.  Skipping.');
    }
  }
});

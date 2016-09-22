

Meteor.methods({
  createGoal:function(goalObject){
    check(goalObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Goal...');
      Goals.insert(goalObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Goal created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeGoal:function(){
    if (Goals.find().count() === 0) {
      console.log("No records found in Goals collection.  Lets create some...");

      var defaultGoal = {

      };

      Meteor.call('createGoal', defaultGoal);
    } else {
      console.log('Goals already exist.  Skipping.');
    }
  }
});

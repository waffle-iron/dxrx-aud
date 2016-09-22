

Meteor.methods({
  createCondition:function(conditionObject){
    check(conditionObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Condition...');
      Conditions.insert(conditionObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Condition created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeCondition:function(){

    if (Conditions.find().count() === 0) {
      console.log("No records found in Conditions collection.  Lets create some...");

      var defaultCondition = {

      };

      Meteor.call('createCondition', defaultCondition);
    } else {
      console.log('Conditions already exist.  Skipping.');
    }
  },
  dropConditions: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping conditions... ');
      Conditions.find().forEach(function(condition){
        Conditions.remove({_id: condition._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});

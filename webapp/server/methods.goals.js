

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
  initializeGoals:function(){
    if (Goals.find().count() === 0) {
      console.log("No records found in Goals collection.  Lets create some...");

      var breathalyzerOnce = {
        description: 'Use the breathalyzer once a day.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', breathalyzerOnce);


      var breathalyzerTwice = {
        description: 'Use the breathalyzer twice a day.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', breathalyzerTwice);


      var takeYourMeds = {
        description: 'Take your meds for today.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', takeYourMeds);
      
      
      var takeYourMedsRegularly = {
        description: 'Take your meds during an entire weekly treatment.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', takeYourMedsRegularly);


      var lowerAverageIntake = {
        description: 'Lower your weekly average alcohol intake compared to your baseline.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', lowerAverageIntake);


      var lowerCravings = {
        description: 'Lower your daily cravings for alcohol.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', lowerCravings);


      var developAwareness = {
        description: 'Develop awareness of your drinking behaviors.',
        author: {
          display: 'Dr. John Mendelson'
        },
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', developAwareness);



    } else {
      console.log('Goals already exist.  Skipping.');
    }
  },
  dropGoals: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping goals... ');
      Goals.find().forEach(function(goal){
        Goals.remove({_id: goal._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});

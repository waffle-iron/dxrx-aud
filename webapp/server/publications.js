

Meteor.publish("CarePlans", function (){
  return CarePlans.find();
});

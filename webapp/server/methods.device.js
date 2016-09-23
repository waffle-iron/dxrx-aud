

Meteor.methods({
  createDevice:function(deviceObject){
    check(deviceObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Device...');
      Devices.insert(deviceObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Device created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeDevice:function(){

    if (Devices.find().count() === 0) {
      console.log('No records found in Devices collection.  Lets create some...');

      var defaultDevice = {
        'resourceType' : 'Device',
        'identifier' : [],
        'type' : {
          text: 'Breathalyzer'
        },
        'note' : [],
        'status' : 'available',
        'manufacturer' : 'BACtrack',
        'model' : '',
        'version' : '',
        'manufactureDate' : '',
        'expiry' : '',
        'udi' : '',
        'lotNumber' : '',
        'patient' : {
          display:  '',
          reference: ''
        }
      }

      Meteor.call('createDevice', defaultDevice);
    } else {
      console.log('Devices already exist.  Skipping.');
    }
  },
  dropDevices: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping devices... ');
      Devices.find().forEach(function(device){
        Devices.remove({_id: device._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});

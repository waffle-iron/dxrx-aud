import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Devices } from '/imports/api/devices/devices';
import { Observations } from '/imports/api/observations/observations';

var lastUser;

const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: [{ given: 'Abigail', family: 'Watson' , text: 'Abigail Watson'}],
    avatar: "https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg",
    birthdate: "1978/01/25"
  },
  roles: ['admin'],
    },
{
  email: 'admin2@admin.com',
  password: 'password',
  profile: {
    name: [{ given: 'Bob', family: 'Nix' , text: 'Bob Nix'}],
    avatar: "https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg",
    birthdate: "1958/05/02"
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });
  lastUser = userExists;

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    lastUser = userId;
    Roles.addUsersToRoles(userId, roles);
  }
});

if (process.env.INITIALIZE) {
    console.info('no devices in database!  adding some default devices');

    var userId = null;
    var devices = [
      {
        deviceName: 'FakeBreathalyzer',
        deviceProductId: '0000-0001'
      },
      {
        deviceName: 'FakeBreathalyzer',
        deviceProductId: '0000-0002'
      },
      {
        deviceName: 'FakeBreathalyzer',
        deviceProductId: '0000-0003'
      }
     ];

    if (process.env.Devices) {
      if ((Devices.find().count() === 0) || (process.env.ADDITIONAL)) {
	  var patient = Patients.findOne({"name.text": "Alan Turing"});
	  if (patient) {
	      for (var i = 0, len = devices.length; i < len; i++) {
		  var device = devices[i];
		  console.info("Initializing device %s, %s, %s", device.deviceName, device.deviceProductId, patient._id);
		  deviceId = Devices.insert( {
			  deviceName: device.deviceName,
			  deviceProductId: device.deviceProductId,
			  patientId: patient._id,
			  createdAt: new Date(),
			  createdBy: lastUser.emails[0].address
		      });
	      }
	  } else {
	      console.info("Initializing devices - no patient");
	  }
      }
    }
}

if (process.env.INITIALIZE) {
    console.info('no observations in database!  adding some default observations');

    var userId = null;
    var observations = [
      {
        observationType: 'BAC',
        observationValue: '0.08',
        observationUnits: 'mg/dL',
        observationStatus: 'OK',
        observationSource: 'TestData',
      },
      {
        observationType: 'BAC',
        observationValue: '0.023',
        observationUnits: 'mg/dL',
        observationStatus: 'OK',
        observationSource: 'TestData',
      },
      {
        observationType: 'BAC',
        observationValue: '0.011',
        observationUnits: 'mg/dL',
        observationStatus: 'OK',
        observationSource: 'TestData',
      },
     ];

    if (process.env.Observations) {
      if ((Observations.find().count() === 0) || (process.env.ADDITIONAL)) {
	  var patient = Patients.findOne({"name.text": "Alan Turing"});
	  if (patient) {
	      for (var i = 0, len = observations.length; i < len; i++) {
		  var observation = observations[i];
		  console.info("Initializing observation %s, %s,%s, %s, %s", observation.observationType, 
			       observation.observationValue, observation.observationUnits, observation.observationStatus, observation.observationSource, patient._id);
		  observationId = Observations.insert( {
			  observationType: observation.observationType,
			  observationValue: observation.observationValue,
			  observationUnits: observation.observationUnits,
			  observationStatus: observation.observationStatus,
			  observationSource: observation.observationSource,
			  patientId: patient._id,
			  createdAt: new Date(),
			  createdBy: lastUser.emails[0].address
		      });
	      }
	  } else {
	      console.info("Initializing observations - no patient");
	  }
      }
    }
}



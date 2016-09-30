

Meteor.methods({
  createCarePlan:function(carePlanObject){
    check(carePlanObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating CarePlan...');
      CarePlans.insert(carePlanObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('CarePlan created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeCarePlan: function(){
    if (CarePlans.find().count() === 0) {
      console.log('No records found in CarePlan collection.  Lets create some...');

      // We're just using tis record to bootstrap the system.  In the actual pipeline,
      // we won't be using Random.id() and will reference actual external records.

      var defaultCarePlan = {
        resourceType: 'CarePlan',
        identifier: [],
        subject: {
          display: 'John Doe',
          reference: 'Patients/' + Random.id()
        },
        status: 'active',
        context: {
          display: '2016-09-20',
          reference: 'Encounters/'  + Random.id()
        },
        period: {
          start: new Date(2016, 9, 20),
          end: new Date(2016, 9, 21)
        },
        author: [{
          display: 'System',
          reference: 'Meteor.users/System'
        }],
        description: 'Alcohol Abuse Disorder Treatment Plan.',
        addresses: [{
          display: 'Alcohol Abuse Disorder',
          reference: 'Conditions/'  + Random.id()
        }],
        relatedPlan: [{
          code: 'fullfills',
          plan: {
            display: 'Daily Medication Template',
            reference: 'CarePlans/'  + Random.id()
          }
        }],
        participant: [{
          role: {
            text: 'Primary Care Physician'
          },
          member: {
            display: 'Dr. John Mendelson',
            reference: 'Practitioners/'  + Random.id()
          }
        }],
        goal: [{
          display: 'Use the breathalyzer once a day.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Use the breathalyzer twice a day.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Take your meds for today.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Take your meds during an entire weekly treatment.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Lower your weekly average alcohol intake compared to your baseline.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Lower your daily cravings for alcohol.',
          reference: 'Goals/'  + Random.id()
        }, {
          display: 'Develop awareness of your drinking behaviors.',
          reference: 'Goals/'  + Random.id()
        }],
        activity: [{
          reference: {
            display: 'AM Breathalyzer Observation',
            reference: 'Observation/'  + Random.id()
          },
          detail: {
            category: {
              text: 'action'
            },
            reasonReference: [{
              display: 'Alcohol Abuse Disorder',
              reference: 'Conditions/'  + Random.id()
            }],
            goal: [{
              display: 'Develop awareness of your drinking behaviors.',
              reference: 'Goals/'  + Random.id()
            }],
            status: 'in-progress',
            prohibited: false,
            scheduledTiming: {
              resoureceType: 'Timing',
              code: {
                text: 'AM'
              }
            },
            performer: [{
              display: 'John Doe',
              reference: 'Patients/'  + Random.id()
            }],
            quantity: {
              value: 1,
              unit: 'exhalations'
            },
            description: 'Check your blood alcohol level in the morning.'
          }
        }, {
          reference: {
            display: 'PM Breathalyzer Observation',
            reference: 'Observation/'  + Random.id()
          },
          detail: {
            category: {
              text: 'action'
            },
            reasonReference: [{
              display: 'Alcohol Abuse Disorder',
              reference: 'Conditions/'  + Random.id()
            }],
            goal: [{
              display: 'Develop awareness of your drinking behaviors.',
              displayReference: 'Goals/DRINKINGBEHAVIOR',
              reference: 'Goals/' + Random.id()
            }],
            status: 'in-progress',
            prohibited: false,
            scheduledTiming: {
              resoureceType: 'Timing',
              code: {
                text: 'PM'
              }
            },
            performer: [{
              display: 'John Doe',
              reference: 'Patients/'  + Random.id()
            }],
            quantity: {
              value: 1,
              unit: 'exhalations'
            },
            description: 'Check your blood alcohol level in the evening.'
          }
        }, {
          reference: {
            display: 'Daily medication adherence photo.',
            reference: 'Adherence/'  + Random.id()
          },
          detail: {
            category: {
              text: 'drug'
            },
            reasonReference: [{
              display: 'Alcohol Abuse Disorder',
              reference: 'Conditions/'  + Random.id()
            }],
            goal: [{
              display: 'Lower your daily cravings for alcohol.',
              reference: 'Goals/'  + Random.id()
            }],
            status: 'in-progress',
            prohibited: false,
            scheduledPeriod: {
              start: new Date(2016, 9, 20),
              end: new Date(2016, 9, 21)
            },
            performer: [{
              display: 'John Doe',
              reference: 'Patients/'  + Random.id()
            }],
            productReference: {
              display: 'Naltrexone',
              reference: 'Medications/'  + Random.id()
            },
            dailyAmount: {
              value: 50,
              unit: 'mg',
              system: 'http://unitsofmeasure.org'
            },
            quantity: {
              value: 1,
              unit: 'tablet'
            },
            description: 'Opiate blocker that turns habit-forming behaviors into habit.'
          }
        }, {
          detail: {
            category: {
              text: 'drug'
            },
            reasonReference: [{
              display: 'Alcohol Abuse Disorder',
              reference: 'Conditions/'  + Random.id()
            }],
            goal: [{
              display: 'Lower your weekly average alcohol intake compared to your baseline.',
              reference: 'Goals/'  + Random.id()
            }],
            status: 'in-progress',
            prohibited: true,
            scheduledPeriod: {
              start: new Date(2016, 9, 20),
              end: new Date(2016, 9, 21)
            },
            performer: [{
              display: 'John Doe',
              reference: 'Patients/'  + Random.id()
            }],
            productReference: {
              display: 'Alcohol',
              reference: 'Medications/'  + Random.id()
            },
            dailyAmount: {
              value: 250,
              comparator: '>',
              unit: 'ml',
              system: 'http://unitsofmeasure.org'
            },
            quantity: {
              value: 20,
              comparator: '>',
              unit: '%',
              system: 'http://unitsofmeasure.org'
            },
            description: 'Begin reducing alcohol consumption by eliminating hard alcohol.'
          }
        }]
      };
      Meteor.call('createCarePlan', defaultCarePlan);
    } else {
      console.log('CarePlans already exist.  Skipping.');
    }
  }
});

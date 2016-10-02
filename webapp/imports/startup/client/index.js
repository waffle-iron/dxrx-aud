import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if (process.env.NODE_ENV === 'production') {
  Bert.defaults.style = 'fixed-top';
} else {
  Bert.defaults.style = 'fixed-bottom';
}


// subscriptions
Meteor.startup(function (){
  Meteor.subscribe('posts');
  Meteor.subscribe('topics');

  Session.set('showNavbars', true);
  Session.set('hasPagePadding', true);
});


// global imports for subscriptions
import { Posts as _Posts } from '/imports/api/posts/posts';
Posts = _Posts;

// global imports for subscriptions
import { Devices as _Devices } from '/imports/api/devices/devices';
Devices = _Devices;

// global imports for subscriptions
import { Topics as _Topics } from '/imports/api/topics/topics';
Topics = _Topics;

// global imports for subscriptions
import { Statistics as _Statistics } from '/imports/api/statistics/statistics';
Statistics = _Statistics;

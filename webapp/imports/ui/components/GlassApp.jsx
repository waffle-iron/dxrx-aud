import React from 'react';
import ReactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Session.setDefault('backgroundColor', '#337ab7');
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);


export class GlassApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  getMeteorData() {
    let data = {
      app: {
        style: {
          width: '100%',
          height: '100%',
          position: 'absolute',
          background: 'inherit'
        }
      }
    };

    data.app.style = {
      zIndex: 1,
      cursor: 'pointer',
      background: '#337ab7'
    };

    // and we're on a tablet or larger device (no phone)
    if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.theme) {

      if (Meteor.user().profile.theme.backgroundColor) {
        data.app.style.background = Meteor.user().profile.theme.backgroundColor;
      } else {
        data.app.style.background = 'inherit';
      }

      if (Meteor.user().profile.theme.backgroundImagePath) {
        data.app.style = {
          backgroundImage: 'url(' + Meteor.user().profile.theme.backgroundImagePath + ')',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover',
          backgroundSize: 'cover'
        };
      } else {
        backgroundImage: 'none';
      }

    }

    data.app.style.width = '100%';
    data.app.style.height = '100%';
    data.app.style.position = 'absolute';

    return data;
  }

  render(){
    return (
      <div>
        <div data-react-toolbox='app' style={this.data.app.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactMixin(GlassApp.prototype, ReactMeteorData);

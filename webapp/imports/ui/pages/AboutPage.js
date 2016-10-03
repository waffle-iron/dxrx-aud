import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';


import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { CardTitle, CardText } from 'react-toolbox/lib/card';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      environment: process.env.NODE_ENV,
      userId: Meteor.userId(),
      url: Meteor.absoluteUrl()
    };
    return data;
  }
  render(){
    return(
      <div id="aboutPage">
        <PhoneContainer >
          <GlassCard>
            <CardTitle
              title="App Info"
            />
            <CardText>
              <TextField
                id="appUrl"
                defaultValue={this.data.url}
                errorText="Universal Resource Location"
                errorStyle={styles.errorStyle}
              /><br />
              <TextField
                id="appEnvironment"
                defaultValue={this.data.environment}
                errorText="Environment"
                errorStyle={styles.errorStyle}
              /><br />
              <TextField
                id="appUserId"
                defaultValue={this.data.userId}
                errorText="User ID"
                errorStyle={styles.errorStyle}
              /><br />
            </CardText>
          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}


ReactMixin(AboutPage.prototype, ReactMeteorData);

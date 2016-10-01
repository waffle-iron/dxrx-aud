import { CardTitle } from 'react-toolbox/lib/card';
import { Row, Col, Grid } from 'react-bootstrap';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { browserHistory } from 'react-router';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';
import { removeUserById } from '../../api/users/methods';



export class ProfileSetupPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        index: 0,
        hasConfirmedDelete: false,
        wantsToDelete: false,
        confirmed: '',
        increment: 0,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      user: {
        given: '',
        familiy: '',
        email: '',
        avatar: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: 'thumbnail.png',
        birthdate: ''
      }
    };

    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: Meteor.user().profile.avatar
      }
      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        data.user.profileImage = Meteor.user().profile.avatar;
      } else {
        data.user.profileImage = "thumbnail.png";
      }

      if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
        data.user.given = Meteor.user().profile.name.given;
        data.user.family = Meteor.user().profile.name.family;
        data.user.fullName = Meteor.user().profile.name.given + " " + Meteor.user().profile.name.family;
      } else {
        data.user.given = "";
        data.user.family = "";
        data.user.fullName = "";
      }
    }

    return data;
  }


  render(){
    return(
      <div id="profileSetupPage">
        <PageContainer>
          <GlassCard>
            <hr />
            <Grid>
              <Col xs={12} md={12} lg={12}>
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <img id="avatarImage" ref="avatarImage" src={this.data.user.profileImage} onError={this.imgError.bind(this)} responsive style={{width: "100%", maxWidth: '180px'}} />
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <CardTitle
                      title={this.data.user.fullName}
                      subtitle={this.data.user.email}
                    />
                  </Col>
                </Row>
                <Row>
                  <div id="profileDemographicsPane" style={{position: "relative"}}>
                    <Input id="givenNameInput" type='text' label='given name' ref="given" name='given' style={this.data.style} value={this.data.user.given} />
                    <Input id="familyNameInput" type='text' label='family name' ref="family" name='family' style={this.data.style} value={this.data.user.family} />
                    <Input id="genderInput" type='text' label='weight (lbs)' ref="weight" name='weight' style={this.data.style} value={this.data.user.weight} />
                    <Input id="weightInput" type='text' label='gender (m/f/o)' ref="gender" name='gender' style={this.data.style} value={this.data.user.gender} />
                    <Input type='text' label='avatar' ref="avatar" name='avatar' style={this.data.style} value={this.data.user.avatar} onChange={ this.handleChangeAvatar.bind(this) } />
                  </div>
                </Row>
                <Row>
                    <Button id="saveProfileButton" onClick={this.handleSaveProfile}>Save Profile</Button>
                </Row>
              </Col>
            </Grid>
            <Spacer />


          </GlassCard>
        </PageContainer>
      </div>
    );
  }
  handleSaveProfile(){
    console.log("We should actually save something now...");

    browserHistory.push('/');
  }

  imgError() {
    // console.log("img", this.refs);
    this.refs.avatarImage.src = "/noAvatar.png";
  }

  changeState(field){
    let state = Session.get('myProfileState');
    state[field] = this.refs[field].refs.input.value;
    Session.set('myProfileState', state);
  }
  handleChangeAvatar() {
    console.log('Lets change the avatar...', this.refs.avatar.refs.input.value);

    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.avatar': this.refs.avatar.refs.input.value
    }})
  }
}


ProfileSetupPage.propTypes = {};
ProfileSetupPage.defaultProps = {};
ReactMixin(ProfileSetupPage.prototype, ReactMeteorData);

import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { AddForumTopic } from   '/imports/ui/workflows/forums/AddForumTopic';
import { PageContainer } from   '/imports/ui/components/PageContainer';
import { GlassCard } from       '/imports/ui/components/GlassCard';
import Spacer from              '/imports/ui/components/Spacer';
import { ForumTopicsTable } from    '/imports/ui/workflows/forums/ForumTopicsTable';

import { Meteor } from 'meteor/meteor';
import Button from 'react-toolbox/lib/button';

import { browserHistory } from 'react-router';

export class ForumPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        isLoggedIn: false
      }
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    return data;
  }

  renderAuthenticatedUserControls(isLoggedIn) {
    //console.log("renderAuthenticatedUserControls");

    if (isLoggedIn) {
      return (
        <div>
          <Button onMouseUp={this.newTopic.bind(this)} raised >New Topic</Button>
          <Spacer />
        </div>
      );
    }
  }

  render() {
    return (
      <div id="forumPage">
        <PageContainer>
          { this.renderAuthenticatedUserControls(this.data.state.isLoggedIn) }
          <GlassCard>
            <ForumTopicsTable />
          </GlassCard>
        </PageContainer>
      </div>
    );
  }

  newTopic(){
    browserHistory.push('/new/topic/');
  }
}


ForumPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(ForumPage.prototype, ReactMeteorData);

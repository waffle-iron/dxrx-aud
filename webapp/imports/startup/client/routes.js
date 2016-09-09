import React  from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from '/imports/ui/layouts/App';
import { AboutPage } from '/imports/ui/pages/AboutPage';
import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
import { DashboardPage } from '/imports/ui/pages/DashboardPage';
import { Documents } from '/imports/ui/pages/Documents';
import { ForumPage } from '/imports/ui/pages/ForumPage';
import { Index } from '/imports/ui/pages/Index';
import { Login } from '/imports/ui/pages/Login';
import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';
import { PatientsPage } from '/imports/ui/pages/PatientsPage';
import { PractitionersPage } from '/imports/ui/pages/PractitionersPage';
import { Signup } from '/imports/ui/pages/Signup';
import { ThemePage } from '/imports/ui/pages/ThemePage';
import { UsersPage } from '/imports/ui/pages/UsersPage';
import { Weblog } from '/imports/ui/pages/Weblog';
import { DevicePage } from '/imports/ui/pages/DevicePage';
import { ObservationPage } from '/imports/ui/pages/ObservationPage';
import { BreathalyzerPage } from '/imports/ui/pages/BreathalyzerPage';
import { NotFound } from '/imports/ui/pages/NotFound';
import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
import { ResetPassword } from '/imports/ui/pages/ResetPassword';
import { NeedToBePractioner } from '/imports/ui/pages/NeedToBePractioner';

import { ConversationsPage } from '/imports/ui/pages/ConversationsPage';
import { NewTopicPage } from '/imports/ui/pages/NewTopicPage';

//import { Bert } from 'meteor/themeteorchef:bert';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const requirePractitioner = (nextState, replace) => {
  if (!Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
    replace({
      pathname: '/need-to-be-practitioner',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />

        <Route name="documents" path="/documents" component={ Documents } onEnter={ requirePractitioner } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />



        <Route name="needToBePractioner" path="/need-to-be-practitioner" component={ NeedToBePractioner } />

        <Route name="about" path="/about" component={ AboutPage } />
        <Route name="privacy" path="/privacy" component={ PrivacyPage } />

        <Route name="dashboard" path="/dashboard" component={ DashboardPage } onEnter={ requirePractitioner } />
        <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
        <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />

        <Route name="practitioners" path="/practitioners" component={ PractitionersPage } onEnter={ requirePractitioner } />
        <Route name="patients" path="/patients" component={ PatientsPage } onEnter={ requirePractitioner } />
        <Route name="users" path="/users" component={ UsersPage } onEnter={ requirePractitioner } />

        <Route name="support" path="/support" component={ ForumPage } />
        <Route name="forum" path="/forum" component={ ForumPage } onEnter={ requirePractitioner } />

        <Route name="topicById" path="/topic/:topicId" component={ ConversationsPage } onEnter={ requirePractitioner } />
        <Route name="newTopic" path="/new/topic" component={ NewTopicPage } onEnter={ requirePractitioner } />

        <Route name="weblog" path="/weblog" component={ Weblog } />
        <Route name="weblogByUserId" path="/weblog/:userId" component={ Weblog } />

        <Route name="devices" path="/devices" component={ DevicePage } />
        <Route name="devicesByUserId" path="/devices/:userId" component={ DevicePage } />

        <Route name="observations" path="/observations" component={ ObservationPage } />
        <Route name="observationsByUserId" path="/observations/:userId" component={ ObservationPage } />

        <Route name="breathalyzer" path="/breathalyzer" component={ BreathalyzerPage } />

        <Route path="*" component={ NotFound } />

      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});

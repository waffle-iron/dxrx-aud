console.log("In Breathalyzerpage");
import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
import DocumentsList  from '/imports/ui/containers/documents-list';

import BreathalyzerDetail from '/imports/ui/workflows/breathalyzer/BreathalyzerDetail';

import { Meteor } from 'meteor/meteor';

export class BreathalyzerPage extends React.Component {
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

    if (Session.get('appWidth') > 768) {
      Session.set('hasPageVerticalPadding', true);
      Session.set('mainPanelIsCard', true);
    } else {
      Session.set('hasPageVerticalPadding', false);
      Session.set('mainPanelIsCard', false);
    }

    return data;
  }

  renderAuthenticatedUserControls(isLoggedIn) {

    // user should be able to see the addBreathalyzer component if they're logged in and looking at their
    // own profile; otherwise,
    if (isLoggedIn) {
      if (!this.props.routeParams.userId) {
      console.log("In BreathalyzerPage render 2");
        return (
          <div>
            <BreathalyzerDetail />
            <DynamicSpacer />
          </div>
        );
      }
    } else {
      console.log("In BreathalyzerPage render 3");
      return ( <div>
            <BreathalyzerDetail />
            <DynamicSpacer />
          </div>
	  );
    }
  }

  render() {
console.log("In BreathalyzerPage render");
    return (
      <div id="BreathalyzerPage">
        <PageContainer>
          { this.renderAuthenticatedUserControls(this.data.state.isLoggedIn) }
        </PageContainer>
      </div>
    );
  }
}


BreathalyzerPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(BreathalyzerPage.prototype, ReactMeteorData);

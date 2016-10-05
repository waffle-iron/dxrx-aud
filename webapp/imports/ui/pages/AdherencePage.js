import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';

import { browserHistory } from 'react-router';

import Adherence from '/imports/ui/workflows/adherence/Adherence.js';



export class AdherencePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {};

    return data;
  }

  render(){
    return (
      <div id="adherencePage">
        <PageContainer>
          <GlassCard>
            <Adherence />
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}




ReactMixin(AdherencePage.prototype, ReactMeteorData);

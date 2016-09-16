import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';


export class CarePlanPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="carePlanPage">
        <PhoneContainer >
          <GlassCard>
            <AboutAppCard />
          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}

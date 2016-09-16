import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';
import { CardTitle, CardText } from 'react-toolbox/lib/card';

export class NeedToBePractioner extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="needToBePractioner">
        <PhoneContainer >
          <GlassCard>
            <CardTitle
              title="Need To Be A Practioner"
            />
             <CardText>
              You need to be a practitioner to access this resource.
             </CardText>

          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}

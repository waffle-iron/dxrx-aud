import React from 'react';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { CardTitle, CardText } from 'react-toolbox/lib/card';

import Button from 'react-toolbox/lib/button';
import { browserHistory } from 'react-router';


export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  signin(){
    browserHistory.push('/device-configuration');
  }

  render(){
    return(
      <div id="welcomePatientPage">
        <PhoneContainer >
          <GlassCard>
            <CardTitle
              title="Welcome to DxRx Treatment Program"
            />
             <CardText>
              Congratulations on taking the next step on your road to recovery!
             </CardText>

             <Button id="configureDeviceButton" onClick={this.signin}>Configure Device</Button>

          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}

import React from 'react';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { CardTitle, CardText } from 'react-toolbox/lib/card';

import Button from 'react-toolbox/lib/button';
import { browserHistory } from 'react-router';


export class TourPage extends React.Component {
  constructor(props) {
    super(props);
  }

  signin(){
    browserHistory.push('/signup');
  }

  render(){
    return(
      <div id="tourPage">
        <PhoneContainer >
          <GlassCard>
            <CardTitle
              title="Tour of the DxRx Alcoholism Recovery Program "
            />
             <CardText>
             Welcome.  Here is where you will learn more about the DxRx Alcoholism Recovery Program.  Lorem ipsum dolor sit et...
             </CardText>

             <Button id="beginRegistrationButton" onClick={this.signin}>Signup!</Button>

          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}

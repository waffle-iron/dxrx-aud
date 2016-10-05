import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

export class AuthenticatedSidebar extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    return data;
  }

  render () {
    return(
      <List style={{paddingLeft: '20px', position: 'absolute'}}>

      <IndexLinkContainer to='/'>
         <ListItem eventKey={ 4 } caption='CarePlan' href='/' />
      </IndexLinkContainer>

      <IndexLinkContainer to='/adherence'>
         <ListItem eventKey={ 11 } caption='Adherence' href='/adherence' />
      </IndexLinkContainer>

      <IndexLinkContainer to='/device-configuration'>
         <ListItem eventKey={ 11 } caption='Device Configuration' href='/device-configuration' />
      </IndexLinkContainer>

      <IndexLinkContainer to='/breathalyzer-control'>
         <ListItem eventKey={ 13 } caption='Breathalyzer' href='/breathalyzer-control' />
      </IndexLinkContainer>

      <IndexLinkContainer to='/breathalyzer-result'>
         <ListItem eventKey={ 12 } caption='Result' href='/breathalyzer-result' />
      </IndexLinkContainer>

      <IndexLinkContainer to='/about'>
         <ListItem eventKey={ 10 } caption='About' href='/about' />
      </IndexLinkContainer>

        {/* <IndexLinkContainer to='/weblog'>
           <ListItem eventKey={ 3 } caption='Weblog' href='/weblog' />
        </IndexLinkContainer> */}

      </List>
    );
  }
}
AuthenticatedSidebar.propTypes = {};
AuthenticatedSidebar.defaultProps = {};
ReactMixin(AuthenticatedSidebar.prototype, ReactMeteorData);

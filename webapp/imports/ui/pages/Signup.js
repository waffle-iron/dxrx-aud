import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleSignup } from '/imports/modules/handleSignup';

import { PageContainer } from '../components/PageContainer';
import { MobilePadding } from '../components/MobilePadding';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  signupNewUser(){
    alert('signup!');
  }


  render() {
    return (
      <div id="signupPage">
        <MobilePadding>
          <PageContainer>
                <h4 className="page-header" style={{color: "white"}}>Sign Up</h4>
                <form ref="signup" className="signup" onSubmit={ this.handleSubmit }>
                  <Row>
                    <Col xs={ 4 } sm={ 4 }>
                      <FormGroup>
                        <ControlLabel style={{color: "white"}}>First Name</ControlLabel>
                        <FormControl
                          type="text"
                          ref="firstName"
                          name="firstName"
                          placeholder="First Name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={ 4 } sm={ 4 }>
                      <FormGroup>
                        <ControlLabel style={{color: "white"}}>Last Name</ControlLabel>
                        <FormControl
                          type="text"
                          ref="lastName"
                          name="lastName"
                          placeholder="Last Name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={ 4 } sm={ 4 }>
                      <FormGroup>
                        <ControlLabel style={{color: "white"}}>Access Code</ControlLabel>
                        <FormControl
                          type="text"
                          ref="accessCode"
                          name="accessCode"
                          placeholder="Access Code"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <ControlLabel style={{color: "white"}}>Email Address</ControlLabel>
                    <FormControl
                      type="text"
                      ref="emailAddress"
                      name="emailAddress"
                      placeholder="Email Address"
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel style={{color: "white"}}>Password</ControlLabel>
                    <FormControl
                      type="password"
                      ref="password"
                      name="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <Button id="signupButton" onClick={signupNewUser} type="submit" bsStyle="success">Sign Up</Button>
                </form>
                <p>Already have an account? <Link to="/login">Log In</Link>.</p>


          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
